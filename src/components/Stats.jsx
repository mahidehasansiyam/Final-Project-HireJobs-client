'use client';

import React from 'react';
import Image from 'next/image';
import { Briefcase, Layers, Person, Star } from '@gravity-ui/icons';
import Hero from './Hero';

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      icon: <Briefcase className="text-gray-400" width={22} height={22} />,
      value: '50K',
      label: 'Active Jobs',
    },
    {
      id: 2,
      icon: <Layers className="text-gray-400" width={22} height={22} />,
      value: '12K',
      label: 'Companies',
    },
    {
      id: 3,
      icon: <Person className="text-gray-400" width={22} height={22} />,
      value: '2M',
      label: 'Job Seekers',
    },
    {
      id: 4,
      icon: <Star className="text-gray-400" width={22} height={22} />,
      value: '97%',
      label: 'Satisfication Rate',
    },
  ];

  return (
    <section className="w-full bg-[#050506] text-white py-24 px-6 sm:px-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[750px]">
      {/* FULL SECTION BACKGROUND LAYER */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        {/* Globe Image stretched/positioned to cover the section background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full opacity-60">
          <Image
            src="/images/globe.png"
            alt="Globe Background"
            fill
            priority
            className="object-top object-cover scale-125 sm:scale-110"
          />
        </div>
        {/* Ambient Top Aurora Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[60%] bg-blue-600/20 blur-[130px] rounded-full" />
      </div>

      <Hero/>

      {/* FOREGROUND CONTENT LAYER */}
      <div className="max-w-7xl w-full flex flex-col items-center justify-between h-full relative z-10 gap-16">
        {/* Top: Heading text sits comfortably over the globe curve */}
        <div className="text-center px-4 max-w-3xl mt-4">
          <h2 className="text-2xl sm:text-4xl font-normal tracking-tight leading-relaxed text-gray-200">
            Assisting over{' '}
            <span className="font-semibold text-white">15,000 job seekers</span>{' '}
            <br className="hidden sm:inline" />
            find their dream positions.
          </h2>
        </div>

        {/* Bottom: Floating Grid Cards sitting on top of the lower background field */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {stats.map(stat => (
            <div
              key={stat.id}
              className="bg-white/[0.03] backdrop-blur-md border border-white/[0.04] hover:border-white/[0.08] rounded-2xl p-6 flex flex-col gap-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] transition-all duration-300"
            >
              {/* Icon Holder */}
              <div className="w-6 h-6 flex items-center justify-center">
                {stat.icon}
              </div>

              {/* Data Content */}
              <div className="flex flex-col gap-1">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  {stat.value}
                </span>
                <span className="text-sm text-[#71717a] font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
