'use client';

import React, { useState } from 'react';
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Alert,
} from '@heroui/react';

import {
  Check,
  Person,
  Envelope,
  Key,
  Eye,
  EyeSlash,
  Picture,
} from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import {  Radio, RadioGroup } from '@heroui/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';


const SignupForm = () => {
  // UI Interaction States
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // Redirectig user to the apply job page
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';


  // Submit Handler converting FormData natively
  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const form = e.currentTarget; // form reference saved for later reset

    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    );
    // console.log(formData);

    const plan = formData.role === 'seeker' ? 'seeker-free' : 'recruiter-free';

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.imageUrl,
        role: formData.role,
        plan: plan,
      });
      // console.log('Sign-up response:', { data, error });
      if (error) {
        return setError(
          error.message || 'An unexpected error occurred. Please try again.',
        );
      }

      // Simulating BetterAuth network submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess('Account created successfully! Welcome to HireLoop.');
      form.reset(); // Clear form fields natively on success
      // Redirecting user to the intended page after successful signup
      router.push(redirectTo);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full bg-transparent text-white  px-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md bg-[#0f1012]/90 border border-white/[0.05] p-8 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col gap-6">
        {/* Top Header Information */}
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Create an account
          </h2>
          <p className="text-sm text-[#71717a]">
            Join HireLoop to discover thousands of curated opportunities.
          </p>
        </div>

        {/* Dynamic Warning Notification Elements */}
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

        {/* Form Container */}
        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          {/* 1. Full Name Input Field */}
          <TextField
            isRequired
            name="name"
            type="text"
            className="w-full flex flex-col gap-1.5"
          >
            <Label className="text-gray-300 font-medium text-xs sm:text-sm select-none">
              Full Name
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-4 z-10 text-[#52525b]">
                <Person width={18} height={18} />
              </span>
              <Input
                placeholder="John Doe"
                className="w-full bg-[#18191b] border border-white/5 data-[hover=true]:border-white/10 h-12 rounded-xl text-white placeholder-[#52525b] pl-11 pr-4 text-[15px] transition-colors focus:outline-none focus:border-[#5b42f3]"
              />
            </div>
            <FieldError className="text-xs text-danger mt-1 animate-appearance-in" />
          </TextField>

          {/* 2. Email Input Field */}
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

          {/* 3. Password Input Field with Toggle Button */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            className="w-full flex flex-col gap-1.5"
            validate={value => {
              if (value.length < 8) {
                return 'Password must be at least 8 characters';
              }
              if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
              }
              if (!/[0-9]/.test(value)) {
                return 'Password must contain at least one number';
              }
              return null;
            }}
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
            <Description className="text-[11px] text-[#52525b] leading-tight mt-0.5">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-danger mt-1 animate-appearance-in" />
          </TextField>

          {/* 4. Optional Profile Image URL Input Field */}
          <TextField
            name="imageUrl"
            type="url"
            className="w-full flex flex-col gap-1.5"
          >
            <div className="flex justify-between items-center w-full">
              <Label className="text-gray-300 font-medium text-xs sm:text-sm select-none">
                Profile Image URL
              </Label>
              <span className="text-[11px] text-[#52525b]">Optional</span>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-4 z-10 text-[#52525b]">
                <Picture width={18} height={18} />
              </span>
              <Input
                placeholder="https://example.com/avatar.jpg"
                className="w-full bg-[#18191b] border border-white/5 data-[hover=true]:border-white/10 h-12 rounded-xl text-white placeholder-[#52525b] pl-11 pr-4 text-[15px] transition-colors focus:outline-none focus:border-[#5b42f3]"
              />
            </div>
            <FieldError className="text-xs text-danger mt-1 animate-appearance-in" />
          </TextField>
          {/* role */}
          <div className="flex flex-col gap-4">
            <Label>Your Role</Label>
            <RadioGroup
              defaultValue="seeker"
              name="role"
              orientation="horizontal"
            >
              <Radio  value="seeker">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Job Seeker
                </Radio.Content>

              </Radio>
              <Radio value="recruiter">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Recruiter
                </Radio.Content>

              </Radio>

            </RadioGroup>
          </div>
          {/* Action Submission Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              type="submit"
              radius="lg"
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-[#5b42f3] to-[#00d2ff] text-white font-medium h-12 text-[15px] shadow-[0_0_20px_rgba(91,66,243,0.3)] hover:opacity-90 transition-opacity"
            >
              {!isLoading && <Check width={16} height={16} className="mr-1" />}
              {isLoading ? 'Creating Account...' : 'Submit'}
            </Button>
            <Button
              type="reset"
              radius="lg"
              variant="bordered"
              className="border-white/10 text-gray-300 hover:bg-white/5 h-12 text-[15px]"
            >
              Reset
            </Button>
          </div>
        </Form>

        {/* Existing Account / Login Redirect Anchor Option */}
        <div className="text-center text-sm text-[#52525b] mt-1">
          Already have an account?{' '}
          <Link
            href={`/auth/login?redirect=${redirectTo}`}
            className="text-[#6366f1] hover:text-[#4f46e5] font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
