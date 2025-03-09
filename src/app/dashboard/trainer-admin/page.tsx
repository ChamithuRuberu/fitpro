'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiDollarSign, FiPlus, FiPackage, FiUser, FiMapPin, FiActivity, FiLogOut } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { checkTrainerAuth, logoutTrainer, getTrainerClients, getRecommendedSupplements, getSession } from '@/actions';
import type { TrainerStats, ClientData, NutritionItem } from '@/actions';
import { getIronSession } from 'iron-session';


interface TrainerProfileData {
  name: string;
  city: string;
  servicePeriod: string;
  weight: string;
  height: string;
  profile: string;
}

export default function TrainerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'supplements'>('overview');
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<TrainerStats | null>(null);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [supplements, setSupplements] = useState<NutritionItem[]>([]);
 
  const [TrainerProfileData, setFormData] = useState<TrainerProfileData>({
    name: '',
    city: '',
    servicePeriod: '',
    weight: '',
    height: '',
    profile: ''
  });

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session.username) {
        setFormData(prev => ({
          ...prev,
          username: session.username || ''
        }));
      } else {
        router.replace('/signup');
      }
    };
    
    checkSession();
  }, [router]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data based on active tab
        if (activeTab === 'overview') {

        } else if (activeTab === 'clients') {
          const clientsResult = await getTrainerClients();
          if (clientsResult.success && clientsResult.data) {
            setClients(clientsResult.data);
          } else {
            toast.error('Failed to load clients');
          }
        } else if (activeTab === 'supplements') {
          const supplementsResult = await getRecommendedSupplements();
          if (supplementsResult.success && supplementsResult.data) {
            setSupplements(supplementsResult.data);
          } else {
            toast.error('Failed to load supplements');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      }
    };

    fetchData();
  }, [activeTab]);



  const handleLogout = async () => {
    try {
      await logoutTrainer();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
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
            <form className="space-y-6">
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
                    value={TrainerProfileData.name}
                    onChange={(e) => setFormData({ ...TrainerProfileData, name: e.target.value })}
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
                    value={TrainerProfileData.city}
                    onChange={(e) => setFormData({ ...TrainerProfileData, city: e.target.value })}
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
                  value={TrainerProfileData.servicePeriod}
                  onChange={(e) => setFormData({ ...TrainerProfileData, servicePeriod: e.target.value })}
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
                      value={TrainerProfileData.weight}
                      onChange={(e) => setFormData({ ...TrainerProfileData, weight: e.target.value })}
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
                      value={TrainerProfileData.height}
                      onChange={(e) => setFormData({ ...TrainerProfileData, height: e.target.value })}
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
                  value={TrainerProfileData.profile}
                  onChange={(e) => setFormData({ ...TrainerProfileData, profile: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading
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
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">User Information</h2>
            <div className="space-y-3">
               {/* <p className="text-black"><strong>Full Name:</strong> {setFormData.fullName}</p> 
              <p className="text-gray-700"><strong>Status:</strong> {result.status}</p>
              <p className="text-gray-700"><strong>City:</strong> {result.city}</p>
              <p className="text-gray-700"><strong>Email:</strong> {result.email}</p>
              <p className="text-gray-700"><strong>User ID:</strong> {result.user_id}</p>  */}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mt-6">
            {['overview', 'clients', 'supplements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === tab
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
        {activeTab === 'overview' && stats && (
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
                    <p className="text-2xl font-semibold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
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
                    <p className="text-2xl font-semibold text-gray-900">{stats.activeClients}</p>
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
                    <p className="text-2xl font-semibold text-gray-900">{stats.upcomingSessions}</p>
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
                    <span className={`px-2 py-1 rounded-full text-xs ${client.subscriptionStatus === 'active'
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
                {supplements.map((supplement) => (
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

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
