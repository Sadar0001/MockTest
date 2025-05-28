'use client';
import React, { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import InfiniteCarousel from '../components/InfiniteCarousel';
import HeroCard from '../components/cards/HeroCard';
import CategorySection from '../components/CategorySection';

function Homepage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        style={{ scale, opacity, y }}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">
          <div className="w-full md:w-1/2 flex items-center p-8">
            <AnimatedCard />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 space-y-6">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-indigo-900"
            >
              Welcome Learner!
            </motion.h3>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-indigo-700"
            >
              Discover your potential with our professional courses and beautiful learning experience.
            </motion.h4>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full shadow-lg self-start transition-all duration-300"
            >
              Start Learning
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Infinite Carousel with Scroll Trigger */}
      <div className="py-20 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">Featured Courses</h2>
          <InfiniteCarousel />
        </motion.div>
      </div>

      {/* Category Section with Staggered Animation */}
      <div className="py-20 bg-indigo-50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">Explore Categories</h2>
          <CategorySection />
        </motion.div>
      </div>

      {/* Hero Card with Fade-in Effect */}
      <div className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <HeroCard />
        </motion.div>
      </div>

      {/* Call to Action with Pulse Animation */}
      <div className="py-20 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-indigo-900">Ready to start your journey?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(99, 102, 241, 0.7)",
                "0 0 0 10px rgba(99, 102, 241, 0)",
                "0 0 0 0 rgba(99, 102, 241, 0)"
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 px-8 rounded-full shadow-lg text-lg"
          >
            Join Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Homepage;