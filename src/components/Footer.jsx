'use client';

import React from 'react';
import { Link } from '@heroui/react';
// Switching to Gravity UI Icons
import { LogoFacebook, LogoLinkedin, Compass } from '@gravity-ui/icons';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050506] text-gray-400 relative overflow-hidden border-t border-white/5">
      {/* Background grid/wireframe lines layer */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-40 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-12 relative z-10">
        {/* Top Section: Branding & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 pb-16">
          {/* Left Column: Brand Description */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-1 font-bold text-2xl tracking-tight select-none">
              <span className="text-[#0091ff]">hire</span>
              
              <span className="text-[#ff7b00]">jobs</span>
            </div>
            <p className="text-[#52525b] text-[15px] leading-relaxed max-w-sm font-normal">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Right Columns: Nav Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 md:justify-items-end">
            {/* Product Links */}
            <div className="flex flex-col gap-4 min-w-[120px]">
              <h4 className="text-[#3b82f6] text-base font-semibold tracking-wide">
                Product
              </h4>
              <ul className="flex flex-col gap-3 text-[#52525b] text-[15px]">
                <li>
                  <Link
                    href="#"
                    className="text-inherit hover:text-gray-300 transition-colors"
                  >
                    Job discovery
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-inherit hover:text-gray-300 transition-colors"
                  >
                    Worker AI
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-inherit hover:text-gray-300 transition-colors"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-inherit hover:text-gray-300 transition-colors"
                  >
                    Salary data
                  </Link>
                </li>
              </ul>
            </div>

            {/* Navigations Links */}
            <div className="flex flex-col gap-4 min-w-[120px]">
              <h4 className="text-[#3b82f6] text-base font-semibold tracking-wide">
                Navigations
              </h4>
              <ul className="flex flex-col gap-3 text-[#52525b] text-[15px]">
                <li>
                  <Link
                    href="#"
                    className="text-inherit hover:text-gray-300 transition-colors"
                  >
                    Help center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-inherit hover:text-gray-300 transition-colors"
                  >
                    Career library
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-inherit hover:text-gray-300 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="flex flex-col gap-4 min-w-[120px] col-span-2 sm:col-span-1">
              <h4 className="text-[#3b82f6] text-base font-semibold tracking-wide">
                Resources
              </h4>
              <ul className="flex flex-col gap-3 text-[#52525b] text-[15px]">
                <li>
                  <Link
                    href="#"
                    className="text-inherit hover:text-gray-300 transition-colors"
                  >
                    Brand Guideline
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-inherit hover:text-gray-300 transition-colors"
                  >
                    Newsroom
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-white/[0.03] mb-8" />

        {/* Bottom Section: Socials & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Social Icons using Gravity UI Icons */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] text-[#52525b] hover:text-white hover:bg-white/[0.08] transition-all"
            >
              <LogoFacebook width={18} height={18} />
            </a>
            {/* Pinterest/Custom Center Logo replacement */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#3b82f6]/20 text-[#3b82f6] hover:bg-[#3b82f6]/30 transition-all"
            >
              <Compass width={18} height={18} />
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] text-[#52525b] hover:text-white hover:bg-white/[0.08] transition-all"
            >
              <LogoLinkedin width={18} height={18} />
            </a>
          </div>

          {/* Copyright text elements */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-[14px] text-[#3f3f46] text-center sm:text-right">
            <span>Copyright 2024 — Hire Jobs</span>
            <span className="hidden sm:inline text-white/10">|</span>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-inherit hover:text-gray-400 text-[14px]"
              >
                Terms & Policy
              </Link>
              <span>-</span>
              <Link
                href="#"
                className="text-inherit hover:text-gray-400 text-[14px]"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
