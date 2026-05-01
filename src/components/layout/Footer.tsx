'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FormEvent, useState, useRef } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setIsValid(false);
      emailRef.current?.focus();
      return;
    }
    
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }
    
    // Add newsletter subscription logic here
    setIsSubscribed(true);
    setEmail('');
    setIsValid(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value === '') {
      setIsValid(true);
    } else {
      setIsValid(validateEmail(e.target.value));
    }
  };
  
  // Simplified footer links
  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Courses', href: '/courses' },
        { name: 'E-Book', href: '/#ebook' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
      ]
    }
  ];
  
  // Just keep Instagram and maybe one or two other relevant platforms
  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.76 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ), 
      href: '#' 
    },
    { 
      name: 'Twitter', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ), 
      href: '#' 
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-[#051622] to-black py-16 relative overflow-hidden border-t border-cyan-900/30">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-800/30 to-transparent"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ 
            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Glow spots */}
        <div className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-cyan-900/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 w-72 h-72 rounded-full bg-blue-900/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Logo and company info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block">
              <div className="flex items-center space-x-3 hover:scale-105 transition duration-300">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/20" style={{ transformStyle: 'preserve-3d' }}>
                  <Image 
                    src="/logo.png" 
                    alt="Investment Companion Logo"
                    width={64}
                    height={64}
                    className="object-contain"
                    style={{ 
                      position: 'absolute',
                      inset: 0,
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="gradient-text">Investment</span>
                  </h1>
                  <p className="text-white text-base font-medium -mt-1">Companion</p>
                </div>
              </div>
            </Link>
            
            <div className="text-gray-400 text-sm max-w-xs">
              Expert financial guidance to help you make smarter investment decisions and achieve financial freedom.
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-sm">
                Founded by <span className="text-cyan-400 font-medium">Harsh Mendapara</span>, making investing knowledge accessible to everyone.
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.name}
                  className="w-10 h-10 rounded-full bg-[#081e28] flex items-center justify-center text-cyan-400 hover:bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white transition-colors border border-cyan-500/20"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 8px rgba(0, 255, 255, 0.5)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter subscription and quick links */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div>
              <h3 className="text-white font-medium mb-3 relative inline-block">
                Subscribe to Updates
                <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Stay updated with financial insights and new content.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="Your email address"
                    className={`w-full bg-[#081e28] border ${
                      !isValid ? 'border-red-500' : isFocused ? 'border-cyan-500' : 'border-gray-700'
                    } rounded-md px-4 py-2 text-white text-sm focus:outline-none transition-all duration-300`}
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required
                  />
                  <AnimatePresence>
                    {!isValid && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 absolute"
                      >
                        Please enter a valid email address
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex justify-center">
                  <motion.button
                    type="submit"
                    className="w-auto px-6 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubscribed}
                  >
                    <AnimatePresence mode="wait">
                      {isSubscribed ? (
                        <motion.div
                          key="subscribed"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center justify-center relative z-10"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Subscribed!
                        </motion.div>
                      ) : (
                        <motion.div
                          key="subscribe"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="relative z-10"
                        >
                          Subscribe
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Button background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 animate-gradient"></div>
                  </motion.button>
                </div>
              </form>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-medium mb-4 relative inline-block">
                Quick Links
                <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              </h3>
              <div className="flex flex-col gap-3">
                {footerLinks[0].links.map((link, linkIndex) => (
                  <motion.div 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * (linkIndex + 1), duration: 0.3 }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm group inline-flex items-center"
                    >
                      <span className="relative mr-2 text-cyan-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-14 pt-6 border-t border-gray-800/50 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Investment Companion. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 