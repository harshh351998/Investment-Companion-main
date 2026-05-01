'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';

const phrases = [
  'Expert financial guidance',
  'Smart investment strategies',
  'Practical courses',
  'Valuable resources'
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const isInView = useInView(heroRef, { once: false });
  
  // Mousemove parallax effect for particles
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { width, height, left, top } = heroRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to center of hero element
        const x = ((clientX - left) / width - 0.5) * 2;
        const y = ((clientY - top) / height - 0.5) * 2;
        
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate particles on mount and mouse movement
  useEffect(() => {
    if (particlesRef.current) {
      const particles = gsap.utils.toArray<HTMLElement>('.particle');
      
      // Initial particle positions
      particles.forEach((particle) => {
        gsap.set(particle, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          opacity: gsap.utils.random(0.3, 0.7)
        });
        
        // Continuous floating animation
        gsap.to(particle, {
          x: `+=${gsap.utils.random(-150, 150)}`,
          y: `+=${gsap.utils.random(-150, 150)}`,
          duration: gsap.utils.random(15, 30),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
      
      // Mousemove effect
      gsap.to(particlesRef.current, {
        x: mousePosition.x * 20,
        y: mousePosition.y * 20,
        duration: 1,
        ease: 'power2.out',
      });
    }
    
    // Animate orbit particles
    if (orbitRef.current) {
      const orbitParticles = gsap.utils.toArray<HTMLElement>('.orbit-particle');
      
      orbitParticles.forEach((particle) => {
        // Circular motion animation
        gsap.to(particle, {
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: gsap.utils.random(15, 25),
          repeat: -1,
          ease: 'none',
        });
        
        // Pulse animation
        gsap.to(particle, {
          scale: gsap.utils.random(0.8, 1.2),
          opacity: gsap.utils.random(0.4, 0.8),
          duration: gsap.utils.random(2, 5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, [mousePosition]);

  // Animate elements when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Typewriter animation for subtitle
  const [displayedText, setDisplayedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayedText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
        }, 50);
      } else {
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, currentPhraseIndex, isTyping]);

  const moveVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1 } 
    }
  };

  const glowVariants = {
    initial: { boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)' },
    hover: { boxShadow: '0 0 25px rgba(0, 255, 255, 0.7)' }
  };

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#051622] to-black opacity-90"></div>
      
      {/* Digital circuit lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse-slow"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse-slow"></div>
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse-slow"></div>
        <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse-slow"></div>
      </div>
      
      {/* Floating particles */}
      <div 
        ref={particlesRef} 
        className="absolute inset-0 pointer-events-none"
      >
        <div className="particle absolute left-[10%] top-[30%] h-2 w-2 rounded-full bg-cyan-400 opacity-40 animate-pulse-glow"></div>
        <div className="particle absolute left-[20%] top-[60%] h-3 w-3 rounded-full bg-blue-500 opacity-30"></div>
        <div className="particle absolute left-[85%] top-[20%] h-4 w-4 rounded-full bg-purple-400 opacity-20"></div>
        <div className="particle absolute left-[70%] top-[85%] h-2 w-2 rounded-full bg-cyan-300 opacity-40"></div>
        <div className="particle absolute left-[30%] top-[75%] h-3 w-3 rounded-full bg-blue-400 opacity-30"></div>
        <div className="particle absolute left-[15%] top-[15%] h-1 w-1 rounded-full bg-cyan-400 opacity-40"></div>
        <div className="particle absolute left-[60%] top-[40%] h-2 w-2 rounded-full bg-indigo-400 opacity-30"></div>
        <div className="particle absolute left-[80%] top-[60%] h-1 w-1 rounded-full bg-blue-300 opacity-40"></div>
        <div className="particle absolute left-[40%] top-[30%] h-3 w-3 rounded-full bg-purple-500 opacity-20"></div>
        <div className="particle absolute left-[50%] top-[90%] h-2 w-2 rounded-full bg-cyan-400 opacity-30"></div>
      </div>
      
      {/* Orbit animation */}
      <div 
        ref={orbitRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
      >
        <div className="orbit-particle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[400px] w-[400px] rounded-full border border-cyan-500/10">
            <div className="absolute h-3 w-3 rounded-full bg-cyan-500 shadow-glow-cyan top-0 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
        <div className="orbit-particle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[600px] w-[600px] rounded-full border border-blue-500/10">
            <div className="absolute h-4 w-4 rounded-full bg-blue-500 shadow-glow-blue top-1/2 right-0 -translate-y-1/2"></div>
          </div>
        </div>
        <div className="orbit-particle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45">
          <div className="relative h-[500px] w-[500px] rounded-full border border-indigo-500/10">
            <div className="absolute h-2 w-2 rounded-full bg-indigo-500 shadow-glow-indigo bottom-0 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </div>

      {/* Pulsing gradient circles */}
      <div className="absolute left-10 top-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-600/5 blur-3xl animate-pulse-slow"></div>
      <div className="absolute right-10 bottom-1/4 w-40 h-40 rounded-full bg-gradient-to-l from-purple-500/5 to-cyan-500/5 blur-3xl animate-pulse-slow-reverse"></div>
      <div className="absolute right-1/4 top-1/5 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5 blur-3xl animate-float"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Master Your Finances with
            <br />
            <span className="gradient-text text-5xl md:text-7xl mt-3 block animate-pulse-glow opacity-95">
              Investment Companion
            </span>
          </motion.h1>

          <motion.div
            className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-block">{displayedText}</span>
            <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-1 animate-pulse"></span>
          </motion.div>

          <motion.p 
            className="mt-4 text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Founded by Harsh Mendapara to make investing accessible to everyone.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="#courses" scroll={false} onClick={(e) => {
              e.preventDefault();
              document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>
              <motion.button 
                className="button-gradient py-4 px-8 rounded-md flex items-center justify-center space-x-2 text-white font-medium relative overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial="initial"
                variants={glowVariants}
              >
                <span className="relative z-10 text-lg font-semibold">View Courses</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 relative z-10" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </motion.svg>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/40 to-blue-500/40 animate-gradient"></div>
              </motion.button>
            </Link>
            
            <Link href="#ebook" scroll={false} onClick={(e) => {
              e.preventDefault();
              document.getElementById('ebook')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>
              <motion.button 
                className="border border-cyan-400 hover:bg-cyan-900/20 transition-all py-3 px-8 rounded-md flex items-center justify-center space-x-2 text-cyan-400 font-medium group"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get E-Book</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <path 
                    fillRule="evenodd" 
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </motion.svg>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div 
            className="mt-16 md:mt-20 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-300 max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={moveVariants}
          >
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Coming Soon</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="font-medium">Join Waitlist</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span className="font-medium">Expert-Created Courses</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Satisfaction Guarantee</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 
