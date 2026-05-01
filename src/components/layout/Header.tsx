'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMobileMenuItem, setActiveMobileMenuItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveMobileMenuItem(null);
  }, [pathname]);

  const navItems = [
    { title: 'Home', path: '/' },
    { 
      title: 'Courses', 
      path: '/courses',
      submenu: [
        { name: 'All Courses', path: '/courses' },
        { name: 'Investment Fundamentals', path: '/courses/investment-fundamentals' },
        { name: 'Advanced Stock Trading', path: '/courses/advanced-stock-trading' },
        { name: 'Financial Independence', path: '/courses/financial-independence' }
      ]
    },
    { title: 'E-Book', path: '/#ebook' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
  ];

  const toggleMobileSubmenu = (title: string) => {
    if (activeMobileMenuItem === title) {
      setActiveMobileMenuItem(null);
    } else {
      setActiveMobileMenuItem(title);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-gradient-to-b from-[#051622]/95 to-black/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      {/* Decorative top border */}
      {isScrolled && (
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" aria-label="Investment Companion Home">
              <div className="flex items-center space-x-3 group">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/logo.png"
                    alt="Investment Companion Logo"
                    width={56}
                    height={56}
                    className="object-contain"
                    style={{ 
                      position: 'absolute',
                      inset: 0
                    }}
                    priority
                  />
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h1 className="text-xl font-bold">
                    <span className="gradient-text">Investment</span>
                  </h1>
                  <p className="text-white text-base font-medium -mt-1">Companion</p>
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden lg:flex items-center space-x-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {navItems.map((item) => (
              <div key={item.title} className="relative group">
                <Link 
                  href={item.path}
                  className={`px-4 py-2.5 text-base font-medium transition-all duration-300 rounded-lg hover:bg-white/5 relative nav-item group ${pathname === item.path ? 'text-cyan-400 active' : 'text-gray-200'}`}
                  aria-current={pathname === item.path ? 'page' : undefined}
                >
                  <span className="relative">
                    {item.title}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  {/* Active indicator - using motion for smooth transitions */}
                  {pathname === item.path && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-1 w-64 bg-gradient-to-b from-[#081e28] to-[#051622] rounded-xl overflow-hidden shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 border border-cyan-800/30">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                    <div className="py-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.path}
                          className={`block px-5 py-3 text-sm hover:bg-cyan-900/30 hover:text-cyan-300 transition-all duration-200 ${pathname === subItem.path ? 'text-cyan-400 bg-cyan-900/20' : 'text-gray-300'}`}
                        >
                          <motion.div 
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {subItem.name}
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.nav>

          {/* CTA Button */}
          <motion.div 
            className="hidden lg:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/login">
              <motion.button 
                className="border border-cyan-400 hover:bg-cyan-900/20 transition-all py-2 px-5 rounded-md flex items-center justify-center space-x-2 text-cyan-400 font-medium group"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                aria-label="Log in to your account"
              >
                <span className="text-sm">Log In</span>
              </motion.button>
            </Link>
            
            <Link href="/signup">
              <motion.button 
                className="py-2 px-5 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Sign up for Investment Companion"
              >
                <span className="relative z-10 flex items-center">
                  <span>Sign Up</span>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
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
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 animate-gradient"></div>
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 rounded-md"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-5 flex flex-col justify-between relative">
                <span className={`w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transform transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - with improved animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-gradient-to-b from-[#051622] to-[#030d13] border-b border-cyan-900/30"
          >
            <div className="container mx-auto px-4 py-5">
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.div 
                    key={item.title} 
                    className="border-b border-cyan-900/20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div 
                      className={`flex items-center justify-between py-4 ${item.submenu ? 'cursor-pointer' : ''}`}
                      onClick={() => item.submenu ? toggleMobileSubmenu(item.title) : null}
                    >
                      <Link 
                        href={item.path}
                        className={`text-base font-medium group inline-flex items-center ${pathname === item.path ? 'text-cyan-400' : 'text-gray-300'}`}
                        onClick={(e) => item.submenu && e.preventDefault()}
                      >
                        {!item.submenu && (
                          <span className="relative mr-2 text-cyan-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                        <span className="relative">
                          {item.title}
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                      {item.submenu && (
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${activeMobileMenuItem === item.title ? 'rotate-180 text-cyan-400' : ''}`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                          animate={{ y: activeMobileMenuItem === item.title ? 0 : [0, 2, 0] }}
                          transition={{ repeat: activeMobileMenuItem === item.title ? 0 : Infinity, duration: 1.5 }}
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </motion.svg>
                      )}
                    </div>
                    
                    {/* Mobile Submenu with enhanced animations */}
                    {item.submenu && (
                      <AnimatePresence>
                        {activeMobileMenuItem === item.title && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-4 pb-3"
                          >
                            {item.submenu.map((subItem, subIndex) => (
                              <motion.div
                                key={subIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05 }}
                              >
                                <Link
                                  href={subItem.path}
                                  className={`block py-2.5 text-sm ${pathname === subItem.path ? 'text-cyan-400' : 'text-gray-400'} hover:text-cyan-300 transition-colors duration-300`}
                                >
                                  {subItem.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
