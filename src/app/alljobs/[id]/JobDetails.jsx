"use client";

import React from 'react';
import { Button } from '@heroui/react';
import {
  Briefcase,
  Pin,
  CircleDollar,
  Calendar,
  Layers,
  Bookmark,
  Check,
  Sparkles,
} from '@gravity-ui/icons';
import { getJobById } from '@/lib/api/jobsfetch';
import Link from 'next/link';

export default  function JobDetails({ job }) {
  
  // Destructure server-side MongoDB document fields
  const {
    title = 'Position Title',
    category = 'General',
    jobType = 'Full-Time',
    deadline,
    minSalary,
    maxSalary,
    currency = 'usd',
    city = 'Remote',
    country = '',
    responsibilities = '',
    requirements = '',
    benefits = '',
    companyName = 'Verified Employer',
    logo,
    status = 'active',
  } = job;

  // Currencies lookup directory
  const currencySymbols = {
    usd: '$',
    eur: '€',
    bdt: '৳',
    gbp: '£',
  };
  const symbol = currencySymbols[currency.toLowerCase()] || '$';

  // Helper to split newline text strings (\n) into functional list arrays
  const parseListItems = textString => {
    if (!textString) return [];
    return textString
      .split('\n')
      .map(item => item.trim())
      .filter(Boolean);
  };

  const responsibilityList = parseListItems(responsibilities);
  const requirementList = parseListItems(requirements);
  const benefitList = parseListItems(benefits);

  return (
    <div className="min-h-screen bg-[#090a0b] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* ================= 1. TOP HEADER BANNER SECTION ================= */}
        <header className="w-full bg-[#121315] border border-white/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            {/* Company Logo Display Container */}
            <div className="w-16 h-16 bg-[#18191b] border border-white/[0.08] rounded-2xl flex items-center justify-center overflow-hidden p-2.5 shrink-0">
              <img
                src={logo || 'https://via.placeholder.com/150'}
                alt={`${companyName} Logo`}
                className="w-full h-full object-contain"
                onError={e => {
                  e.currentTarget.src = 'https://via.placeholder.com/150';
                }}
              />
            </div>
            {/* Title & Brand Meta info Block */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-[#71717a]">
                <span className="font-medium text-white/90">{companyName}</span>
                {status === 'active' && (
                  <>
                    <span className="text-white/20">•</span>
                    <span className="text-[#10b981] font-semibold text-xs flex items-center gap-1 bg-[#10b981]/10 px-2 py-0.5 rounded-full border border-[#10b981]/20">
                      Verified Employer
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Trigger Box Panels */}
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <Button
              isIconOnly
              type="button"
              className="bg-[#18191b] hover:bg-white/5 border border-white/10 rounded-xl w-12 h-12 flex items-center justify-center text-[#a1a1aa] transition-all"
            >
              <Bookmark width={18} height={18} />
            </Button>
            <Link
              href={`/alljobs/${job._id}/apply`}
              
              className="flex-1 sm:flex-none bg-white hover:bg-white/90 text-black font-semibold text-sm h-12 px-6 rounded-xl transition-all shadow-md"
            >
              Apply Now
            </Link>
          </div>
        </header>

        {/* ================= 2. HIGHLIGHT PARAMETERS CARD ROW ================= */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="bg-[#121315] border border-white/[0.06] rounded-xl p-4 flex flex-col gap-1 shadow-sm">
            <span className="text-[10px] text-[#52525b] uppercase font-bold tracking-wider flex items-center gap-1">
              <CircleDollar className="text-[#71717a]" width={12} height={12} />{' '}
              Salary Range
            </span>
            <span className="text-sm font-semibold text-white mt-1">
              {symbol}
              {Number(minSalary || 0).toLocaleString()} - {symbol}
              {Number(maxSalary || 0).toLocaleString()}
            </span>
          </div>

          <div className="bg-[#121315] border border-white/[0.06] rounded-xl p-4 flex flex-col gap-1 shadow-sm">
            <span className="text-[10px] text-[#52525b] uppercase font-bold tracking-wider flex items-center gap-1">
              <Pin className="text-[#71717a]" width={12} height={12} /> Location
            </span>
            <span className="text-sm font-semibold text-white mt-1">
              {city}
              {country ? `, ${country}` : ''}
            </span>
          </div>

          <div className="bg-[#121315] border border-white/[0.06] rounded-xl p-4 flex flex-col gap-1 shadow-sm">
            <span className="text-[10px] text-[#52525b] uppercase font-bold tracking-wider flex items-center gap-1">
              <Briefcase className="text-[#71717a]" width={12} height={12} />{' '}
              Job Type
            </span>
            <span className="text-sm font-semibold text-white mt-1 capitalize">
              {jobType}
            </span>
          </div>

          <div className="bg-[#121315] border border-white/[0.06] rounded-xl p-4 flex flex-col gap-1 shadow-sm">
            <span className="text-[10px] text-[#52525b] uppercase font-bold tracking-wider flex items-center gap-1">
              <Calendar className="text-[#71717a]" width={12} height={12} />{' '}
              Application Deadline
            </span>
            <span className="text-sm font-semibold text-[#f43f5e] mt-1">
              {deadline
                ? new Date(deadline).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'N/A'}
            </span>
          </div>
        </section>

        {/* ================= 3. CORE DETAILS CONTENT ARCHITECTURE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
          {/* LEFT SIDE BLOCK: Comprehensive Job Requirements Details */}
          <section className="lg:col-span-2 bg-[#121315] border border-white/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col gap-8 shadow-xl">
            {/* Segment 1: Overview Text */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Job Overview
              </h2>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">
                We are looking for a skilled{' '}
                <span className="text-white font-medium">{title}</span> to join
                our team under the{' '}
                <span className="text-white capitalize">{category}</span>{' '}
                sector. In this role, you will collaborate heavily to advance
                engineering goals, build responsive features, and enhance
                platform functionality.
              </p>
            </div>

            {/* Segment 2: Key Responsibilities List Block */}
            {responsibilityList.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Key Responsibilities
                </h2>
                <ul className="flex flex-col gap-3">
                  {responsibilityList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#a1a1aa] leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Segment 3: Profile System Requirements Block */}
            {requirementList.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Requirements & Core Skills
                </h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {requirementList.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1.5 bg-[#18191b] border border-white/[0.05] text-white text-xs px-3 py-1.5 rounded-xl font-medium"
                    >
                      🛠️ {item.split(' ')[0]}
                    </span>
                  ))}
                </div>
                <ul className="flex flex-col gap-3">
                  {requirementList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#a1a1aa] leading-relaxed"
                    >
                      <Check
                        width={14}
                        height={14}
                        className="text-[#10b981] mt-1 shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Segment 4: Compensation Perks & Benefits Block */}
            {benefitList.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Perks & Benefits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefitList.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#18191b] border border-white/[0.04] rounded-xl p-3.5 flex items-center gap-3"
                    >
                      <Sparkles
                        width={16}
                        height={16}
                        className="text-[#6366f1]"
                      />
                      <span className="text-sm text-white/90 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

         
        </div>
      </div>
    </div>
  );
}
