'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiTarget } from 'react-icons/fi';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

type ProgramFormData = {
  height: string;
  weight: string;
  age: string;
  gender: string;
  fitnessGoal: string;
  activityLevel: string;
  healthConditions: string;
  dietaryRestrictions: string;
};

// Sample workout programs based on fitness goals
const workoutPrograms = {
  'weight-loss': {
    title: 'Weight Loss Program',
    duration: '12 weeks',
    sessionsPerWeek: 4,
    exercises: [
      { name: 'HIIT Cardio', duration: '30 mins', frequency: '3x/week' },
      { name: 'Strength Training', duration: '45 mins', frequency: '2x/week' },
      { name: 'Core Workout', duration: '20 mins', frequency: '3x/week' },
    ],
  },
  'muscle-gain': {
    title: 'Muscle Building Program',
    duration: '12 weeks',
    sessionsPerWeek: 5,
    exercises: [
      { name: 'Heavy Compound Lifts', duration: '60 mins', frequency: '3x/week' },
      { name: 'Isolation Exercises', duration: '45 mins', frequency: '2x/week' },
      { name: 'Recovery Training', duration: '30 mins', frequency: '1x/week' },
    ],
  },
  'endurance': {
    title: 'Endurance Training Program',
    duration: '12 weeks',
    sessionsPerWeek: 4,
    exercises: [
      { name: 'Long Distance Running', duration: '60 mins', frequency: '2x/week' },
      { name: 'Interval Training', duration: '45 mins', frequency: '2x/week' },
      { name: 'Cross Training', duration: '45 mins', frequency: '1x/week' },
    ],
  },
  'flexibility': {
    title: 'Flexibility & Mobility Program',
    duration: '12 weeks',
    sessionsPerWeek: 3,
    exercises: [
      { name: 'Yoga', duration: '60 mins', frequency: '2x/week' },
      { name: 'Dynamic Stretching', duration: '30 mins', frequency: '3x/week' },
      { name: 'Mobility Work', duration: '30 mins', frequency: '2x/week' },
    ],
  },
  'general-fitness': {
    title: 'General Fitness Program',
    duration: '12 weeks',
    sessionsPerWeek: 3,
    exercises: [
      { name: 'Full Body Workout', duration: '45 mins', frequency: '2x/week' },
      { name: 'Cardio Mix', duration: '30 mins', frequency: '2x/week' },
      { name: 'Flexibility Work', duration: '30 mins', frequency: '1x/week' },
    ],
  },
};

export default function ProgramsPage() {
  const [formData, setFormData] = useState<ProgramFormData | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  useEffect(() => {
    // Retrieve form data from localStorage
    const savedFormData = localStorage.getItem('programFormData');
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setFormData(parsedData);
      setSelectedProgram(workoutPrograms[parsedData.fitnessGoal as keyof typeof workoutPrograms]);
    }
  }, []);

  if (!formData || !selectedProgram) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Navbar /> */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Please complete the program form first</h2>
            <p className="mt-2 text-gray-600">Go to Programs in the navigation and fill out your details.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Program Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
          >
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Personalized {selectedProgram.title}
            </h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <FiCalendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{selectedProgram.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Sessions/Week</p>
                  <p className="font-medium">{selectedProgram.sessionsPerWeek}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FiTarget className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Goal</p>
                  <p className="font-medium">{formData.fitnessGoal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Program Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Workout Schedule</h2>
            <div className="space-y-4">
              {selectedProgram.exercises.map((exercise: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{exercise.name}</h3>
                    <p className="text-sm text-gray-600">Duration: {exercise.duration}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {exercise.frequency}
                  </div>
                </div>
              ))}
            </div>

            {/* Program Recommendations */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Program Recommendations</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Start with proper warm-up exercises</li>
                  <li>Stay hydrated throughout your workouts</li>
                  <li>Maintain proper form for all exercises</li>
                  <li>Track your progress weekly</li>
                  <li>Get adequate rest between sessions</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                onClick={() => window.print()}
              >
                Download Program
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Start Program
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 