'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiCalendar, FiActivity, FiTrendingUp, FiPackage, FiDollarSign, FiUser, FiPlus, FiLogOut } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { getSession } from '@/actions';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

interface UserData {
  email: string;
  city: string;
  status: string;
  mobile: string;
  full_name: string;
  gov_id: string | null;
}

interface Workout {
  time: string;
  type: string;
  duration: string;
}

interface ScheduleDay {
  id: number;
  day: string;
  workouts: Workout[];
}

interface Supplement {
  id: number;
  name: string;
  timing: string;
  dosage: string;
  benefits: string[];
  recommended: boolean;
}

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: string;
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

interface WorkoutWeek {
  weekNumber: number;
  workouts: WorkoutDay[];
}

interface WorkoutProgram {
  name: string;
  weeks: WorkoutWeek[];
}

export default function ClientDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'supplements' | 'workouts' | 'progress'>('overview');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [workoutProgram, setWorkoutProgram] = useState<WorkoutProgram | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 22) return 'Good Evening';
    return 'Good Night';
  };


  useEffect(() => {
    //fetch user data
    const fetchUserData = async () => {
      const auth = await getSession();
      console.log(JSON.stringify(auth, null, 2)); // Pretty-print JSON
     
    };
    fetchUserData();


  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Dashboard Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            {/* <h1 className="text-2xl font-semibold text-gray-900">{getGreeting()}, {userData.full_name}</h1> */}
            <div className="flex items-center space-x-6">

              <button
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
              {['overview', 'schedule', 'supplements', 'workouts', 'progress'].map((tab) => (
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
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Trainer:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm font-medium">
                Not Assigned
              </span>
            </div>
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
                    <p className="text-sm font-medium text-gray-600">Contact Info</p>
                    {/* <p className="text-lg font-semibold text-gray-900">{userData.mobile}</p> */}
                    {/* <p className="text-sm text-gray-600">{userData.email}</p> */}
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
                    <p className="text-sm font-medium text-gray-600">Location</p>
                    {/* <p className="text-lg font-semibold text-gray-900">{userData.city}</p> */}
                    <p className="text-sm text-gray-600">Current City</p>
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
                    <p className="text-sm font-medium text-gray-600">Account Status</p>
                    {/* <p className="text-lg font-semibold text-gray-900">{userData.status}</p> */}
                    <p className="text-sm text-gray-600">Current Status</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-full">
                    <FiActivity className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>
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
              {schedule.length > 0 ? (
                schedule.map((day: ScheduleDay) => (
                  <div key={day.id} className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{day.day}</h3>
                    <div className="space-y-4">
                      {day.workouts.map((workout: Workout, index: number) => (
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
        {activeTab === 'supplements' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recommended Supplements</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {supplements.length > 0 ? (
                supplements.map((supplement: Supplement) => (
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
                          {supplement.benefits.map((benefit: string, index: number) => (
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
        {activeTab === 'workouts' && (
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
        {activeTab === 'progress' && (
          <div className="text-center text-gray-500 p-6">
            Progress tracking coming soon
          </div>
        )}
      </main>
    </div>
  );
} 