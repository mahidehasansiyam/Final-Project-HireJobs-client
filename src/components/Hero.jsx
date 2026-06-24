'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { Magnifier, LocationArrowFill, Briefcase } from '@gravity-ui/icons';

export default function Hero() {
  const trendingPositions = [
    'Product Designer',
    'AI Engineering',
    'Dev-ops Engineer',
  ];

  return (
    <section className="w-full max-w-6xl border border-white rounded-2xl bg-transparent text-white py-3 mb-8 sm:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="max-w-4xl  flex flex-col items-center text-center gap-6 relative z-10">
        {/* Top Badge: "50,000+ New Jobs This Month" */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md shadow-inner select-none animate-fade-in">
          <Briefcase className="text-[#ff7b00]" width={16} height={16} />
          <span className="text-xs sm:text-sm font-mono tracking-wider font-semibold uppercase text-gray-300">
            <span className="text-white font-bold font-sans">50,000+</span> New
            Jobs This Month
          </span>
        </div>

        {/* Main Heading Text */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2 max-w-3xl leading-tight">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle / Paragraph Text */}
        <p className="text-[#a1a1aa] text-base sm:text-lg leading-relaxed max-w-2xl font-normal px-2">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Compound Search Input Bar Container */}
        <div className="w-full max-w-3xl mt-6 bg-[#0f1012]/80 border border-white/[0.05] p-2 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-2">
          {/* Input Area 1: Job Title */}
          <div className="w-full flex items-center gap-3 px-3 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-white/10">
            <Magnifier
              className="text-[#a1a1aa]"
              width={20}
              height={20}
            />
            <input
              type="text"
              placeholder="Job tilte, skill or company" // Kept original layout typo "tilte" intentionally
              className="w-full bg-transparent text-white placeholder-[#52525b] text-[15px] focus:outline-none"
            />
          </div>

          {/* Input Area 2: Location */}
          <div className="w-full flex items-center gap-3 px-3 py-2 sm:py-0">
            <LocationArrowFill className="text-[#a1a1aa]" width={20} height={20} />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-white placeholder-[#52525b] text-[15px] focus:outline-none"
            />
          </div>

          {/* Action Search Button */}
          <Button
            isIconOnly
            radius="xl"
            className="w-full sm:w-12 h-12 bg-gradient-to-r from-[#5b42f3] to-[#00d2ff] text-white min-w-[48px] shadow-[0_0_20px_rgba(91,66,243,0.4)] hover:opacity-90 transition-opacity"
            aria-label="Search"
          >
            <Magnifier width={20} height={20} className="stroke-[2.5]" />
          </Button>
        </div>

        {/* Bottom Section: Trending Positions Labels */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 text-[14px]">
          <span className="text-[#52525b] font-medium">Trending Position</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trendingPositions.map((position, index) => (
              <button
                key={index}
                className="px-4 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-gray-300 hover:text-white transition-all text-xs sm:text-[13px] font-medium"
              >
                {position}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
