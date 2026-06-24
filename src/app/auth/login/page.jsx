'use client';

import React, { useState } from 'react';
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Alert,
} from '@heroui/react';

import { Check, Envelope, Key, Eye, EyeSlash } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import { FcGoogle } from 'react-icons/fc';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';



const LoginPage = () => {
  // UI Interaction States
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // Redirectig user to the apply job page 
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';


   console.log("redirect to",redirectTo);
  // Email/Password Login Handler
  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

     const form = e.currentTarget; // ✅ form reference saved for later reset

    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    );
    // console.log(formData);

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: true,
        
      });
      if (error) {
        return setError(
          error.message || 'Invalid credentials. Please try again.',
        );
      }
      // Simulating BetterAuth network sign-in delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      setSuccess('Welcome back! Logging you in...');
      // Redirecting user to the intended page after successful login
      router.push(redirectTo);
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Social Login Handler
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
       const data = await authClient.signIn.social({
         provider: 'google',
       });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError(err.message || 'Google sign-in failed. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <section className="w-full bg-transparent text-white  px-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md bg-[#0f1012]/90 border border-white/[0.05] p-8 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col gap-6">
        {/* Top Header Information */}
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="text-sm text-[#71717a]">
            Enter your credentials to access your HireLoop account.
          </p>
        </div>

        {/* Dynamic Status Notifications */}
        {error && (
          <Alert
            color="danger"
            variant="flat"
            className="border border-danger/20 text-sm animate-appearance-in"
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            color="success"
            variant="flat"
            className="border border-success/20 text-sm animate-appearance-in"
          >
            {success}
          </Alert>
        )}

        {/* Login Credentials Form */}
        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          {/* Email Input Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full flex flex-col gap-1.5"
            validate={value => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return 'Please enter a valid email address';
              }
              return null;
            }}
          >
            <Label className="text-gray-300 font-medium text-xs sm:text-sm select-none">
              Email
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-4 z-10 text-[#52525b]">
                <Envelope width={18} height={18} />
              </span>
              <Input
                placeholder="john@example.com"
                className="w-full bg-[#18191b] border border-white/5 data-[hover=true]:border-white/10 h-12 rounded-xl text-white placeholder-[#52525b] pl-11 pr-4 text-[15px] transition-colors focus:outline-none focus:border-[#5b42f3]"
              />
            </div>
            <FieldError className="text-xs text-danger mt-1 animate-appearance-in" />
          </TextField>

          {/* Password Input Field with Visibility Toggle */}
          <TextField
            isRequired
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            className="w-full flex flex-col gap-1.5"
          >
            <Label className="text-gray-300 font-medium text-xs sm:text-sm select-none">
              Password
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-4 z-10 text-[#52525b]">
                <Key width={18} height={18} />
              </span>
              <Input
                placeholder="Enter your password"
                className="w-full bg-[#18191b] border border-white/5 data-[hover=true]:border-white/10 h-12 rounded-xl text-white placeholder-[#52525b] pl-11 pr-12 text-[15px] transition-colors focus:outline-none focus:border-[#5b42f3]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 z-10 focus:outline-none text-[#52525b] hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                {passwordVisible ? (
                  <EyeSlash width={18} height={18} />
                ) : (
                  <Eye width={18} height={18} />
                )}
              </button>
            </div>
            <FieldError className="text-xs text-danger mt-1 animate-appearance-in" />
          </TextField>

          {/* Action Submission Button */}
          <Button
            type="submit"
            radius="lg"
            isLoading={isLoading}
            className="w-full mt-2 bg-gradient-to-r from-[#5b42f3] to-[#00d2ff] text-white font-medium h-12 text-[15px] shadow-[0_0_20px_rgba(91,66,243,0.3)] hover:opacity-90 transition-opacity"
          >
            {!isLoading && <Check width={16} height={16} className="mr-1" />}
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Form>

        {/* Separator Line */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-white/[0.06]"></div>
          <span className="flex-shrink mx-4 text-xs font-medium text-[#52525b] uppercase tracking-wider">
            Or
          </span>
          <div className="flex-grow border-t border-white/[0.06]"></div>
        </div>

        {/* Repositioned Google Authentication Button Option with enhanced glass-dark background */}
        <Button
          type="button"
          radius="lg"
          variant="flat"
          isLoading={isGoogleLoading}
          onClick={handleGoogleSignIn}
          className="w-full bg-[#1c1d20] hover:bg-[#232428] border border-white/5 hover:border-white/10 text-white h-12 text-[15px] font-medium transition-all duration-200 shadow-inner"
        >
          <FcGoogle />
          Continue with Google
        </Button>

        {/* Redirect Anchor Option */}
        <div className="text-center text-sm text-[#52525b] mt-1">
          Don't have an account?{' '}
          <Link
            href={`/auth/signup?redirect=${redirectTo}`}
            className="text-[#6366f1] hover:text-[#4f46e5] font-medium transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
