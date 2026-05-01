'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseCard from './CourseCard';
import Link from 'next/link';

// Courses data that can be reused across components
export const courses = [
  {
    id: 1,
    title: 'Investment Fundamentals',
    description: 'Learn the basics of investing and build a strong foundation for your financial future.',
    icon: '/icons/investment.svg',
    rating: 4.9,
    price: 'Free',
    isPopular: true,
    categories: ['featured', 'investment']
  },
  {
    id: 2,
    title: 'Advanced Stock Trading',
    description: 'Master the art of stock trading with advanced strategies and techniques.',
    icon: '/icons/stock.svg',
    rating: 4.8,
    price: 'Free',
    categories: ['featured', 'stock']
  },
  {
    id: 3,
    title: 'Cryptocurrency Investing',
    description: 'Understand blockchain technology and make informed decisions in crypto markets.',
    icon: '/icons/crypto.svg',
    rating: 4.6,
    price: 'Free',
    categories: ['crypto']
  },
  {
    id: 4,
    title: 'Real Estate Investment',
    description: 'Discover strategies for building wealth through real estate investments.',
    icon: '/icons/investment.svg',
    rating: 4.7,
    price: 'Free',
    categories: ['real-estate', 'investment']
  },
  {
    id: 5,
    title: 'Financial Freedom Blueprint',
    description: 'Create a comprehensive plan to achieve financial independence and freedom.',
    icon: '/icons/stock.svg',
    rating: 4.9,
    price: 'Free',
    isPopular: true,
    categories: ['featured', 'financial']
  },
  {
    id: 6,
    title: 'Trading Psychology',
    description: 'Master your emotions and develop the mindset of successful traders.',
    icon: '/icons/crypto.svg',
    rating: 4.5,
    price: 'Free',
    categories: ['stock', 'trading']
  }
];

export const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'featured', name: 'Featured' },
  { id: 'investment', name: 'Investment' },
  { id: 'stock', name: 'Stock Trading' },
  { id: 'financial', name: 'Financial Freedom' },
  { id: 'crypto', name: 'Cryptocurrency' },
  { id: 'real-estate', name: 'Real Estate' }
];

interface CoursesListProps {
  showAll?: boolean;
  showBackButton?: boolean;
  showFilters?: boolean;
}

export default function CoursesList({ 
  showAll = true, 
  showBackButton = false, 
  showFilters = true 
}: CoursesListProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter courses based on active category
  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter(course => course.categories.includes(activeCategory));
  
  // For homepage, show only the first 3 courses
  const displayedCourses = showAll ? filteredCourses : filteredCourses.slice(0, 3);
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 md:mb-16">
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 md:mb-6 relative inline-block">
          <span className="gradient-text">Explore Our Courses</span>
          <div className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 w-full"></div>
        </h1>
        
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover expert-led courses designed to help you master investing, trading, and financial independence.
        </p>
      </div>

      {/* Category filter tabs - only show if showFilters is true */}
      {showFilters && (
        <div className="mb-12 overflow-x-auto pb-2 -mx-4 px-4 flex justify-start md:justify-center">
          <div className="flex gap-3 md:flex-wrap min-w-max md:min-w-0">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                  activeCategory === category.id 
                  ? 'glass-card bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'bg-gray-800/40 text-gray-300 hover:bg-gray-700/50 border border-transparent'
                }`}
                onClick={() => setActiveCategory(category.id)}
                aria-current={activeCategory === category.id ? 'page' : undefined}
              >
                {category.name}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {displayedCourses.length > 0 ? (
            displayedCourses.map((course, index) => (
              <CourseCard 
                key={course.id}
                title={course.title}
                description={course.description}
                icon={course.icon}
                rating={course.rating}
                price={course.price}
                isPopular={course.isPopular}
                delay={0.1 * (index % 3 + 1)} // Stagger animation by row
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-400 text-xl">No courses found in this category yet.</p>
              <button 
                className="mt-4 text-cyan-400 border border-cyan-400 px-4 py-2 rounded-md hover:bg-cyan-400/10 transition-colors"
                onClick={() => setActiveCategory('all')}
              >
                View all courses
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="text-center mt-16 md:mt-20">
        {!showAll && (
          <Link href="/courses">
            <motion.button 
              className="inline-flex items-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 px-7 py-4 rounded-lg group glass-hover"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-cyan-400 font-medium mr-2 text-lg">Explore Course Catalog</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-cyan-400" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </motion.svg>
            </motion.button>
          </Link>
        )}
        
        {showBackButton && (
          <Link href="/">
            <motion.button 
              className="inline-flex items-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 px-7 py-4 rounded-lg group glass-hover"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-cyan-400 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                animate={{ x: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </motion.svg>
              <span className="text-cyan-400 font-medium text-lg">Back to Home</span>
            </motion.button>
          </Link>
        )}
      </div>
    </div>
  );
} 