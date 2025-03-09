'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiLogOut } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { DASHBOARD_TABS, DashboardTabType } from '@/constants/dashboard';
import { getGreeting } from '@/utils/dateTime';
import type { ScheduleDay, Supplement, WorkoutProgram } from '@/types/dashboard';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export default function ClientDashboard() {
  const { userData, isLoading, handleLogout } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTabType>(DASHBOARD_TABS.OVERVIEW);
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [workoutProgram, setWorkoutProgram] = useState<WorkoutProgram | null>(null);

  if (isLoading || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navbar />
      
      {/* Dashboard Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{getGreeting()}, {userData.full_name}</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Trainer:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm font-medium">
                  Not Assigned
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiLogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-4">
              {Object.values(DASHBOARD_TABS).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
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
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === DASHBOARD_TABS.OVERVIEW && (
          <div className="space-y-6">
            <QuickStats userData={userData} />
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === DASHBOARD_TABS.SCHEDULE && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {schedule.length > 0 ? (
                schedule.map((day) => (
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
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No schedule available yet
                </div>
              )}
            </div>
          </div>
        )}

        {/* Supplements Tab */}
        {activeTab === DASHBOARD_TABS.SUPPLEMENTS && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recommended Supplements</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {supplements.length > 0 ? (
                supplements.map((supplement) => (
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
                          {supplement.benefits.map((benefit) => (
                            <span
                              key={benefit}
                              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center text-gray-500">
                  No supplements recommended yet
                </div>
              )}
            </div>
          </div>
        )}

        {/* Workouts Tab */}
        {activeTab === DASHBOARD_TABS.WORKOUTS && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {workoutProgram ? workoutProgram.name : 'Workout Program'}
              </h2>
            </div>
            <div className="p-6">
              {workoutProgram ? (
                workoutProgram.weeks.map((week) => (
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
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No workout program available yet
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === DASHBOARD_TABS.PROGRESS && (
          <div className="text-center text-gray-500 p-6">
            Progress tracking coming soon
          </div>
        )}
      </main>
    </div>
  );
} 