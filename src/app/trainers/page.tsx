'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiFilter, FiStar, FiMapPin } from 'react-icons/fi';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

type Specialization = 'Weight Loss' | 'Muscle Building' | 'Strength Training' | 'HIIT' | 'Yoga' | 'Nutrition';

type Trainer = {
  id: string;
  name: string;
  image: string;
  specializations: Specialization[];
  experience: number;
  rating: number;
  reviewCount: number;
  location: string;
  bio: string;
  price: {
    amount: number;
    currency: string;
    per: string;
  };
  availability: string[];
  certifications: string[];
};

const trainers: Trainer[] = [
  {
    id: '1',
    name: 'John Smith',
    image: '/images/trainers/trainer1.jpg',
    specializations: ['Weight Loss', 'Muscle Building', 'Strength Training'],
    experience: 8,
    rating: 4.9,
    reviewCount: 127,
    location: 'New York, NY',
    bio: 'Certified personal trainer with 8+ years of experience helping clients achieve their fitness goals through personalized training programs.',
    price: {
      amount: 75,
      currency: 'USD',
      per: 'session'
    },
    availability: ['Morning', 'Evening', 'Weekend'],
    certifications: ['NASM CPT', 'ACE Nutrition Specialist', 'CrossFit Level 2'],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    image: '/images/trainers/trainer2.jpg',
    specializations: ['HIIT', 'Weight Loss', 'Nutrition'],
    experience: 6,
    rating: 4.8,
    reviewCount: 98,
    location: 'Los Angeles, CA',
    bio: 'Passionate about helping people transform their lives through fitness and proper nutrition. Specializing in HIIT and weight loss programs.',
    price: {
      amount: 65,
      currency: 'USD',
      per: 'session'
    },
    availability: ['Afternoon', 'Evening', 'Weekend'],
    certifications: ['ACE CPT', 'Precision Nutrition Level 1', 'TRX Certified'],
  },
  {
    id: '3',
    name: 'Michael Chen',
    image: '/images/trainers/trainer3.jpg',
    specializations: ['Strength Training', 'Muscle Building', 'HIIT'],
    experience: 10,
    rating: 5.0,
    reviewCount: 156,
    location: 'San Francisco, CA',
    bio: 'Former competitive powerlifter turned personal trainer. Expert in strength training and muscle development.',
    price: {
      amount: 85,
      currency: 'USD',
      per: 'session'
    },
    availability: ['Morning', 'Afternoon', 'Evening'],
    certifications: ['NSCA CSCS', 'USA Weightlifting Level 2', 'FMS Certified'],
  },
  {
    id: '4',
    name: 'Emma Davis',
    image: '/images/trainers/trainer4.jpg',
    specializations: ['Yoga', 'Weight Loss', 'Nutrition'],
    experience: 5,
    rating: 4.7,
    reviewCount: 82,
    location: 'Austin, TX',
    bio: 'Combining traditional yoga practices with modern fitness techniques to create balanced, sustainable workout programs.',
    price: {
      amount: 60,
      currency: 'USD',
      per: 'session'
    },
    availability: ['Morning', 'Evening'],
    certifications: ['RYT 500', 'ACE CPT', 'Nutritional Therapy Practitioner'],
  },
];

const specializations: Specialization[] = ['Weight Loss', 'Muscle Building', 'Strength Training', 'HIIT', 'Yoga', 'Nutrition'];
const availabilityOptions = ['Morning', 'Afternoon', 'Evening', 'Weekend'];

export default function TrainersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState<Specialization[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = 
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecializations = 
      selectedSpecializations.length === 0 ||
      selectedSpecializations.some(spec => trainer.specializations.includes(spec));

    const matchesAvailability =
      selectedAvailability.length === 0 ||
      selectedAvailability.some(time => trainer.availability.includes(time));

    return matchesSearch && matchesSpecializations && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Expert Fitness Trainers
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Find the perfect trainer to help you achieve your fitness goals
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Search trainers by name, location, or expertise..."
                className="input-field w-full md:w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FiFilter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {specializations.map(spec => (
                      <button
                        key={spec}
                        onClick={() => setSelectedSpecializations(prev => 
                          prev.includes(spec)
                            ? prev.filter(s => s !== spec)
                            : [...prev, spec]
                        )}
                        className={`px-3 py-1 rounded-full text-sm
                          ${selectedSpecializations.includes(spec)
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Availability</h3>
                  <div className="flex flex-wrap gap-2">
                    {availabilityOptions.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedAvailability(prev => 
                          prev.includes(time)
                            ? prev.filter(t => t !== time)
                            : [...prev, time]
                        )}
                        className={`px-3 py-1 rounded-full text-sm
                          ${selectedAvailability.includes(time)
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainers.map((trainer) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Placeholder for trainer image */}
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                    {/* Replace with actual Image component when you have images */}
                    <div className="text-gray-400">Trainer Photo</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{trainer.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <FiMapPin className="w-4 h-4 mr-1" />
                        {trainer.location}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{trainer.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({trainer.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{trainer.bio}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Specializations:</h4>
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

                    <div>
                      <h4 className="text-sm font-medium mb-2">Certifications:</h4>
                      <div className="flex flex-wrap gap-2">
                        {trainer.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t flex justify-between items-center">
                      <div>
                        <span className="text-lg font-semibold text-blue-600">
                          ${trainer.price.amount}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          per {trainer.price.per}
                        </span>
                      </div>
                      <button className="btn-primary">
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 