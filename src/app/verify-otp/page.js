'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Suspense } from 'react';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const { verifyOtp, resendOtp, loading } = useAuth();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const otpValue = otp.join('');

  const handleVerify = async () => {
    if (otpValue.length !== 6) return;
    const result = await verifyOtp({ email, otp: otpValue });
    if (result?.success) {
      router.push('/login');
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    const result = await resendOtp(email);
    if (result?.success) {
      setResendTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-card relative z-10"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
            <i className="fa-solid fa-shield-halved text-accent text-2xl" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-1">
          Verify Your Email
        </h1>
        <p className="text-gray-400 text-sm text-center mb-2">
          We sent a verification code to
        </p>
        <p className="text-accent text-sm text-center font-medium mb-8">
          {email || 'your email'}
        </p>

        {/* OTP Inputs */}
        <div className="flex items-center justify-center gap-2.5 mb-8" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 bg-dark-700 border-2 border-dark-400 rounded-xl text-center text-white text-xl font-bold focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading || otpValue.length !== 6}
          className="btn-primary w-full !py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" className="!w-4 !h-4 !border-2" />
              Verifying...
            </>
          ) : (
            <>
              <i className="fa-solid fa-check-circle" />
              Verify OTP
            </>
          )}
        </button>

        {/* Resend */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Didn&apos;t receive the code?{' '}
            {resendTimer > 0 ? (
              <span className="text-gray-500">
                Resend in{' '}
                <span className="text-accent font-medium">{resendTimer}s</span>
              </span>
            ) : (
              <button
                onClick={handleResend}
                className="text-accent hover:text-accent-light font-medium transition-colors"
              >
                Resend OTP
              </button>
            )}
          </p>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-4">
          <Link
            href="/login"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark-900 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}