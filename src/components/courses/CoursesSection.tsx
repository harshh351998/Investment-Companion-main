'use client';

import { useRef, useEffect } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import CoursesList from './CoursesList';
import gsap from 'gsap';

const CoursesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  // Background shape animation
  const bgShapesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (bgShapesRef.current) {
      const shapes = gsap.utils.toArray<HTMLElement>('.bg-shape');
      
      shapes.forEach((shape) => {
        gsap.to(shape, {
          y: gsap.utils.random(-20, 20),
          x: gsap.utils.random(-20, 20),
          rotate: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(15, 30),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, []);
  
  // Animate section when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-24 relative overflow-hidden"
      id="courses"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black bg-opacity-90 z-0"></div>
      <div 
        ref={bgShapesRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <div className="bg-shape absolute left-10 top-20 w-64 h-64 rounded-full bg-cyan-900/5 blur-3xl"></div>
        <div className="bg-shape absolute right-20 bottom-40 w-80 h-80 rounded-full bg-blue-900/5 blur-3xl"></div>
        <div className="bg-shape absolute right-1/4 top-1/4 w-40 h-40 rounded-full bg-indigo-900/10 blur-3xl"></div>
        
        {/* Decorative grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <CoursesList showAll={false} showBackButton={false} showFilters={false} />
      </div>
    </section>
  );
};

export default CoursesSection; 