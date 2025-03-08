'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { FiUsers, FiActivity, FiDollarSign, FiStar, FiMapPin, FiPlus } from 'react-icons/fi';
import type { GymData, TrainerData, ClientData, DashboardStats } from '@/types/dashboard';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

// Sample data
const stats: DashboardStats = {
  totalRevenue: 150000,
  activeMembers: 1200,
  totalTrainers: 45,
  totalGyms: 8,
  activePrograms: 24,
  averageRating: 4.8,
};

const gyms: GymData[] = [
  {
    id: '1',
    name: 'FitPro Central',
    location: 'New York, NY',
    memberCount: 450,
    trainerCount: 12,
    rating: 4.9,
    revenue: 45000,
  },
  // Add more gyms...
];

const trainers: TrainerData[] = [
  {
    id: '1',
    name: 'John Smith',
    gym: 'FitPro Central',
    clientCount: 25,
    rating: 4.9,
    specializations: ['Weight Loss', 'Strength Training'],
    activePrograms: 3,
    revenue: 8500,
  },
  // Add more trainers...
];

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

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'gyms' | 'trainers' | 'clients'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Dashboard Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Super Admin Dashboard</h1>
            <div className="flex space-x-4">
              <button className="btn-primary flex items-center gap-2">
                <FiPlus className="w-5 h-5" />
                Add New Gym
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mt-6">
            {['overview', 'gyms', 'trainers', 'clients'].map((tab) => (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
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
                  <p className="text-sm font-medium text-gray-600">Active Members</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.activeMembers.toLocaleString()}</p>
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
                  <p className="text-sm font-medium text-gray-600">Total Trainers</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalTrainers}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <FiActivity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Gyms List */}
        {activeTab === 'gyms' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Registered Gyms</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {gyms.map((gym) => (
                <div key={gym.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{gym.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <FiMapPin className="w-4 h-4 mr-1" />
                        {gym.location}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{gym.rating}</span>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Members</p>
                      <p className="text-lg font-semibold">{gym.memberCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Trainers</p>
                      <p className="text-lg font-semibold">{gym.trainerCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-lg font-semibold">${gym.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trainers List */}
        {activeTab === 'trainers' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Registered Trainers</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{trainer.name}</h3>
                      <p className="text-sm text-gray-600">{trainer.gym}</p>
                    </div>
                    <div className="flex items-center">
                      <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{trainer.rating}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {trainer.specializations.map((spec, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Clients</p>
                      <p className="text-lg font-semibold">{trainer.clientCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Programs</p>
                      <p className="text-lg font-semibold">{trainer.activePrograms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-lg font-semibold">${trainer.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clients List */}
        {activeTab === 'clients' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">All Clients</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {clients.map((client) => (
                <div key={client.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">Trainer: {client.trainer}</p>
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
                      <p className="text-sm text-gray-600">Program</p>
                      <p className="font-medium">{client.program}</p>
                    </div>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 