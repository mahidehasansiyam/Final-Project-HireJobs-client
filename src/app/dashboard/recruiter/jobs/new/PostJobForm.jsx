'use client';

import React, { useState } from 'react';
import {
  Form,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  TextArea,
  Button,
  Alert,
} from '@heroui/react';
import { Briefcase, Pin, CircleDollar, Calendar } from '@gravity-ui/icons';
import { createJob } from '@/lib/actions/jobs';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function PostJobForm({ recruiter, recruitercompanies }) {
  // console.log(recruiter, recruitercompany);
  const recruitercompany = recruitercompanies[0]
  console.log('Company:', recruitercompany);
  console.log('Status:', recruitercompany?.status);
  console.log('ID:', recruitercompany?._id);


  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 🛠️ FIX: Safe evaluations with relaxed rules so it doesn't lock up during 'pending' status
  const isApproved =
    recruitercompany?.status === 'approved' ||
    recruitercompany?.isApproved === true ||
    recruitercompany?.status === 'pending';
  const currentJobCount = Number(recruitercompany?.currentJobCount || 0);
  const maxLimit = Number(recruitercompany?.maxLimit || 10); // Default to 10 openings if not explicitly passed
  const planName = recruitercompany?.plan || 'Standard';

  const isOverLimit = currentJobCount >= maxLimit;
  const canPost = isApproved && !isOverLimit;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!canPost) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const form = e.currentTarget;

    data.companyName = recruitercompany?.name || 'Acme Corp';
    data.companyId = recruitercompany?._id || '';
    data.logo = recruitercompany?.logo || '';
    data.status = 'active';
    data.isPubliclyVisible = true;
    data.postedAt = new Date().toISOString();

    try {
      const res = await createJob(data);
      if (res?.acknowledged) {
        setSuccess(`Job post for "${data.title}" successfully created!`);
        toast.success(`Job post for "${data.title}" successfully created!`);
        form.reset();
        router.push('/dashboard/recruiter/jobs');
      } else {
        setError('Failed to create the job post. Please try again.');
      }
    } catch (err) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#090a0b] text-white py-12 px-4 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl bg-[#121315] border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Block Panel layout */}
        <div className="p-6 border-b border-white/[0.06] flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Post a New Job <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                {recruitercompany?.status}
              </h2>
            </h2>
            <p className="text-xs sm:text-sm text-[#71717a]">
              Enter the operational roles and requirements to start hiring on
              HireLoop.
            </p>
          </div>
          <button
            type="button"
            className="text-[#52525b] hover:text-white transition-colors text-lg"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        {/* Company Active Plan Guardrail Notifications */}
        <div className="px-6 pt-6">
          {recruitercompany?.status === 'pending' && (
            <Alert
              color="warning"
              variant="flat"
              className="border border-warning/20 text-xs sm:text-sm mb-4"
            >
              Notice: Your company profile is currently pending administrator
              approval. (Testing Mode Allowed)
            </Alert>
          )}

          {isOverLimit ? (
            <Alert
              color="danger"
              variant="flat"
              className="border border-danger/20 text-xs sm:text-sm"
            >
              Posting Blocked: You have utilized {currentJobCount} out of{' '}
              {maxLimit} available openings.
            </Alert>
          ) : (
            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex justify-between items-center text-xs text-[#71717a]">
              <span>
                Hiring Company:{' '}
                <strong className="text-white">
                  {recruitercompany?.name || 'Acme Corp'}
                </strong>
              </span>
              <span>
                Usage Allotment:{' '}
                <strong className="text-white">
                  {currentJobCount} / {maxLimit} Active Jobs
                </strong>{' '}
                ({planName})
              </span>
            </div>
          )}
        </div>

        {recruitercompany?.status !== 'approved' && (
          <div className="p-6 text-center">
            <p className="text-red-500 text-sm">
              Your company profile must be approved before you can post jobs.
            </p>
          </div>
        )}

        {/* HeroUI v3 Pure Form Wrapper */}
       {recruitercompany?.status === 'approved' && (
         <Form
           className="p-6 flex flex-col gap-8"
           onSubmit={handleSubmit}
           validationBehavior="native"
         >
           {/* ================= COMPONENT SECTION 1: JOB INFO ================= */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6366f1] border-b border-white/[0.04] pb-1">
              1. Job Info
            </h3>

            {/* Input Row 1: Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField isRequired className="w-full flex flex-col gap-1.5">
                <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Job Title
                </Label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 z-10 text-[#52525b]">
                    <Briefcase width={16} height={16} />
                  </span>
                  <Input
                    name="title"
                    type="text"
                    placeholder="e.g. Lead Software Engineer"
                    className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white placeholder-[#52525b] pl-11 pr-4 text-sm focus:outline-none"
                  />
                </div>
              </TextField>

              <div className="w-full flex flex-col gap-1.5">
                <label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Job Category
                </label>
                <Select
                  name="category"
                  placeholder="Select Category"
                  defaultSelectedKeys={['tech']}
                  className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white text-sm"
                >
                  <Select.Trigger className="w-full h-full px-4 flex items-center justify-between text-left">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox className="bg-[#18191b] border border-white/10 rounded-xl p-1 text-white">
                      <ListBox.Item
                        id="tech"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        Technology / Engineering
                      </ListBox.Item>
                      <ListBox.Item
                        id="design"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        Design & UX
                      </ListBox.Item>
                      <ListBox.Item
                        id="marketing"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        Marketing & Growth
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Input Row 2: Job Type & Application Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Job Type
                </label>
                <Select
                  name="jobType"
                  placeholder="Select Type"
                  defaultSelectedKeys={['full-time']}
                  className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white text-sm"
                >
                  <Select.Trigger className="w-full h-full px-4 flex items-center justify-between text-left">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox className="bg-[#18191b] border border-white/10 rounded-xl p-1 text-white">
                      <ListBox.Item
                        id="full-time"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        Full-time
                      </ListBox.Item>
                      <ListBox.Item
                        id="part-time"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        Part-time
                      </ListBox.Item>
                      <ListBox.Item
                        id="contract"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        Contract
                      </ListBox.Item>
                      <ListBox.Item
                        id="internship"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        Internship
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField isRequired className="w-full flex flex-col gap-1.5">
                <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Application Deadline
                </Label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 z-10 text-[#52525b]">
                    <Calendar width={16} height={16} />
                  </span>
                  <Input
                    name="deadline"
                    type="date"
                    className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white pl-11 pr-4 text-sm focus:outline-none"
                  />
                </div>
              </TextField>
            </div>

            {/* Input Row 3: Financial Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextField isRequired className="w-full flex flex-col gap-1.5">
                <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Min Salary
                </Label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 z-10 text-[#52525b]">
                    <CircleDollar width={16} height={16} />
                  </span>
                  <Input
                    name="minSalary"
                    type="number"
                    placeholder="e.g. 50000"
                    className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white pl-11 pr-4 text-sm focus:outline-none"
                  />
                </div>
              </TextField>

              <TextField isRequired className="w-full flex flex-col gap-1.5">
                <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Max Salary
                </Label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 z-10 text-[#52525b]">
                    <CircleDollar width={16} height={16} />
                  </span>
                  <Input
                    name="maxSalary"
                    type="number"
                    placeholder="e.g. 80000"
                    className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white pl-11 pr-4 text-sm focus:outline-none"
                  />
                </div>
              </TextField>

              <div className="w-full flex flex-col gap-1.5">
                <label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Currency
                </label>
                <Select
                  name="currency"
                  placeholder="USD"
                  defaultSelectedKeys={['usd']}
                  className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white text-sm"
                >
                  <Select.Trigger className="w-full h-full px-4 flex items-center justify-between text-left">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox className="bg-[#18191b] border border-white/10 rounded-xl p-1 text-white">
                      <ListBox.Item
                        id="usd"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        USD ($)
                      </ListBox.Item>
                      <ListBox.Item
                        id="eur"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        EUR (€)
                      </ListBox.Item>
                      <ListBox.Item
                        id="bdt"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        BDT (৳)
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Input Row 4: Geolocation Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField isRequired className="w-full flex flex-col gap-1.5">
                <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                  City
                </Label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 z-10 text-[#52525b]">
                    <Pin width={16} height={16} />
                  </span>
                  <Input
                    name="city"
                    type="text"
                    placeholder="e.g. Dhaka"
                    className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white pl-11 pr-4 text-sm focus:outline-none"
                  />
                </div>
              </TextField>

              <TextField isRequired className="w-full flex flex-col gap-1.5">
                <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Country
                </Label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 z-10 text-[#52525b]">
                    <Pin width={16} height={16} />
                  </span>
                  <Input
                    name="country"
                    type="text"
                    placeholder="e.g. Bangladesh"
                    className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white pl-11 pr-4 text-sm focus:outline-none"
                  />
                </div>
              </TextField>
            </div>
          </div>

          {/* ================= COMPONENT SECTION 2: JOB DESCRIPTION ================= */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6366f1] border-b border-white/[0.04] pb-1">
              2. Job Description
            </h3>

            <TextField isRequired className="w-full flex flex-col gap-1.5">
              <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                Core Responsibilities
              </Label>
              <TextArea
                name="responsibilities"
                rows={3}
                placeholder="Outline daily tasks and expectations..."
                className="w-full bg-[#18191b] border border-white/5 rounded-xl text-white placeholder-[#52525b] p-3 text-sm focus:outline-none"
              />
            </TextField>

            <TextField isRequired className="w-full flex flex-col gap-1.5">
              <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                Job Requirements
              </Label>
              <TextArea
                name="requirements"
                rows={3}
                placeholder="List required technical skills and minimum years of experience..."
                className="w-full bg-[#18191b] border border-white/5 rounded-xl text-white placeholder-[#52525b] p-3 text-sm focus:outline-none"
              />
            </TextField>

            <TextField className="w-full flex flex-col gap-1.5">
              <div className="flex justify-between items-center w-full">
                <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Perks & Benefits
                </Label>
                <span className="text-[11px] text-[#52525b]">Optional</span>
              </div>
              <TextArea
                name="benefits"
                rows={2}
                placeholder="e.g. Health coverage, flexible learning budgets..."
                className="w-full bg-[#18191b] border border-white/5 rounded-xl text-white placeholder-[#52525b] p-3 text-sm focus:outline-none"
              />
            </TextField>
          </div>

          {/* Form Global Action Feedback System Alerts */}
          <div className="px-2">
            {error && (
              <Alert
                color="danger"
                variant="flat"
                className="text-sm border border-danger/20"
              >
                {error}
              </Alert>
            )}
            {success && (
              <Alert
                color="success"
                variant="flat"
                className="text-sm border border-success/20"
              >
                {success}
              </Alert>
            )}
          </div>

          {/* ================= ACTIONS BAR ================= */}
          <div className="mt-4 -mx-6 -mb-6 p-4 bg-[#18191b] border-t border-white/[0.06] flex justify-end gap-3">
            <Button
              type="button"
              className="text-gray-400 hover:text-white border-none text-sm px-5 h-10 rounded-xl bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isDisabled={!canPost}
              isLoading={isLoading}
              className="px-6 h-10 rounded-xl text-sm font-semibold text-black bg-white hover:bg-gray-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Publish Job
            </Button>
          </div>
        </Form>)}
      </div>
    </section>
  );
}
