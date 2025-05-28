'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';

const HeroCard = () => {
  const constraintsRef = useRef(null);
  const controls = useAnimation();
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 100, damping: 15 });
  const rotateY = useSpring(x, { stiffness: 100, damping: 15 });

  const imageUrl = 'https://as2.ftcdn.net/jpg/00/93/90/15/1000_F_93901583_pmJhlrt1OQ0LKDQvuS1sz5Cv5gjbxHoc.jpg';
  




  // Dramatic floating animation
  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await controls.start({
          y: [0, -15, 0],
          rotate: [0, -2, 2, 0],
          transition: { duration: 8, ease: "easeInOut" }
        });
        await controls.start({
          y: [0, 10, 0],
          rotate: [0, 2, -2, 0],
          transition: { duration: 8, ease: "easeInOut" }
        });
      }
    };
    sequence();
  }, [controls]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateMax = 15; // maximum tilt in degrees
    const newX = ((offsetX - centerX) / centerX) * rotateMax;
    const newY = ((centerY - offsetY) / centerY) * rotateMax;

    x.set(newX);
    y.set(newY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full max-w-8xl h-[220px] mx-auto" ref={constraintsRef}>
      {/* GLOW EFFECT */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-3xl -z-10" />

      {/* ANIMATED BACKGROUND */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-3xl"
        animate={{
          background: [
            'linear-gradient(45deg, #00AAEE 0%, #DD2476 100%)',
            'linear-gradient(135deg, #DD2476 0%, #00AAEE 100%)',
            'linear-gradient(225deg, #00AAEE 0%, #DD2476 100%)',
            'linear-gradient(315deg, #DD2476 0%, #00AAEE 100%)'
          ]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 backdrop-blur-sm rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* MAIN CARD CONTENT WITH TILT */}
      <motion.div
        ref={cardRef}
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer"
        animate={controls}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
      >
        {/* IMAGE BACKGROUND */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt="ExamPro Premium"
            fill
            className="object-cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* CARD TEXT */}
        <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-3">Unlock Your Potential</h2>
            <p className="text-xl mb-6 max-w-lg">
              Access premium mock tests and advanced analytics to ace your exams
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold shadow-lg"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>

        {/* FLOATING PARTICLES */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/30 backdrop-blur-sm"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default HeroCard;
