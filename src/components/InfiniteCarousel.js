'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const features = [
  { icon: '🧠', text: 'Trains Critical Thinking', color: 'from-sky-500 to-pink-500' },
  { icon: '⚡', text: 'Boosts Problem-solving Speed', color: 'from-pink-500 to-fuchsia-500' },
  { icon: '📊', text: 'Performance Analytics', color: 'from-cyan-400 to-sky-500' },
  { icon: '🎯', text: 'Exam Pattern Mastery', color: 'from-pink-600 to-purple-500' },
  { icon: '🕒', text: 'Time Management Skills', color: 'from-indigo-500 to-sky-500' },
  { icon: '📚', text: 'Comprehensive Question Bank', color: 'from-purple-500 to-pink-500' },
  { icon: '🔄', text: 'Adaptive Learning Paths', color: 'from-cyan-500 to-blue-500' },
  { icon: '🏆', text: 'Competitive Benchmarking', color: 'from-rose-500 to-pink-500' },
  { icon: '💡', text: 'Concept Clarification', color: 'from-blue-500 to-indigo-500' },
  { icon: '📈', text: 'Progress Tracking', color: 'from-sky-500 to-pink-500' },
  { icon: '🤖', text: 'AI-Powered Recommendations', color: 'from-fuchsia-500 to-rose-500' },
  { icon: '🧩', text: 'Pattern Recognition Training', color: 'from-indigo-500 to-purple-500' }
];


const InfiniteCarousel = () => {
  const carousel = useRef();
  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate the width of each card including margin
  const cardWidth = 256; // w-64 = 256px
  const cardMargin = 16; // mx-4 = 16px
  const cardTotalWidth = cardWidth + cardMargin * 2;

  // Auto-rotation effect
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + features.length) % features.length;
    setCurrentIndex(newIndex);
    
    controls.start({
      x: -newIndex * cardTotalWidth,
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
    });
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % features.length;
    setCurrentIndex(newIndex);
    
    controls.start({
      x: -newIndex * cardTotalWidth,
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
    });
  };

  return (
    <div 
      className="relative w-full overflow-hidden py-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="flex"
        ref={carousel}
        initial={{ x: 0 }}
        animate={controls}
        style={{ width: `${features.length * cardTotalWidth}px` }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={`${feature.text}-${index}`}
            className={`w-64 h-80 mx-4 flex-shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br ${feature.color} p-1 shadow-2xl`}
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${currentIndex === index ? '0deg' : '12deg'}) scale(${currentIndex === index ? 1.05 : 0.95})`,
              zIndex: currentIndex === index ? 10 : 1,
              boxShadow: currentIndex === index ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="relative w-full h-full rounded-xl bg-gray-900/90 overflow-hidden">
              {/* Particle effect background */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/10"
                    style={{
                      width: `${Math.random() * 6 + 2}px`,
                      height: `${Math.random() * 6 + 2}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${Math.random() * 10 + 5}s infinite ${Math.random() * 5}s`
                    }}
                  />
                ))}
              </div>
              
              {/* Card content */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.text}</h3>
                <div className="w-16 h-1 bg-white/30 my-4"></div>
                <p className="text-white/80 text-sm">
                  {feature.text.split(' ')[0]} your way to success with our advanced platform
                </p>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute -inset-8 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Navigation buttons */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg z-20 hover:bg-white/20 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg z-20 hover:bg-white/20 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default InfiniteCarousel;