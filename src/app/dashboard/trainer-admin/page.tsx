'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiDollarSign, FiPlus, FiPackage, FiUser, FiMapPin, FiActivity, FiLogOut } from 'react-icons/fi';
import type { ClientData } from '@/types/dashboard';
import type { NutritionItem } from '@/types/nutrition';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

// Sample data
const trainerStats = {
  monthlyRevenue: 8500,
  activeClients: 25,
  completedSessions: 82,
  upcomingSessions: 12,
  averageRating: 4.9,
};

const clients: ClientData[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    program: 'Weight Loss Program',
    trainer: 'John Smith',
    progress: 75,
    attendance: 90,
    nextSession: '2024-03-15 10:00 AM',
    subscriptionStatus: 'active',
  },
  // Add more clients...
];

const recommendedSupplements: NutritionItem[] = [
  {
    id: '1',
    name: 'Whey Protein Isolate',
    category: 'supplement',
    subCategory: 'Protein',
    description: 'High-quality protein supplement for muscle recovery and growth',
    benefits: ['Muscle Recovery', 'Protein Synthesis', 'Amino Acids'],
    image: '/images/nutrition/whey-protein.jpg',
    tags: ['protein', 'muscle-building', 'post-workout'],
    nutritionalInfo: {
      calories: 120,
      protein: 24,
      carbs: 3,
      fats: 2,
    },
    servingSize: '30g scoop',
    price: {
      amount: 29.99,
      currency: 'USD',
    },
  },
  // Add more supplements...
];

interface TrainerProfileData {
  name: string;
  city: string;
  servicePeriod: string;
  weight: string;
  height: string;
  profile: string;
}

