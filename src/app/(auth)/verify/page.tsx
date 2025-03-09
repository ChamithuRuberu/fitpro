'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiUser, FiLock } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

interface VerifyFormData {
  username: string;
  otp: string;
}

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<VerifyFormData>({
    username: '',
    otp: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill username if provided in URL params
  useEffect(() => {
    const username = searchParams.get('username');
    const isRegistering = localStorage.getItem('isRegistering');
    
    if (username) {
      setFormData(prev => ({ ...prev, username }));
      toast.success('Please enter the OTP sent to your email');
    } else if (!isRegistering) {
      // Only redirect if not in registration flow
      toast.error('Invalid access. Please register first.');
      router.replace('/signup');
    }

    // Cleanup function to remove registration flag
    return () => {
      localStorage.removeItem('isRegistering');
    };
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const verifyToast = toast.loading('Verifying your account...');

    try {
      const response = await fetch('http://localhost:8080/api/user/register-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          otp: formData.otp
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        toast.error(errorData || 'Verification failed');
        throw new Error(
          `Verification failed: ${response.status} ${response.statusText}. ${errorData}`
        );
      }

      const data = await response.json();
      
      // Store authentication data if token is present
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      try {
        // Get the registration data from localStorage
        const registrationData = localStorage.getItem('registrationData');
        if (!registrationData) {
          throw new Error('Registration data not found');
        }

        const parsedData = JSON.parse(registrationData);
        console.log('Registration data:', parsedData);

        // Check if user is a trainer by looking at the user_role array
        const trainerRole = parsedData.data?.user_role?.[0];
        console.log('User role:', trainerRole);

        if (trainerRole && trainerRole.name === 'ROLE_TRAINER') {
          console.log('User is a trainer, storing session data');
          
          // Store necessary data for trainer session
          localStorage.setItem('temp_trainer_id', parsedData.data.app_user_id);
          localStorage.setItem('trainer_role', JSON.stringify(trainerRole));
          localStorage.setItem('isVerified', 'true');
          
          // Clear registration data as it's no longer needed
          localStorage.removeItem('registrationData');
          localStorage.removeItem('isRegistering');
          
          toast.success('Account verified! Redirecting to complete your profile...');
          
          // Redirect to trainer profile completion
          window.location.href = '/trainer-profile';
          return;
        } else {
          // Handle non-trainer users
          toast.success('Account verified! Redirecting to login...');
          window.location.href = '/login';
          return;
        }
      } catch (error) {
        console.error('Error checking trainer role:', error);
        toast.error('Authentication failed. Please try again.');
        window.location.href = '/login';
        return;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred during verification';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      toast.dismiss(verifyToast);
      setLoading(false);
    }
  };

  // Add resend OTP functionality
  const handleResendOTP = async () => {
    if (!formData.username) {
      setError('Email is required to resend OTP');
      toast.error('Email is required to resend OTP');
      return;
    }

    const resendToast = toast.loading('Sending new OTP...');

    try {
      setLoading(true);
      console.log('🔄 Resend OTP Request:', {
        url: '/api/user/resend-otp',
        method: 'POST',
        body: { email: formData.username }
      });

      const response = await fetch('/api/user/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: formData.username }),
      });

      console.log('📥 Resend OTP Response:', {
        status: response.status,
        statusText: response.statusText
      });

      if (!response.ok) {
        throw new Error('Failed to resend OTP');
      }

      console.log('✅ OTP Resent Successfully');
      toast.success('New OTP has been sent to your email');
    } catch (err) {
      console.error('❌ Resend OTP Error:', err);
      const errorMessage = 'Failed to resend OTP. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      toast.dismiss(resendToast);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please enter the OTP sent to your email
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="email"
                  required
                  readOnly
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            {/* OTP Field */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP Code
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  maxLength={6}
                  pattern="\d{6}"
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
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
            <div className="space-y-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="w-full text-sm text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 