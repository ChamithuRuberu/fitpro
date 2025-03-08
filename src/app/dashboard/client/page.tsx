'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiCalendar, FiActivity, FiTrendingUp, FiPackage, FiDollarSign, FiUser, FiPlus } from 'react-icons/fi';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

// Sample data
const clientData = {
  name: 'John Doe',
  registeredDate: '2024-01-15',
  nextPaymentDate: '2024-04-15',
  subscription: 'Premium',
  trainer: 'Sarah Wilson',
  bmi: {
    current: 24.5,
    history: [
      { date: '2024-01-15', value: 26.2 },
      { date: '2024-02-15', value: 25.4 },
      { date: '2024-03-15', value: 24.5 },
    ],
    category: 'Normal weight',
  },
  progress: {
    weight: {
      current: 75,
      goal: 70,
      start: 82,
    },
    monthlyAttendance: 85,
    completedWorkouts: 24,
    achievedGoals: 7,
  },
};

const schedule = [
  {
    id: 1,
    day: 'Monday',
    workouts: [
      { time: '07:00 AM', type: 'Cardio', duration: '45 min' },
      { time: '06:00 PM', type: 'Strength Training', duration: '60 min' },
    ],
  },
  {
    id: 2,
    day: 'Wednesday',
    workouts: [
      { time: '08:00 AM', type: 'HIIT', duration: '30 min' },
      { time: '05:00 PM', type: 'Core Training', duration: '45 min' },
    ],
  },
  // Add more days...
];

const recommendedSupplements = [
  {
    id: 1,
    name: 'Whey Protein Isolate',
    timing: 'Post-workout',
    dosage: '30g scoop',
    benefits: ['Muscle recovery', 'Protein synthesis'],
    recommended: true,
  },
  {
    id: 2,
    name: 'BCAA Complex',
    timing: 'During workout',
    dosage: '5g',
    benefits: ['Muscle preservation', 'Reduced fatigue'],
    recommended: true,
  },
  // Add more supplements...
];

const workoutProgram = {
  name: 'Weight Loss & Strength Program',
  weeks: [
    {
      weekNumber: 1,
      workouts: [
        {
          day: 'Monday',
          exercises: [
            { name: 'Squats', sets: 3, reps: 12, weight: '50kg' },
            { name: 'Bench Press', sets: 3, reps: 10, weight: '40kg' },
            { name: 'Deadlifts', sets: 3, reps: 8, weight: '60kg' },
          ],
        },
        // Add more days...
      ],
    },
    // Add more weeks...
  ],
};

export default function ClientDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'supplements' | 'workouts' | 'progress'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Dashboard Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome, {clientData.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Trainer: {clientData.trainer}</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                {clientData.subscription}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mt-6">
            {['overview', 'schedule', 'supplements', 'workouts', 'progress'].map((tab) => (
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
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">BMI Status</p>
                    <p className="text-2xl font-semibold text-gray-900">{clientData.bmi.current}</p>
                    <p className="text-sm text-gray-600">{clientData.bmi.category}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-full">
                    <FiUser className="w-6 h-6 text-blue-600" />
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
                    <p className="text-sm font-medium text-gray-600">Next Payment</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {new Date(clientData.nextPaymentDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">Subscription: {clientData.subscription}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-full">
                    <FiDollarSign className="w-6 h-6 text-green-600" />
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
                    <p className="text-sm font-medium text-gray-600">Monthly Progress</p>
                    <p className="text-2xl font-semibold text-gray-900">{clientData.progress.monthlyAttendance}%</p>
                    <p className="text-sm text-gray-600">Attendance Rate</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-full">
                    <FiActivity className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Registration Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Account Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Registered Date</p>
                  <p className="font-medium">{new Date(clientData.registeredDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Membership Status</p>
                  <p className="font-medium">{clientData.subscription}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {schedule.map((day) => (
                <div key={day.id} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{day.day}</h3>
                  <div className="space-y-4">
                    {day.workouts.map((workout, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div>
                          <p className="font-medium">{workout.type}</p>
                          <p className="text-sm text-gray-600">{workout.time}</p>
                        </div>
                        <span className="text-sm text-gray-600">{workout.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supplements Tab */}
        {activeTab === 'supplements' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recommended Supplements</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {recommendedSupplements.map((supplement) => (
                <div key={supplement.id} className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{supplement.name}</h3>
                    {supplement.recommended && (
                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Timing</p>
                      <p className="font-medium">{supplement.timing}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Dosage</p>
                      <p className="font-medium">{supplement.dosage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Benefits</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {supplement.benefits.map((benefit, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workouts Tab */}
        {activeTab === 'workouts' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{workoutProgram.name}</h2>
            </div>
            <div className="p-6">
              {workoutProgram.weeks.map((week) => (
                <div key={week.weekNumber} className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Week {week.weekNumber}</h3>
                  <div className="space-y-6">
                    {week.workouts.map((workout, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-medium mb-4">{workout.day}</h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {workout.exercises.map((exercise, i) => (
                            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="font-medium">{exercise.name}</p>
                              <div className="mt-2 text-sm text-gray-600">
                                <p>{exercise.sets} sets × {exercise.reps} reps</p>
                                <p>Weight: {exercise.weight}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Weight Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Weight Progress</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Starting Weight</p>
                  <p className="text-lg font-semibold">{clientData.progress.weight.start} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Weight</p>
                  <p className="text-lg font-semibold">{clientData.progress.weight.current} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Goal Weight</p>
                  <p className="text-lg font-semibold">{clientData.progress.weight.goal} kg</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${((clientData.progress.weight.start - clientData.progress.weight.current) /
                        (clientData.progress.weight.start - clientData.progress.weight.goal)) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* BMI History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">BMI History</h2>
              <div className="space-y-4">
                {clientData.bmi.history.map((record, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{new Date(record.date).toLocaleDateString()}</span>
                    <span className="font-medium">{record.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Monthly Achievement</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Completed Workouts</p>
                  <p className="text-lg font-semibold">{clientData.progress.completedWorkouts}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                  <p className="text-lg font-semibold">{clientData.progress.monthlyAttendance}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Goals Achieved</p>
                  <p className="text-lg font-semibold">{clientData.progress.achievedGoals}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 