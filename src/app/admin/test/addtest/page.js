// src/app/admin/test/addtest.js
"use client";
import AnimatedBackground from '../../../../components/AnimatedBackground';
import { useState } from 'react';

export default function AddTestPage() {
  const [form, setForm] = useState({
    title: '', 
    category: '', 
    price: 0, 
    description: '', 
    duration: 60, 
    image: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const result = await res.json();
    alert(result.message);
  };

  return (
    <AnimatedBackground height="min-h-screen">
      <div className="p-6 sm:p-10 max-w-2xl mx-auto">
        {/* Glassmorphism Card - Darker Version */}
        <div className="bg-gray-900/80 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Card Header (Kept your beautiful gradient) */}
          <div className="bg-gradient-to-r from-blue-500 to-pink-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Create New Test
            </h1>
            <p className="text-white/80 text-center mt-2">
              Fill in the details below to add a new test to your platform
            </p>
          </div>
          
          {/* Card Body - Darker with Better Contrast */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 bg-gray-800/70">
            {/* Input Fields */}
            {['title', 'category', 'description', 'image'].map(field => (
              <div key={field} className="space-y-2">
                <label className="block text-gray-300 text-sm font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}

            {/* Price and Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-300 text-sm font-medium">
                  Price ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input 
                    name="price" 
                    type="number" 
                    value={form.price} 
                    onChange={handleChange} 
                    className="w-full pl-8 pr-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-gray-300 text-sm font-medium">
                  Duration (minutes)
                </label>
                <div className="relative">
                  <input 
                    name="duration" 
                    type="number" 
                    value={form.duration} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="60"
                    min="1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">min</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Create Test
                <span className="ml-2">✨</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatedBackground>
  );
}