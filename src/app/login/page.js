'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await login({
      email: data.email,
      password: data.password,
      remember_me: data.remember_me ? 'true' : 'false',
    });
    if (result?.success) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 py-12 relative">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-card relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-dumbbell text-dark-900" />
            </div>
            <span className="text-white font-bold text-xl">FitPower</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-1">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          Sign in to your account to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email',
                  },
                })}
                className="input-field !pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                className="input-field !pl-10 !pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('remember_me')}
                className="w-4 h-4 rounded border-dark-400 bg-dark-700 text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer accent-[#4ADE80]"
              />
              <span className="text-sm text-gray-400">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-accent hover:text-accent-light transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full !py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" className="!w-4 !h-4 !border-2" />
                Signing in...
              </>
            ) : (
              <>
                <i className="fa-solid fa-right-to-bracket" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-dark-400" />
          <span className="text-gray-500 text-xs">OR</span>
          <div className="flex-1 h-px bg-dark-400" />
        </div>

        {/* Social Login */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-dark-700 border border-dark-400 rounded-xl py-3 text-sm text-gray-300 hover:border-white/20 hover:text-white transition-all duration-300">
            <i className="fa-brands fa-google text-sm" />
            Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-dark-700 border border-dark-400 rounded-xl py-3 text-sm text-gray-300 hover:border-white/20 hover:text-white transition-all duration-300">
            <i className="fa-brands fa-apple text-sm" />
            Apple
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-accent hover:text-accent-light font-medium transition-colors"
          >
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}