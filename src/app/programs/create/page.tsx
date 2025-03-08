'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FiPlus } from 'react-icons/fi';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export default function CreateProgramPage() {
  const router = useRouter();
  const [programFormData, setProgramFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: 'male',
    fitnessGoal: 'weight-loss',
    activityLevel: 'sedentary',
    healthConditions: '',
    dietaryRestrictions: '',
  });

  const handleProgramFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Store the form data in localStorage
      localStorage.setItem('programFormData', JSON.stringify(programFormData));
      
      // Navigate to programs view page
      router.push('/programs');
    } catch (error) {
      console.error('Error submitting program form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Create Your Fitness Program</h2>
              <p className="mt-1 text-sm text-gray-600">Fill out the form below to get your personalized workout program</p>
            </div>
            <form onSubmit={handleProgramFormSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    value={programFormData.height}
                    onChange={(e) => setProgramFormData({ ...programFormData, height: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={programFormData.weight}
                    onChange={(e) => setProgramFormData({ ...programFormData, weight: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={programFormData.age}
                    onChange={(e) => setProgramFormData({ ...programFormData, age: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={programFormData.gender}
                    onChange={(e) => setProgramFormData({ ...programFormData, gender: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700">
                  Fitness Goal
                </label>
                <select
                  id="fitnessGoal"
                  value={programFormData.fitnessGoal}
                  onChange={(e) => setProgramFormData({ ...programFormData, fitnessGoal: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="weight-loss">Weight Loss</option>
                  <option value="muscle-gain">Muscle Gain</option>
                  <option value="endurance">Endurance</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="general-fitness">General Fitness</option>
                </select>
              </div>

              <div>
                <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">
                  Activity Level
                </label>
                <select
                  id="activityLevel"
                  value={programFormData.activityLevel}
                  onChange={(e) => setProgramFormData({ ...programFormData, activityLevel: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="sedentary">Sedentary (Little to no exercise)</option>
                  <option value="light">Light (Exercise 1-3 times/week)</option>
                  <option value="moderate">Moderate (Exercise 3-5 times/week)</option>
                  <option value="active">Active (Exercise 6-7 times/week)</option>
                  <option value="very-active">Very Active (Exercise multiple times/day)</option>
                </select>
              </div>

              <div>
                <label htmlFor="healthConditions" className="block text-sm font-medium text-gray-700">
                  Health Conditions (if any)
                </label>
                <textarea
                  id="healthConditions"
                  value={programFormData.healthConditions}
                  onChange={(e) => setProgramFormData({ ...programFormData, healthConditions: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="List any health conditions or injuries..."
                />
              </div>

              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">
                  Dietary Restrictions (if any)
                </label>
                <textarea
                  id="dietaryRestrictions"
                  value={programFormData.dietaryRestrictions}
                  onChange={(e) => setProgramFormData({ ...programFormData, dietaryRestrictions: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="List any dietary restrictions or preferences..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Get Your Program
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 