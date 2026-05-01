'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navbarVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 bg-black/95' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-2" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative h-10 w-10">
                <Image 
                  src="/logo.png" 
                  alt="Investment Companion Logo"
                  width={40}
                  height={40}
                  className="navbar-rotating-logo"
                  style={{ 
                    objectFit: 'contain',
                    backgroundColor: 'transparent',
                    mixBlendMode: 'screen',
                    opacity: 0.95
                  }}
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  <span className="gradient-text text-glow">Investment</span>
                </h1>
                <p className="text-white text-sm font-medium -mt-1">Companion</p>
              </div>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Courses', 'E-Book', 'About', 'Contact'].map((item, index) => (
              <motion.div
                key={item}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
              >
                <Link 
                  href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                  className={`navbar-link text-sm font-medium transition-colors duration-300 ${
                    activeLink === item.toLowerCase() 
                      ? 'text-cyan-400 active' 
                      : 'text-white hover:text-cyan-400'
                  }`}
                  onClick={() => setActiveLink(item.toLowerCase())}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <motion.button 
                className="text-cyan-400 border border-cyan-400 px-4 py-1 rounded-full text-sm hover:bg-cyan-400/10 transition-all"
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(0, 255, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Log In
              </motion.button>
            </Link>
            <Link href="/signup">
              <motion.button 
                className="button-gradient px-5 py-1 rounded-full text-sm text-white font-medium overflow-hidden liquid-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </Link>
          </div>

          <motion.button 
            className="md:hidden text-white p-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-cyan-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden fixed inset-0 top-[72px] z-40 p-4"
          >
            <div className="bg-black/95 rounded-xl h-full max-w-sm mx-auto overflow-hidden">
              <div className="p-6 flex flex-col h-full">
                <div className="flex-1 flex flex-col space-y-6 pt-5">
                  {['Home', 'Courses', 'E-Book', 'About', 'Contact'].map((item) => (
                    <motion.div key={item} variants={menuItemVariants}>
                      <Link 
                        href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                        className={`block text-xl font-medium py-2 border-b border-gray-700 ${
                          activeLink === item.toLowerCase() 
                            ? 'text-cyan-400' 
                            : 'text-white hover:text-cyan-400'
                        }`}
                        onClick={() => {
                          setActiveLink(item.toLowerCase());
                          setMobileMenuOpen(false);
                        }}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6 space-y-4">
                  <motion.button 
                    className="w-full text-center text-cyan-400 border border-cyan-400 py-3 rounded-md hover:bg-cyan-400/10"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </motion.button>
                  <motion.button 
                    className="w-full text-center py-3 rounded-md button-gradient"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 
