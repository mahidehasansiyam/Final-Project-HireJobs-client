'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { Pin, Briefcase, CircleDollar } from '@gravity-ui/icons';
import Link from 'next/link';

export default function JobCard({ job }) {
  if (!job) return null;

  // Exact mapping matching your MongoDB server structure
  const {
    _id,
    title,
    category,
    jobType,
    minSalary,
    maxSalary,
    currency = 'usd',
    city,
    country,
    companyName,
    logo,
    status,
  } = job;

  // Currencies lookup dictionary
  const currencySymbols = {
    usd: '$',
    eur: '€',
    bdt: '৳',
  };
  const symbol = currencySymbols[currency.toLowerCase()] || '$';

  // Extracting string id regardless of whether it's an object or string
  const jobId = _id?.$oid || _id;

  return (
    <div className="w-full bg-[#121315] border border-white/[0.06] rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-white/[0.12] transition-all duration-300">
      {/* Upper Panel: Logo & Status Badge */}
      <div className="flex justify-between items-start w-full mb-4">
        <div className="w-14 h-14 bg-[#18191b] border border-white/[0.08] rounded-xl flex items-center justify-center overflow-hidden p-2">
          <img
            src={logo || 'https://via.placeholder.com/150'}
            alt={`${companyName || 'Company'} logo`}
            className="w-full h-full object-contain"
            onError={e => {
              e.currentTarget.src = 'https://via.placeholder.com/150';
            }}
          />
        </div>

        {status === 'active' && (
          <span className="flex items-center gap-1 bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#10b981]/20">
            ● Verified
          </span>
        )}
      </div>

      {/* Primary Context Section */}
      <div className="flex flex-col gap-1 mb-4">
        <h3 className="text-lg font-bold tracking-tight text-white line-clamp-1">
          {companyName || 'Anonymous Recruiter'}
        </h3>
        <h4 className="text-sm font-medium text-[#6366f1] tracking-wide line-clamp-1">
          {title}
        </h4>
      </div>

      {/* Pill Attribute Meta Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="flex items-center gap-1.5 bg-[#18191b] border border-white/[0.05] text-[#a1a1aa] text-xs px-3 py-1.5 rounded-full capitalize">
          <Briefcase width={12} height={12} className="text-[#52525b]" />
          {jobType} / {category}
        </span>
        <span className="flex items-center gap-1.5 bg-[#18191b] border border-white/[0.05] text-[#a1a1aa] text-xs px-3 py-1.5 rounded-full">
          <Pin width={12} height={12} className="text-[#52525b]" />
          <span>
            {city}
            {country ? `, ${country}` : ''}
          </span>
        </span>
      </div>

      {/* Card Footer Separator Rule & Actions */}
      <div className="w-full pt-4 border-t border-white/[0.06] flex items-center justify-between mt-auto">
        {/* Left Side: Dynamic Salary Range Display */}
        <div className="flex flex-col">
          <span className="text-[10px] text-[#52525b] uppercase font-bold tracking-wider">
            Salary range
          </span>
          <div className="flex items-center gap-0.5 text-white font-semibold text-sm">
            <CircleDollar
              width={14}
              height={14}
              className="text-[#71717a] mr-0.5"
            />
            <span>
              {symbol}
              {Number(minSalary || 0).toLocaleString()}
            </span>
            <span className="text-[#52525b] mx-0.5">-</span>
            <span>
              {symbol}
              {Number(maxSalary || 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Right Side: Navigation/Apply Trigger */}
        <Link
          href={`/alljobs/${_id}`}
          type="button"
          className="bg-transparent hover:bg-white/5 text-white text-xs font-semibold px-4 h-9 rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
          onPress={() => console.log(`Navigating to /jobs/${jobId}`)}
        >
          Apply Now <span className="text-sm">→</span>
        </Link>
      </div>
    </div>
  );
}
