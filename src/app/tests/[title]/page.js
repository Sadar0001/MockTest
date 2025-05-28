"use client";
import { useEffect, useState } from 'react';
import AnimatedBackground from '../../../components/AnimatedBackground';
import { Dialog } from '@headlessui/react';

export default function TestTitleCard({ params }) {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`/api/test?title=${encodeURIComponent(params.title)}`);
        const data = await response.json();
        setTest(data.test);
      } catch (error) {
        console.error('Error fetching test:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [params.title]);

  if (loading) {
    return (
      <AnimatedBackground variant="centent">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading test...</div>
        </div>
      </AnimatedBackground>
    );
  }

  if (!test) {
    return (
      <AnimatedBackground variant="centent">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Test not found</div>
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground variant="centent">
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/70 via-black/70 to-pink-900/70 rounded-2xl overflow-hidden shadow-2xl border border-blue-400/30">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-black p-6 border-b border-pink-500/30">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 mb-2">
              {test.title}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-pink-900/50 text-pink-100 rounded-full text-sm font-medium">
                {test.category}
              </span>
              <span className="px-3 py-1 bg-blue-900/50 text-blue-100 rounded-full text-sm font-medium">
                {test.duration} mins
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative h-64 md:h-full rounded-lg overflow-hidden border-2 border-pink-500/20">
              {test.image ? (
                <img 
                  src={test.image} 
                  alt={test.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/30 to-pink-900/30">
                  <span className="text-white/50 text-lg">Test Image</span>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Description</h2>
                <p className="text-gray-300 leading-relaxed">
                  {test.description || 'No description provided for this test.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-800/50">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-blue-300">Difficulty</h3>
                  <p className="text-white">Intermediate</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-pink-300">Questions</h3>
                  <p className="text-white">{test.questions?.length || 20}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-blue-300">Rating</h3>
                  <p className="text-white">4.5/5</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-pink-300">Attempts</h3>
                  <p className="text-white">1,240</p>
                </div>
              </div>

              <div className="pt-6 border-t border-pink-800/50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Price</p>
                    <p className="text-3xl font-bold text-white">${test.price}</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-8 py-3 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 rounded-lg text-white font-semibold shadow-lg transition-all transform hover:scale-105"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-black to-blue-900 p-4 border-t border-pink-500/30 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Test Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Purchase Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative bg-gradient-to-br from-blue-900/90 to-pink-900/90 border border-pink-500/30 rounded-xl max-w-md mx-auto p-8 shadow-2xl">
            <Dialog.Title className="text-2xl font-bold text-white mb-4">
              Purchase Confirmation
            </Dialog.Title>
            <Dialog.Description className="text-gray-300 mb-6">
              You are about to purchase "{test.title}" for ${test.price}. This feature is currently in development.
            </Dialog.Description>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Add purchase logic here later
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 text-white rounded-lg transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </AnimatedBackground>
  );
}