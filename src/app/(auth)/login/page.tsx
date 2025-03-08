'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import type { UserRole } from '@/types/dashboard';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('client');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    console.log('Login attempt:', { email, password, role });

    // Redirect based on role
    switch (role) {
      case 'super_admin':
        router.push('/dashboard/super-admin');
        break;
      case 'gym_admin':
        router.push('/dashboard/gym-admin');
        break;
      case 'trainer':
        router.push('/dashboard/trainer');
        break;
      default:
        router.push('/dashboard/client');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="flex flex-col lg:flex-row max-w-4xl w-full mx-4 lg:mx-0">
      {/* Image Section */}
      <div className="bg-black lg:w-1/2">
        <img
          src="auth/login.png"
          alt="Login Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-md lg:w-1/2">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 font-serif">
          Login to Your Fitness App
        </h2>
        <h6 className="text-md font-normal mb-6 text-center text-gray-500">
          Health and Wellness Tracking.
        </h6>
        {/* {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
              )} */}
        {/* <form onSubmit={handleSubmit}> */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 pb-4"
          >
            Forgot Password ?
          </label>
      
      <div className='flex flex-row'>
      <button
          type="submit"
          className="w-40 mr-4 bg-blue-950 text-white py-2 px-4 rounded-sm hover:bg-blue-900 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
        <Link href={"/signup"}>
        <button
          type="submit"
          className="w-40 bg-blue-150 text-blue-950 border-1 py-2 px-4 rounded-sm hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
        </Link>
      </div>
        {/* </form> */}
      </div>
    </div>
  </div>
  );
} 