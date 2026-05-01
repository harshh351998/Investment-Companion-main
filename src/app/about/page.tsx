'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <section className="container mx-auto px-4 py-12">
          {/* Simple Intro Text */}
          <motion.p 
            className="text-white text-lg text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Empowering individuals to achieve financial freedom through expert guidance and practical education.
          </motion.p>

          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-white text-lg mb-4 leading-relaxed">
                At Investment Companion, we believe that financial education should be accessible to everyone. 
                Our mission is to demystify the world of investing and provide practical, actionable guidance that 
                helps individuals build wealth and achieve financial independence.
              </p>
              <p className="text-white text-lg leading-relaxed">
                We&apos;re committed to making complex financial concepts simple, understandable, and applicable to 
                your everyday life.
              </p>
            </motion.div>
            
            {/* Financial Growth Card */}
            <motion.div
              className="relative h-80 rounded-lg overflow-hidden glass-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-[#051622] flex items-center justify-center p-8">
                <div className="text-center w-full">
                  {/* Graph Icon - Grid with rising line chart */}
                  <div className="mb-6 relative h-40 w-full flex items-center justify-center">
                    {/* Grid background */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 160">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                    {/* Rising line chart */}
                    <svg className="relative w-full h-full" viewBox="0 0 200 160" preserveAspectRatio="none">
                      <polyline
                        points="20,120 50,100 80,80 110,60 140,40 170,20"
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#0080FF" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <p className="gradient-text text-xl font-semibold">Financial Growth</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Founder Section - Simplified */}
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Founded by <span className="gradient-text">Harsh Mendapara</span>
            </h2>
            <p className="text-white text-lg leading-relaxed">
              A passionate advocate for financial literacy, dedicated to making investing knowledge accessible to everyone.
            </p>
          </motion.div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
