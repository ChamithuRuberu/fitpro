'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import { IoNutritionOutline } from 'react-icons/io5';
import { nutritionItems } from '@/data/nutritionItems';
import type { NutritionItem } from '@/types/nutrition';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

// Filter categories
const categories = ['All', 'Supplements', 'Healthy Foods'];
const supplementSubCategories = ['Protein', 'Performance', 'Recovery', 'Vitamins'];
const foodSubCategories = ['Protein', 'Grains', 'Vegetables', 'Fruits'];

export default function NutritionPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubCategories, setActiveSubCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter items based on selected categories and search query
  const filteredItems = nutritionItems.filter(item => {
    const matchesCategory = 
      activeCategory === 'All' || 
      (activeCategory === 'Supplements' && item.category === 'supplement') ||
      (activeCategory === 'Healthy Foods' && item.category === 'food');

    const matchesSubCategory = 
      activeSubCategories.length === 0 || 
      activeSubCategories.includes(item.subCategory);

    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Nutrition Guide
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover supplements and healthy foods to support your fitness journey
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Category Tabs */}
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveSubCategories([]);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                className="input-field max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <FiFilter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Sub Categories</h3>
              <div className="flex flex-wrap gap-2">
                {(activeCategory === 'Supplements' ? supplementSubCategories : foodSubCategories).map(subCat => (
                  <button
                    key={subCat}
                    onClick={() => setActiveSubCategories(prev => 
                      prev.includes(subCat)
                        ? prev.filter(cat => cat !== subCat)
                        : [...prev, subCat]
                    )}
                    className={`px-3 py-1 rounded-full text-sm
                      ${activeSubCategories.includes(subCat)
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {subCat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Placeholder for actual images */}
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                    <IoNutritionOutline className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                      {item.subCategory}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  
                  {/* Nutritional Info */}
                  {item.nutritionalInfo && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Nutrition Facts (per {item.servingSize})</h4>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-medium">{item.nutritionalInfo.calories}</div>
                          <div className="text-xs text-gray-500">Calories</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-medium">{item.nutritionalInfo.protein}g</div>
                          <div className="text-xs text-gray-500">Protein</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-medium">{item.nutritionalInfo.carbs}g</div>
                          <div className="text-xs text-gray-500">Carbs</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-medium">{item.nutritionalInfo.fats}g</div>
                          <div className="text-xs text-gray-500">Fats</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price if available */}
                  {item.price && (
                    <div className="mt-4 pt-4 border-t">
                      <span className="text-lg font-semibold text-blue-600">
                        ${item.price.amount}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        per {item.servingSize}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 