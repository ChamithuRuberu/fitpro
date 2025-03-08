'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMapPin, FiLock, FiClock, FiActivity } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

interface TrainerProfileData {
  username: string;
  name: string;
  city: string;
  password: string;
  role_type: string;
  servicePeriod: string;
  weight: string;
  height: string;
  profile: string;
}

export default function TrainerProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TrainerProfileData>({
    username: '',
    name: '',
    city: '',
    password: '',
    role_type: 'ROLE_TRAINER',
    servicePeriod: '',
    weight: '',
    height: '',
    profile: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authorized to access this page
    const isVerified = localStorage.getItem('isVerified');
    const trainerRole = localStorage.getItem('trainer_role');
    const trainerId = localStorage.getItem('temp_trainer_id');

    console.log('Auth check:', { isVerified, trainerRole, trainerId });

    if (!isVerified || !trainerRole || !trainerId) {
      console.log('Unauthorized access - missing credentials');
      toast.error('Unauthorized access');
      window.location.href = '/login';
      return;
    }

    try {
      const parsedRole = JSON.parse(trainerRole);
      if (parsedRole.name !== 'ROLE_TRAINER') {
        console.log('Unauthorized access - not a trainer');
        toast.error('Unauthorized access');
        window.location.href = '/login';
        return;
      }

      // Pre-fill username from storage
      setFormData(prev => ({
        ...prev,
        username: trainerId,
        role_type: 'ROLE_TRAINER'
      }));
    } catch (error) {
      console.error('Error parsing trainer role:', error);
      toast.error('Session error. Please login again.');
      window.location.href = '/login';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const loadingToast = toast.loading('Completing your profile...');

    try {
      // Validate name format
      const nameRegex = /^(?![ .]+$)[a-zA-Z .]*$/;
      if (!nameRegex.test(formData.name)) {
        throw new Error('Please enter a valid name');
      }

      // Validate password
      if (!formData.password) {
        throw new Error('Password should not be empty');
      }

      const response = await fetch('http://localhost:8080/api/user/gov-user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to complete profile');
      }

      const data = await response.json();
      console.log('Profile completion response:', data);
      
      // Store authentication data
      if (data.code === "0000" && data.data) {
        console.log('Storing authentication data...');
        
        // Store tokens
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('refresh_token', data.data.refresh_token);
        
        // Store user data
        if (data.data.user) {
          console.log('Storing user data:', data.data.user);
          localStorage.setItem('user_id', data.data.user.user_id || formData.username);
          localStorage.setItem('user_email', data.data.user.email);
          localStorage.setItem('user_name', data.data.user.full_name);
          localStorage.setItem('user_city', data.data.user.city);
          localStorage.setItem('user_status', data.data.user.status);
        }
        
        // Store role information
        localStorage.setItem('user_role', JSON.stringify({
          name: 'ROLE_TRAINER'
        }));
        
        // Set authentication status
        localStorage.setItem('isAuthenticated', 'true');
        
        // Clear temporary data
        localStorage.removeItem('temp_trainer_id');
        localStorage.removeItem('isVerified');
        localStorage.removeItem('trainer_role');
        
        console.log('Authentication data stored successfully');
        console.log('Current localStorage state:', {
          token: localStorage.getItem('token'),
          refresh_token: localStorage.getItem('refresh_token'),
          user_id: localStorage.getItem('user_id'),
          isAuthenticated: localStorage.getItem('isAuthenticated'),
          user_role: localStorage.getItem('user_role')
        });
        
        toast.success('Profile completed successfully! Setting up your dashboard...');
        
        // Navigate to dashboard after ensuring data is stored
        const checkDataInterval = setInterval(() => {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('user_id');
          const isAuth = localStorage.getItem('isAuthenticated');
          
          if (token && userId && isAuth) {
            clearInterval(checkDataInterval);
            window.location.href = '/dashboard/trainer';
          }
        }, 100);

        // Timeout after 5 seconds if data isn't stored
        setTimeout(() => {
          clearInterval(checkDataInterval);
          if (!localStorage.getItem('token')) {
            toast.error('Failed to store authentication data');
          }
        }, 5000);
      } else {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response from server');
      }
      
      return;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Trainer Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please provide your professional details
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  pattern="^(?![ .]+$)[a-zA-Z .]*$"
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Service Period Field */}
            <div>
              <label htmlFor="servicePeriod" className="block text-sm font-medium text-gray-700">
                Service Period (years)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiClock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="servicePeriod"
                  name="servicePeriod"
                  type="number"
                  min="0"
                  step="0.5"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.servicePeriod}
                  onChange={(e) => setFormData({ ...formData, servicePeriod: e.target.value })}
                />
              </div>
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
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
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
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Profile Field */}
            <div>
              <label htmlFor="profile" className="block text-sm font-medium text-gray-700">
                Professional Profile
              </label>
              <div className="mt-1">
                <textarea
                  id="profile"
                  name="profile"
                  rows={4}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your experience and expertise..."
                  value={formData.profile}
                  onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {loading ? 'Completing Profile...' : 'Complete Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 