'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';

interface CourseCardProps {
  title: string;
  description: string;
  icon: string;
  rating: number;
  price: string;
  isPopular?: boolean;
  delay?: number;
}

const CourseCard = ({ 
  title, 
  description, 
  icon, 
  rating, 
  price,
  isPopular = false,
  delay = 0
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 12,
        delay 
      }
    }
  };
  
  const iconVariants = {
    initial: { 
      scale: 1
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.3, yoyo: Infinity, ease: "easeInOut" }
    }
  };
  
  const ratingStarVariants = {
    initial: { scale: 1 },
    hover: (i: number) => ({
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5,
        delay: i * 0.05,
        ease: "easeInOut"
      }
    })
  };
  
  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      className="group h-full rounded-xl overflow-hidden border border-gray-800 bg-[#001019] hover:border-cyan-500/30 transition-all duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with gradient */}
      <div className="relative h-36 w-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
        {isPopular && (
          <motion.div 
            className="absolute top-4 right-4 z-20 bg-orange-500 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: delay + 0.3, duration: 0.5, type: 'spring' }}
          >
            Popular
          </motion.div>
        )}
        
        <motion.div
          className="relative w-20 h-20 bg-[#061527] rounded-full flex items-center justify-center shadow-lg"
          variants={iconVariants}
        >
          <Image 
            src={icon} 
            alt={title} 
            width={40} 
            height={40} 
            className="text-cyan-400"
          />
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow min-h-[16rem]">
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 text-sm mb-6 line-clamp-3">{description}</p>
        
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <motion.span 
              className="text-green-400 font-semibold text-lg"
              whileHover={{ scale: 1.1 }}
            >
              {price}
            </motion.span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <motion.svg 
                  key={i}
                  custom={i}
                  variants={ratingStarVariants}
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
              <span className="text-gray-400 text-xs ml-1 font-medium">{rating}/5</span>
            </div>
          </div>
          
          <motion.button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center space-x-2 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-md"
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Enroll Now</span>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              animate={{ x: isHovered ? [0, 5, 0] : 0 }}
              transition={{ repeat: isHovered ? Infinity : 0, duration: 1 }}
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </motion.svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard; 