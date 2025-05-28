// components/CategorySection.jsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/test/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-lg">
      {/* Left Side - Static Content */}
      <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">These are the categories we serve</h2>
        <p className="text-blue-100 mb-6">
          Explore our comprehensive test categories designed to help you excel in your exams.
        </p>
        <div className="flex items-center">
          <div className="w-12 h-1 bg-white mr-4"></div>
          <span className="text-sm font-medium">SWIPE TO EXPLORE</span>
        </div>
      </div>

      {/* Right Side - Dynamic Categories */}
      <div className="w-full md:w-2/3 p-6">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link 
                key={category._id} 
                href={`/tests?category=${category._id}`}
                className="group"
              >
                <div className="h-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-200 flex flex-col items-center justify-center">
                  <div className="text-3xl mb-2 group-hover:text-blue-600 transition-colors">
                    {getCategoryIcon(category._id)}
                  </div>
                  <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors capitalize">
                    {category._id}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {category.count} tests available
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get icons for categories
const getCategoryIcon = (category) => {
  const icons = {
    math: '🧮',
    science: '🔬',
    history: '🏛️',
    language: '🗣️'
  };
  return icons[category] || '📝';
};

export default CategorySection;