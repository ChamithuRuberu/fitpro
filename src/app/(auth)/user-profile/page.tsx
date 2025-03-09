'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiLock, FiCalendar, FiMapPin } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

interface RegisterFormData {
  username: string;
  name: string;
  profile: string;
  full_name: string;
  birth_of_date: string;
  address_no: string;
  address_street: string;
  city: string;
  password: string;
  postalCode: string;
  role_type: string;
  servicePeriod: string;
  weight: string;
  height: string;
  injuries: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    name: '',
    profile: '',
    full_name: '',
    birth_of_date: '',
    address_no: '',
    address_street: '',
    city: '',
    password: '',
    postalCode: '',
    role_type: '',
    servicePeriod: '',
    weight: '',
    height: '',
    injuries: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/user/app-user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        toast.success('Registration successful!');
        router.push('/verify?username=' + formData.username);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username (Email)
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.full_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="birth_of_date" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <div className="mt-1">
                <input
                  id="birth_of_date"
                  name="birth_of_date"
                  type="date"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.birth_of_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="address_no" className="block text-sm font-medium text-gray-700">
                  Address No
                </label>
                <input
                  id="address_no"
                  name="address_no"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.address_no}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="address_street" className="block text-sm font-medium text-gray-700">
                  Street
                </label>
                <input
                  id="address_street"
                  name="address_street"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.address_street}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Physical Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                  Height (cm)
                </label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="injuries" className="block text-sm font-medium text-gray-700">
                Injuries/Medical Conditions
              </label>
              <textarea
                id="injuries"
                name="injuries"
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.injuries}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="role_type" className="block text-sm font-medium text-gray-700">
                Role Type
              </label>
              <select
                id="role_type"
                name="role_type"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.role_type}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                <option value="ROLE_USER">User</option>
                <option value="ROLE_TRAINER">Trainer</option>
              </select>
            </div>

            {formData.role_type === 'ROLE_TRAINER' && (
              <div>
                <label htmlFor="servicePeriod" className="block text-sm font-medium text-gray-700">
                  Service Period (years)
                </label>
                <input
                  id="servicePeriod"
                  name="servicePeriod"
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.servicePeriod}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 