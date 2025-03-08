'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaDumbbell, FaHeartbeat, FaAppleAlt } from 'react-icons/fa';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

const features = [
  {
    icon: <FaDumbbell className="w-6 h-6 text-blue-500" />,
    title: "Personalized Workouts",
    description: "Get custom workout plans tailored to your goals, fitness level, and available equipment."
  },
  {
    icon: <FaHeartbeat className="w-6 h-6 text-blue-500" />,
    title: "Progress Tracking",
    description: "Track your workouts, measurements, and achievements with our intuitive tools."
  },
  {
    icon: <FaAppleAlt className="w-6 h-6 text-blue-500" />,
    title: "Nutrition Guidance",
    description: "Access meal plans and nutritional advice to support your fitness goals."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transform Your Body,<br />
              <span className="text-blue-400">Transform Your Life</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start your fitness journey today with personalized workouts, 
              expert guidance, and a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-primary">
                Get Started Free
              </Link>
              <Link href="/programs" className="btn-secondary">
                View Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose FitPro?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of others who have transformed their lives with FitPro.
          </p>
          <Link href="/signup" className="btn-primary">
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </main>
  );
}
