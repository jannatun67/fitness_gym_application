'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    const result = await registerUser({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      terms: 'true',
    });
    if (result?.success) {
      router.push(`/verify-otp?email=${encodeURIComponent(result.email)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d1117] to-[#0a0a0a] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff00ff]/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00ff88]/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -30, 30, -30],
            x: [null, 20, -20, 20],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Glass morphism card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Animated gradient border */}
          <motion.div 
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00ff88]/30 via-[#00d4ff]/30 to-[#ff00ff]/30"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          
          <div className="relative p-8">
            {/* Logo Section with 3D effect */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-300" />
                <Link href="/" className="relative flex items-center gap-3 bg-gradient-to-br from-gray-900 to-black rounded-full px-8 py-4 shadow-2xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                    <i className="fa-solid fa-dumbbell text-black text-xl" />
                  </div>
                  <span className="text-white font-bold text-2xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    FitPower
                  </span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent mb-3">
                Join the Movement
              </h1>
              <p className="text-gray-400 text-sm">
                Start your fitness journey with us today
              </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'first_name' ? 'scale-105' : ''}`}>
                    <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff88] text-sm" />
                    <input
                      type="text"
                      placeholder="John"
                      onFocus={() => setFocusedField('first_name')}
                      onBlur={() => setFocusedField(null)}
                      {...register('first_name', {
                        required: 'First name is required',
                        minLength: {
                          value: 2,
                          message: 'Min 2 characters',
                        },
                      })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00ff88]/50 focus:ring-2 focus:ring-[#00ff88]/20 transition-all duration-300"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.first_name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-xs mt-1"
                      >
                        {errors.first_name.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'last_name' ? 'scale-105' : ''}`}>
                    <i className="fa-solid fa-user-check absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff88] text-sm" />
                    <input
                      type="text"
                      placeholder="Doe"
                      onFocus={() => setFocusedField('last_name')}
                      onBlur={() => setFocusedField(null)}
                      {...register('last_name', {
                        required: 'Last name is required',
                      })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00ff88]/50 focus:ring-2 focus:ring-[#00ff88]/20 transition-all duration-300"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.last_name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-xs mt-1"
                      >
                        {errors.last_name.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Email */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-105' : ''}`}>
                  <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff88] text-sm" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email',
                      },
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00ff88]/50 focus:ring-2 focus:ring-[#00ff88]/20 transition-all duration-300"
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-105' : ''}`}>
                  <i className="fa-solid fa-key absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff88] text-sm" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Min 8 characters',
                      },
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-11 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00ff88]/50 focus:ring-2 focus:ring-[#00ff88]/20 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00ff88] transition-all duration-300"
                  >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Confirm Password */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'confirm' ? 'scale-105' : ''}`}>
                  <i className="fa-solid fa-shield-haltered absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff88] text-sm" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    onFocus={() => setFocusedField('confirm')}
                    onBlur={() => setFocusedField(null)}
                    {...register('password_confirmation', {
                      required: 'Confirm your password',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-11 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00ff88]/50 focus:ring-2 focus:ring-[#00ff88]/20 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00ff88] transition-all duration-300"
                  >
                    <i className={`fa-solid ${showConfirm ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password_confirmation && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.password_confirmation.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Terms */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register('terms', {
                      required: 'You must accept the terms',
                    })}
                    className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-[#00ff88] focus:ring-[#00ff88] focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    I agree to the{' '}
                    <a href="#" className="text-[#00ff88] hover:text-[#00d4ff] transition-colors font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-[#00ff88] hover:text-[#00d4ff] transition-colors font-medium">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                <AnimatePresence>
                  {errors.terms && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.terms.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full group overflow-hidden rounded-xl py-4 text-sm font-semibold"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-3 text-black font-bold">
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" className="!w-4 !h-4 !border-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-user-plus text-base" />
                        Start Your Journey
                      </>
                    )}
                  </span>
                </button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-4 my-8"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-gray-500 text-xs">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>

            {/* Social Signup */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-3"
            >
              {[
                { icon: "fa-google", name: "Google", color: "hover:border-[#ea4335]/50" },
                { icon: "fa-apple", name: "Apple", color: "hover:border-white/30" },
                { icon: "fa-github", name: "GitHub", color: "hover:border-[#ffffff]/50" }
              ].map((social, index) => (
                <motion.button
                  key={social.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 text-sm text-gray-300 hover:bg-white/10 ${social.color} transition-all duration-300`}
                >
                  <i className={`fa-brands ${social.icon} text-base`} />
                  <span>{social.name}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Login Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-center text-sm text-gray-400 mt-8"
            >
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#00ff88] hover:text-[#00d4ff] font-semibold transition-all duration-300 hover:underline inline-flex items-center gap-1"
              >
                Sign In
                <i className="fa-solid fa-arrow-right text-xs" />
              </Link>
            </motion.p>
          </div>
        </motion.div>

        {/* Decorative corner elements */}
        <div className="absolute -top-5 -left-5 w-16 h-16 border-t-2 border-l-2 border-[#00ff88]/30 rounded-tl-2xl" />
        <div className="absolute -bottom-5 -right-5 w-16 h-16 border-b-2 border-r-2 border-[#00d4ff]/30 rounded-br-2xl" />
      </motion.div>
    </div>
  );
}