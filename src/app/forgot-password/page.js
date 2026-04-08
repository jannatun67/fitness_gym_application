'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

const STEPS = {
  EMAIL: 1,
  OTP: 2,
  RESET: 3,
};

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword, forgotVerifyOtp, resetPassword, loading } = useAuth();

  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const emailForm = useForm();
  const otpForm = useForm();
  const resetForm = useForm({});

  // Step 1: Submit Email
  const onEmailSubmit = async (data) => {
    setEmail(data.email);
    const result = await forgotPassword(data.email);
    if (result?.success) {
      setStep(STEPS.OTP);
    }
  };

  // Step 2: Verify OTP
  const onOtpSubmit = async (data) => {
    const result = await forgotVerifyOtp({ email, otp: data.otp });
    if (result?.success && result.token) {
      setResetToken(result.token);
      setStep(STEPS.RESET);
    }
  };

  // Step 3: Reset Password
  const onResetSubmit = async (data) => {
    const result = await resetPassword({
      password: data.password,
      password_confirmation: data.password_confirmation,
      token: resetToken,
    });
    if (result?.success) {
      router.push('/login');
    }
  };

  const stepTitles = {
    [STEPS.EMAIL]: 'Forgot Password',
    [STEPS.OTP]: 'Verify OTP',
    [STEPS.RESET]: 'Reset Password',
  };

  const stepDescriptions = {
    [STEPS.EMAIL]: 'Enter your email to receive a verification code',
    [STEPS.OTP]: `Enter the code sent to ${email}`,
    [STEPS.RESET]: 'Enter your new password',
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-card relative z-10"
      >
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  s < step
                    ? 'bg-accent text-dark-900'
                    : s === step
                    ? 'bg-accent text-dark-900'
                    : 'bg-dark-400 text-gray-500'
                }`}
              >
                {s < step ? (
                  <i className="fa-solid fa-check text-xs" />
                ) : (
                  s
                )}
              </div>
              {s < 3 && (
                <div
                  className={`w-10 h-0.5 rounded transition-all duration-300 ${
                    s < step ? 'bg-accent' : 'bg-dark-400'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
            <i
              className={`fa-solid ${
                step === STEPS.EMAIL
                  ? 'fa-envelope'
                  : step === STEPS.OTP
                  ? 'fa-shield-halved'
                  : 'fa-key'
              } text-accent text-xl`}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-1">
          {stepTitles[step]}
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          {stepDescriptions[step]}
        </p>

        <AnimatePresence mode="wait">
          {/* Step 1: Email */}
          {step === STEPS.EMAIL && (
            <motion.form
              key="email"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...emailForm.register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email',
                      },
                    })}
                    className="input-field !pl-10"
                  />
                </div>
                {emailForm.formState.errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="!w-4 !h-4 !border-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane" />
                    Send Reset Code
                  </>
                )}
              </button>
            </motion.form>
          )}

          {/* Step 2: OTP */}
          {step === STEPS.OTP && (
            <motion.form
              key="otp"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Verification Code
                </label>
                <div className="relative">
                  <i className="fa-solid fa-hashtag absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    {...otpForm.register('otp', {
                      required: 'OTP is required',
                      pattern: {
                        value: /^\d{6}$/,
                        message: 'Enter a valid 6-digit code',
                      },
                    })}
                    className="input-field !pl-10 text-center text-lg tracking-[0.3em] font-mono"
                  />
                </div>
                {otpForm.formState.errors.otp && (
                  <p className="text-red-400 text-xs mt-1">
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
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
                    Verify Code
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={async () => {
                  const result = await forgotPassword(email);
                  if (result?.success) {
                    otpForm.reset();
                  }
                }}
                disabled={loading}
                className="w-full text-sm text-gray-400 hover:text-accent transition-colors py-2 disabled:opacity-50"
              >
                <i className="fa-solid fa-rotate-right mr-1.5 text-xs" />
                Resend Code
              </button>
            </motion.form>
          )}

          {/* Step 3: Reset Password */}
          {step === STEPS.RESET && (
            <motion.form
              key="reset"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              onSubmit={resetForm.handleSubmit(onResetSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...resetForm.register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Min 8 characters',
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
                {resetForm.formState.errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {resetForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...resetForm.register('password_confirmation', {
                      required: 'Confirm your password',
                      validate: (value) =>
                        value === resetForm.watch('password') ||
                        'Passwords do not match',
                    })}
                    className="input-field !pl-10 !pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <i className={`fa-solid ${showConfirm ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
                  </button>
                </div>
                {resetForm.formState.errors.password_confirmation && (
                  <p className="text-red-400 text-xs mt-1">
                    {resetForm.formState.errors.password_confirmation.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="!w-4 !h-4 !border-2" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-rotate" />
                    Reset Password
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Back to Login */}
        <div className="text-center mt-6">
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