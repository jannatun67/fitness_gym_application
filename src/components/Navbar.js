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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-stretch"
        style={{ height: '64px' }}
      >
        {/* Left logo blob — green pill */}
        <div className="flex items-center justify-center bg-[#6BBF1F] px-5 md:px-8 rounded-br-[2rem] shrink-0">
          <Link href="/" className="flex items-center justify-center">
            {/* Four-quadrant logo icon */}
            <div className="grid grid-cols-2 gap-0.5 w-8 h-8">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    i === 0 ? 'bg-white' : 'bg-white/70'
                  } flex items-center justify-center`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6BBF1F]" />
                </div>
              ))}
            </div>
          </Link>
        </div>

        {/* Center nav pill */}
        <div className="flex-1 flex items-center px-3 md:px-6">
          <div
            className={`flex items-center w-full max-w-xl mx-auto bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-4 md:px-6 py-2 gap-4 md:gap-6 transition-all duration-300 ${
              isScrolled ? 'shadow-2xl' : ''
            }`}
          >
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6 flex-1">
              {['Home', 'Our gym location'].map((link) => (
                <Link
                  key={link}
                  href={`/#${link.toLowerCase().replace(/ /g, '-')}`}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {link}
                </Link>
              ))}

              {/* Divider */}
              <div className="w-px h-4 bg-white/20 hidden md:block" />

              {/* Search */}
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent text-white/70 placeholder:text-white/40 text-sm outline-none flex-1 min-w-0"
                />
                <button className="text-white/50 hover:text-white transition-colors">
                  <i className="fas fa-search text-sm"></i>
                </button>
              </div>
            </div>

            {/* Mobile: just search icon */}
            <div className="flex md:hidden items-center gap-3 flex-1">
              <Link href="/#home" className="text-white/80 text-sm">
                Home
              </Link>
              <div className="w-px h-4 bg-white/20" />
              <button className="text-white/50 ml-auto">
                <i className="fas fa-search text-sm"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Right — Register button */}
        <div className="flex items-center shrink-0 pr-2 md:pr-4">
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <button className="bg-[#6BBF1F] hover:bg-[#5aaa10] text-white font-bold text-sm uppercase tracking-widest px-5 py-3 rounded-full transition-all duration-200">
                  Profile
                </button>
              </Link>
              <button
                onClick={logout}
                className="border border-white/20 text-white/70 hover:text-white font-semibold text-sm px-4 py-3 rounded-full transition-all duration-200"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : (
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#6BBF1F] hover:bg-[#5aaa10] text-white font-black text-sm uppercase tracking-widest px-6 md:px-8 py-3 rounded-full transition-all duration-200 shadow-lg shadow-[#6BBF1F]/30"
              >
                Register
              </motion.button>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-3 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i
              className={`fas ${
                isMobileMenuOpen ? 'fa-times' : 'fa-bars'
              } text-xl`}
            ></i>
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-16 left-3 right-3 bg-black/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 z-40 md:hidden shadow-2xl"
        >
          <div className="flex flex-col gap-4">
            {[
              'Home',
              'Our gym location',
              'Products',
              'Training',
              'Testimonials',
            ].map((link) => (
              <Link
                key={link}
                href={`/#${link.toLowerCase().replace(/ /g, '-')}`}
                className="text-white/70 hover:text-white transition-colors py-1 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </Link>
            ))}
            <hr className="border-white/10" />
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/30 outline-none flex-1"
              />
              <button className="text-white/50 hover:text-white">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}