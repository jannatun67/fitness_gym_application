'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              POWER YOUR
              <span className="text-primary"> POTENTIAL</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg mb-8"
            >
              Transform your body and mind with our expert trainers and state-of-the-art facilities. 
              Join the community thats committed to excellence.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex space-x-4"
            >
              <button className="btn-primary">
                Shop Now <i className="fas fa-arrow-right ml-2"></i>
              </button>
              <button className="btn-secondary">
                Watch Video <i className="fas fa-play ml-2"></i>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-800"
            >
              {[
                { value: '10K+', label: 'Active Members' },
                { value: '50+', label: 'Expert Trainers' },
                { value: '100+', label: 'Classes Weekly' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <Image
                src="/public/man.png"
                alt="Athlete"
                className="rounded-2xl shadow-2xl"
                width={400}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-10 -right-10 bg-card rounded-full p-4 shadow-xl"
            >
              <i className="fas fa-heartbeat text-primary text-3xl"></i>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-card rounded-full p-4 shadow-xl"
            >
              <i className="fas fa-medal text-primary text-3xl"></i>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}