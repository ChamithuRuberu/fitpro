import React from 'react'

function signUp() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col lg:flex-row max-w-4xl w-full mx-4 lg:mx-0">
                {/* Image Section */}
                <div className="bg-black lg:w-1/2">
                    <img
                        src="auth/register.png" // Update the image path
                        alt="Registration Image"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Form Section */}
                <div className="bg-white p-8 rounded-lg shadow-md lg:w-1/2 max-h-[80vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 font-serif">
                        Register for Your Fitness Center
                    </h2>
                    <h6 className="text-md font-normal mb-6 text-center text-gray-500">
                        Start your fitness journey today!
                    </h6>

                    {/* Registration Form */}
                    <form>
                        {/* Full Name */}
                        <div className="mb-4">
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Email */}
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Fitness Goals */}
                        <div className="mb-4">
                            <label
                                htmlFor="fitnessGoals"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Fitness Goals
                            </label>
                            <select
                                id="fitnessGoals"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select your goal</option>
                                <option value="weightLoss">Weight Loss</option>
                                <option value="muscleGain">Muscle Gain</option>
                                <option value="endurance">Endurance Training</option>
                                <option value="generalFitness">General Fitness</option>
                            </select>
                        </div>

                        {/* Preferred Workout Time */}
                        <div className="mb-4">
                            <label
                                htmlFor="workoutTime"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Preferred Workout Time
                            </label>
                            <input
                                type="time"
                                id="workoutTime"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Terms and Conditions */}
                        <div className="mb-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    required
                                />
                                <label
                                    htmlFor="terms"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    I agree to the{' '}
                                    <a href="/terms" className="text-blue-600 hover:underline">
                                        terms and conditions
                                    </a>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-950 text-white py-2 px-4 rounded-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>)
}

export default signUp