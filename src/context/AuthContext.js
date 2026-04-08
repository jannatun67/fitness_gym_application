'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await api.get('/user-detail');
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
      }
    }
    setLoading(false);
  };

  const login = async (emailOrData, password, remember) => {
    try {
      let emailValue = emailOrData;
      let passwordValue = password;
      let rememberValue = remember;

      if (typeof emailOrData === 'object' && emailOrData !== null) {
        emailValue = emailOrData.email;
        passwordValue = emailOrData.password;
        rememberValue = emailOrData.remember ?? emailOrData.remember_me;
      }

      const formData = new FormData();
      formData.append('email', emailValue);
      formData.append('password', passwordValue);

      const response = await api.post('/login', formData);
      const { token } = response.data;

      if (rememberValue === true || rememberValue === 'true') {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const userResponse = await api.get('/user-detail');
      setUser(userResponse.data);
      toast.success('Login successful!');
      return { success: true, ...response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const data = typeof userData === 'object' && userData !== null ? userData : {};
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const response = await api.post('/register', formData);
      toast.success('Registration successful! Please verify OTP');
      return { success: true, email: data.email, ...response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const verifyOTP = async (emailOrData, otp) => {
    try {
      let emailValue = emailOrData;
      let otpValue = otp;

      if (typeof emailOrData === 'object' && emailOrData !== null) {
        emailValue = emailOrData.email;
        otpValue = emailOrData.otp;
      }

      const formData = new FormData();
      formData.append('email', emailValue);
      formData.append('otp', otpValue);

      const response = await api.post('/verify_otp', formData);
      toast.success('Email verified! Please login');
      return { success: true, ...response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
      return { success: false, message: error.response?.data?.message || 'Verification failed' };
    }
  };

  const resendOTP = async (emailOrData) => {
    try {
      let emailValue = emailOrData;
      if (typeof emailOrData === 'object' && emailOrData !== null) {
        emailValue = emailOrData.email;
      }

      const formData = new FormData();
      formData.append('email', emailValue);

      const response = await api.post('/resend_otp', formData);
      toast.success('OTP resent successfully');
      return { success: true, ...response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
      return { success: false, message: error.response?.data?.message || 'Failed to resend OTP' };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const emailValue = typeof email === 'object' && email !== null ? email.email : email;
      const formData = new FormData();
      formData.append('email', emailValue);

      const response = await api.post('/forgot-password', formData);
      toast.success('OTP sent to your email');
      return { success: true, ...response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
      return { success: false, message: error.response?.data?.message || 'Failed to send OTP' };
    }
  };

  const verifyForgotOTP = async (emailOrData, otp) => {
    try {
      let emailValue = emailOrData;
      let otpValue = otp;

      if (typeof emailOrData === 'object' && emailOrData !== null) {
        emailValue = emailOrData.email;
        otpValue = emailOrData.otp;
      }

      const formData = new FormData();
      formData.append('email', emailValue);
      formData.append('otp', otpValue);

      const response = await api.post('/forgot-verify-otp', formData);
      toast.success('OTP verified');
      return { success: true, ...response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
      return { success: false, message: error.response?.data?.message || 'Invalid OTP' };
    }
  };

  const resetPassword = async (emailOrData, password, passwordConfirmation) => {
    try {
      let emailValue = emailOrData;
      let passwordValue = password;
      let passwordConfirmationValue = passwordConfirmation;
      let tokenValue;

      if (typeof emailOrData === 'object' && emailOrData !== null) {
        emailValue = emailOrData.email;
        passwordValue = emailOrData.password;
        passwordConfirmationValue = emailOrData.password_confirmation ?? emailOrData.passwordConfirmation;
        tokenValue = emailOrData.token;
      }

      const formData = new FormData();
      if (emailValue) formData.append('email', emailValue);
      if (tokenValue) formData.append('token', tokenValue);
      formData.append('password', passwordValue);
      formData.append('password_confirmation', passwordConfirmationValue);

      const response = await api.post('/reset-password', formData);
      toast.success('Password reset successful! Please login');
      return { success: true, ...response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
      return { success: false, message: error.response?.data?.message || 'Failed to reset password' };
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      verifyOTP,
      resendOTP,
      forgotPassword,
      verifyForgotOTP,
      resetPassword,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}