export default function TrainerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'supplements'>('overview');
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<TrainerProfileData>({
    name: '',
    city: '',
    servicePeriod: '',
    weight: '',
    height: '',
    profile: ''
  });

  useEffect(() => {
    // Check if trainer has completed their profile
    const checkProfile = async () => {
      try {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const userRoleStr = localStorage.getItem('user_role');

        console.log('Dashboard Auth Check:', {
          username,
          hasToken: !!token,
          isAuthenticated,
          userRole: userRoleStr
        });

        // Verify all required auth data exists
        if (!username || !token || !isAuthenticated || !userRoleStr) {
          console.error('Missing authentication credentials');
          toast.error('Please login to access the dashboard');
          localStorage.clear();
          window.location.href = '/login';
          return;
        }

        // Verify user role
        try {
          const userRole = JSON.parse(userRoleStr);
          if (!userRole || userRole.name !== 'ROLE_TRAINER') {
            console.error('Invalid user role');
            toast.error('Unauthorized access');
            localStorage.clear();
            window.location.href = '/login';
            return;
          }
        } catch (e) {
          console.error('Error parsing user role:', e);
          toast.error('Session error');
          localStorage.clear();
          window.location.href = '/login';
          return;
        }

        // Verify token is valid with a simpler endpoint first
        const authCheckResponse = await fetch('', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (!authCheckResponse.ok) {
          console.error('Token validation failed');
          localStorage.clear();
          toast.error('Session expired. Please login again');
          window.location.href = '/login';
          return;
        }

        // Now fetch trainer profile
        const response = await fetch(``, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        console.log('Profile verification response:', {
          status: response.status,
          ok: response.ok
        });

        // Handle specific response statuses
        if (response.status === 401 || response.status === 403) {
          console.error('Authentication token expired or invalid');
          localStorage.clear();
          toast.error('Session expired. Please login again');
          window.location.href = '/login';
          return;
        }

        if (response.status === 404) {
          console.log('Profile not found, showing setup modal');
          setShowProfileSetup(true);
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        console.log('Profile data:', data);
        
        if (data && data.name) {
          setProfileData(data);
        } else {
          console.log('Empty profile data, showing setup modal');
          setShowProfileSetup(true);
        }
      } catch (error) {
        console.error('Error checking profile:', error);
        toast.error('Failed to load profile');
        // Don't redirect on general errors, only auth errors
      }
    };

    checkProfile();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const username = localStorage.getItem('user_id');
      const token = localStorage.getItem('token');

      const response = await fetch(``, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      toast.success('Profile updated successfully');
      setShowProfileSetup(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:8080/api/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear all stored data
      localStorage.clear();
      toast.success('Logged out successfully');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
      // Still redirect to login in case of error
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">FitPro</h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
            >
              <FiLogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
      
      
      {/* Profile Setup Modal */}
      {showProfileSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold mb-6">Complete Your Profile</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
              </div>

              {/* City Field */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  />
                </div>
              </div>

              {/* Service Period Field */}
              <div>
                <label htmlFor="servicePeriod" className="block text-sm font-medium text-gray-700">
                  Service Period (years)
                </label>
                <input
                  id="servicePeriod"
                  name="servicePeriod"
                  type="number"
                  min="0"
                  step="0.5"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={profileData.servicePeriod}
                  onChange={(e) => setProfileData({ ...profileData, servicePeriod: e.target.value })}
                />
              </div>

              {/* Weight and Height Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                    Weight (kg)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiActivity className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      min="30"
                      max="200"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={profileData.weight}
                      onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                    Height (cm)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiActivity className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="height"
                      name="height"
                      type="number"
                      min="100"
                      max="250"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={profileData.height}
                      onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Profile Field */}
              <div>
                <label htmlFor="profile" className="block text-sm font-medium text-gray-700">
                  Professional Profile
                </label>
                <textarea
                  id="profile"
                  name="profile"
                  rows={4}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your experience and expertise..."
                  value={profileData.profile}
                  onChange={(e) => setProfileData({ ...profileData, profile: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Trainer Dashboard</h1>
            <div className="flex space-x-4">
              <button className="btn-primary flex items-center gap-2">
                <FiPlus className="w-5 h-5" />
                Add New Client
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mt-6">
            {['overview', 'clients', 'supplements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === tab
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900">${trainerStats.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-full">
                    <FiDollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Clients</p>
                    <p className="text-2xl font-semibold text-gray-900">{trainerStats.activeClients}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-full">
                    <FiUsers className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
                    <p className="text-2xl font-semibold text-gray-900">{trainerStats.upcomingSessions}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-full">
                    <FiCalendar className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Schedule and Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
                {/* Add schedule component */}
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Client Progress</h3>
                {/* Add progress charts */}
              </div>
            </div>
          </>
        )}

        {/* Clients List */}
        {activeTab === 'clients' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">My Clients</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {clients.map((client) => (
                <div key={client.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.program}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      client.subscriptionStatus === 'active'
                        ? 'bg-green-100 text-green-600'
                        : client.subscriptionStatus === 'expired'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {client.subscriptionStatus.charAt(0).toUpperCase() + client.subscriptionStatus.slice(1)}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Progress</p>
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${client.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{client.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Attendance</p>
                      <p className="font-medium">{client.attendance}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Session</p>
                      <p className="font-medium">{new Date(client.nextSession).toLocaleDateString()}</p>
                    </div>
                    <div className="flex justify-end">
                      <button className="btn-primary text-sm">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supplements Recommendations */}
        {activeTab === 'supplements' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recommended Supplements</h2>
                <button className="btn-primary flex items-center gap-2">
                  <FiPlus className="w-5 h-5" />
                  Add Recommendation
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedSupplements.map((supplement) => (
                  <motion.div
                    key={supplement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{supplement.name}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                          {supplement.subCategory}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{supplement.description}</p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Benefits:</h4>
                          <div className="flex flex-wrap gap-2">
                            {supplement.benefits.map((benefit, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                        {supplement.nutritionalInfo && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Nutrition Facts (per {supplement.servingSize})</h4>
                            <div className="grid grid-cols-4 gap-2 text-sm">
                              <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="font-medium">{supplement.nutritionalInfo.calories}</div>
                                <div className="text-xs text-gray-500">Calories</div>
                              </div>
                              <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="font-medium">{supplement.nutritionalInfo.protein}g</div>
                                <div className="text-xs text-gray-500">Protein</div>
                              </div>
                              <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="font-medium">{supplement.nutritionalInfo.carbs}g</div>
                                <div className="text-xs text-gray-500">Carbs</div>
                              </div>
                              <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="font-medium">{supplement.nutritionalInfo.fats}g</div>
                                <div className="text-xs text-gray-500">Fats</div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="pt-4 border-t flex justify-between items-center">
                          <div>
                            <span className="text-lg font-semibold text-blue-600">
                              ${supplement.price?.amount}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">
                              per {supplement.servingSize}
                            </span>
                          </div>
                          <button className="btn-secondary text-sm">
                            Recommend
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 