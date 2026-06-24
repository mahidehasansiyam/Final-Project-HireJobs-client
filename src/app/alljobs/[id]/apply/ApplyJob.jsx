'use client';

import React from 'react';
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  TextArea,
  Button,
} from '@heroui/react';
import { Copy, Link, Comment } from '@gravity-ui/icons';
import { submitApplication } from '@/lib/actions/applications';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

export default function ApplyJob({ job, applicant }) {
  const onSubmit =async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const applicationData = {
      ...data,
      jobId: job?._id,
      jobTitle: job?.title,
      applicantId: applicant?.id,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      companyId: job?.companyId,
      companyName: job?.companyName,
      status: "Applied",
      
    };
    // console.log('Application Submitted:', applicationData);

    // GET Applicant Application
    

    // POST the application data to the backend API
    const res = await submitApplication(applicationData);
    if (res.insertedId) {
      toast.success('Application submitted successfully!');
      redirect("/alljobs");
    } else {
      toast.error('Failed to submit application. Please try again.');
    }
  }
  return (
    <main className="min-h-screen bg-[#090a0b] text-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#121315] border border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Header Metadata Section */}
        <header className="mb-8">
          <span className="text-[10px] text-[#3b82f6] uppercase font-bold tracking-widest block mb-1">
            Application Form
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
            Apply for {job?.title}
          </h1>
          <p className="text-sm text-[#71717a]">
            Applying as:{' '}
            <span className="text-white font-medium">{applicant?.name}</span>{' '}
            <span className="text-[#52525b]">({applicant?.email})</span>
          </p>
        </header>

        <hr className="border-white/[0.06] mb-6" />

        {/* Declarative HeroUI Form Architecture */}
        <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
          {/* Field 1: Required Resume Link */}
          <TextField
            isRequired
            name="resumeLink"
            type="url"
            className="flex flex-col gap-2 w-full"
            validate={value => {
              if (!value) return 'Resume link is required';
              if (!/^https?:\/\/.+/i.test(value)) {
                return 'Please enter a valid URL (starting with http:// or https://)';
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-[#a1a1aa] flex items-center gap-2">
              <Copy width={14} height={14} className="text-[#52525b]" />
              Resume Link <span className="text-[#f43f5e]">*</span>
            </Label>
            <Input
              placeholder="http://localhost:3000/jobs/.../apply"
              className="w-full bg-[#18191b] border border-white/5 rounded-xl text-white placeholder-[#52525b] h-12 px-4 text-sm focus:outline-none transition-all"
            />
            <span className="text-[11px] text-[#52525b]">
              Provide a public link to your resume (Google Drive, Notion,
              Dropbox, etc.)
            </span>
            <FieldError className="text-xs text-[#f43f5e] mt-1" />
          </TextField>

          {/* Field 2: Optional Portfolio Link */}
          <TextField
            name="portfolioLink"
            type="url"
            className="flex flex-col gap-2 w-full"
            validate={value => {
              if (value && !/^https?:\/\/.+/i.test(value)) {
                return 'Please enter a valid portfolio URL';
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-[#a1a1aa] flex items-center gap-2">
              <Link width={14} height={14} className="text-[#52525b]" />
              Portfolio / Website{' '}
              <span className="text-[#52525b] font-normal">(Optional)</span>
            </Label>
            <Input
              placeholder="https://yourportfolio.com"
              className="w-full bg-[#18191b] border border-white/5 rounded-xl text-white placeholder-[#52525b] h-12 px-4 text-sm focus:outline-none transition-all"
            />
            <FieldError className="text-xs text-[#f43f5e] mt-1" />
          </TextField>

          {/* Field 3: Short Message / Notes */}
          <TextField name="coverLetter" className="flex flex-col gap-2 w-full">
            <Label className="text-xs font-semibold text-[#a1a1aa] flex items-center gap-2">
              <Comment width={14} height={14} className="text-[#52525b]" />
              Short Message / Notes{' '}
              <span className="text-[#52525b] font-normal">(Optional)</span>
            </Label>
            <TextArea
              rows={4}
              placeholder="Anything else you'd like to share with the hiring team..."
              className="w-full bg-[#18191b] border border-white/5 rounded-xl text-white placeholder-[#52525b] p-4 text-sm focus:outline-none transition-all resize-none"
            />
            <FieldError className="text-xs text-[#f43f5e] mt-1" />
          </TextField>

          {/* Action Buttons Group Bar */}
          <div className="flex items-center justify-end gap-3 mt-4">
            <Button
              type="reset"
              className="bg-transparent hover:bg-white/5 text-[#71717a] hover:text-white text-xs font-semibold px-5 h-11 rounded-xl border border-white/10 transition-all"
            >
              Clear Form
            </Button>
            <Button
              type="submit"
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-6 h-11 rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-blue-900/20"
            >
              Submit Application <span className="text-sm">→</span>
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
}
