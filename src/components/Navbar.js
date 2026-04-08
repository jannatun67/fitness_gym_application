'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Products', 'Training', 'Testimonials'];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? 'w-[95%] md:w-[90%]' : 'w-[95%] md:w-[85%]'
        }`}
      >
        <div className="bg-card/95 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl border border-gray-800">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <i className="fas fa-dumbbell text-primary text-2xl"></i>
              <span className="font-bold text-xl">POWER</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={`/#${link.toLowerCase()}`}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block text-gray-300 hover:text-primary">
                <i className="fas fa-search text-xl"></i>
              </button>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link href="/profile">
                    <button className="btn-primary !py-2">
                      <i className="fas fa-user mr-2"></i>
                      Profile
                    </button>
                  </Link>
                  <button onClick={logout} className="btn-secondary !py-2">
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <button className="btn-primary !py-2">
                    <i className="fas fa-user-plus mr-2"></i>
                    Register
                  </button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 left-4 right-4 bg-card rounded-2xl p-6 z-40 md:hidden shadow-2xl"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={`/#${link.toLowerCase()}`}
                className="text-gray-300 hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </Link>
            ))}
            <hr className="border-gray-700" />
            <button className="text-gray-300 hover:text-primary py-2 text-left">
              <i className="fas fa-search mr-2"></i>
              Search
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}