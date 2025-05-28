'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const AnimatedCard = ({ imageUrl = 'https://img.freepik.com/premium-photo/full-length-happy-college-students-walking-together-campus_763111-5348.jpg?uid=R124215923&ga=GA1.1.448158011.1745935300&semt=ais_items_boosted&w=740'
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const particles = useRef([]);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const card = cardRef.current;

    // Set canvas size
    const resizeCanvas = () => {
      if (card) {
        canvas.width = card.offsetWidth;
        canvas.height = card.offsetHeight;
      }
    };

    // Initialize particles
    const initParticles = () => {
      particles.current = [];
      const particleCount = 150;
      const { width, height } = canvas;

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          color: `hsl(${Math.random() * 60 + 190}, 80%, 60%)`,
          targetX: width / 2,
          targetY: height / 2,
          isActive: false
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw card outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current.forEach(particle => {
        if (isHovered || !particle.isActive) {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Reset particles that go off screen
          if (particle.x < 0 || particle.x > canvas.width || 
              particle.y < 0 || particle.y > canvas.height) {
            particle.x = Math.random() * canvas.width;
            particle.y = Math.random() * canvas.height;
          }
        } else {
          // Move toward card form
          particle.x += (particle.targetX - particle.x) * 0.05;
          particle.y += (particle.targetY - particle.y) * 0.05;
        }

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Activate particles after delay
    const timeout = setTimeout(() => {
      particles.current.forEach(p => p.isActive = true);
    }, 1000);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(timeout);
    };
  }, [isHovered]);

  return (
    <div 
      ref={cardRef}
      className="relative w-full max-w-2xl h-96 mx-auto rounded-xl overflow-hidden shadow-2xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-10"
      />
      
      {/* Image Content */}
      <div className="relative w-full h-full z-20 flex items-center justify-center p-8">
        <div className={`relative w-full h-full transition-all duration-1000 ${isHovered ? 'scale-95' : 'scale-100'}`}>
          <Image
            src={imageUrl}
            alt="Featured Content"
            fill
            className="object-cover rounded-lg"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
          
          {/* Card Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-30">
            <h3 className="text-2xl font-bold mb-2">ExamPro Premium</h3>
            <p className="text-sm opacity-90 mb-4">
              Unlock all mock tests and advanced analytics with our premium membership
            </p>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-medium hover:scale-105 transition-transform">
              Explore Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-xl z-0 transition-all duration-1000 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
           style={{
             background: 'radial-gradient(circle at center, rgba(0,170,238,0.3) 0%, rgba(221,36,118,0.1) 70%, transparent 100%)',
             boxShadow: isHovered ? '0 0 60px rgba(0,170,238,0.4)' : '0 0 30px rgba(0,170,238,0.2)'
           }} />
    </div>
  );
};

export default AnimatedCard;