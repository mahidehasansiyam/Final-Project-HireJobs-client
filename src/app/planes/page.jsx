'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import {
  Check,
  ThunderboltFill,
  Flame,
  CrownDiamond,
  Briefcase,
  Plus,
} from '@gravity-ui/icons';
import Link from 'next/link';

export default function Pricing() {
  // Toggle tab state between 'seeker' and 'recruiter'
  const [activeRole, setActiveRole] = useState('seeker');

  const seekerPlans = [
    {
      name: 'Free',
      id:"seeker-free",
      price: '$0',
      period: '/forever',
      description:
        'Essential features for getting started and organizing your initial search tracking.',
      icon: <Briefcase className="text-[#71717a]" width={18} height={18} />,
      features: [
        'Browse & save up to 10 jobs',
        'Apply to up to 3 jobs per month',
        'Basic profile page',
        'Standard email alerts',
      ],
      buttonText: 'Get Started',
      isPopular: false,
    },
    {
      name: 'Pro',
      id: "seeker-pro",
      price: '$19',
      period: '/month',
      description:
        'Our most popular option for serious active candidates looking to rapidly accelerate landing a role.',
      icon: <Flame className="text-[#3b82f6]" width={18} height={18} />,
      features: [
        'Apply to up to 30 jobs per month',
        'Unlimited saved jobs',
        'Advanced application tracking dashboard',
        'Comprehensive salary insights',
      ],
      buttonText: 'Upgrade to Pro',
      isPopular: true,
    },
    {
      name: 'Premium',
      id: "seeker-premium",
      price: '$39',
      period: '/month',
      description:
        'Uncapped potential and priority visibility tools tailored for elite competitive talent placement.',
      icon: <CrownDiamond className="text-[#a855f7]" width={18} height={18} />,
      features: [
        'Everything in Pro + Unlimited applications',
        'Profile boost directly to recruiter feeds',
        'Early access to freshly published jobs',
        '24/7 Priority customer support queue',
      ],
      buttonText: 'Go Premium',
      isPopular: false,
    },
  ];

  const recruiterPlans = [
    {
      name: 'Free',
      id: "recruiter-free",
      price: '$0',
      period: '/forever',
      description:
        'Essential baseline tools to post occasional operational listings and review talent pipelines.',
      icon: <Briefcase className="text-[#71717a]" width={18} height={18} />,
      features: [
        'Up to 3 active job posts',
        'Standard search indexing visibility',
        'Basic applicant management tools',
        'Standard web dashboard pipeline',
      ],
      buttonText: 'Start Free Posting',
      isPopular: false,
    },
    {
      name: 'Growth',
      id: "recruiter-growth",
      price: '$49',
      period: '/month',
      description:
        'Optimized for scaling teams seeking stable access to continuous qualified applicant routing panels.',
      icon: <ThunderboltFill className="text-[#3b82f6]" width={18} height={18} />,
      features: [
        'Up to 10 active job posts',
        'Basic conversion metrics & analytics',
        'Full applicant tracking panel (ATS)',
        'Standard email customer support desk',
      ],
      buttonText: 'Scale Recruiting',
      isPopular: true,
    },
    {
      name: 'Enterprise',
      id: "recruiter-enterprise",
      price: '$149',
      period: '/month',
      description:
        'High-volume structural engine built for enterprise agencies demanding total workflow customization.',
      icon: <CrownDiamond className="text-[#a855f7]" width={18} height={18} />,
      features: [
        'Up to 50 active job posts concurrently',
        'Advanced deep-dive data visual analytics',
        'Featured listings placement premium boosts',
        'Team collaboration, branding, & priority support',
      ],
      buttonText: 'Unlock Enterprise',
      isPopular: false,
    },
  ];

  const activePlans = activeRole === 'seeker' ? seekerPlans : recruiterPlans;

  return (
    <main className="min-h-screen bg-[#090a0b] text-white py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* ================= SECTION TITLE HEADER ================= */}
        <header className="text-center max-w-3xl flex flex-col items-center gap-2 mb-12">
          <span className="text-[10px] text-[#3b82f6] uppercase font-bold tracking-widest bg-[#3b82f6]/10 px-3 py-1 rounded-full border border-[#3b82f6]/20">
            Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-3">
            Flexible plans tailored to your goals
          </h1>
          <p className="text-sm sm:text-base text-[#71717a] mt-2 max-w-xl leading-relaxed">
            Whether you are an ambitious job seeker hunting for your next
            milestone or an expanding operation tracking down pristine talent,
            we have got you covered.
          </p>
        </header>

        {/* ================= ROLE SEGMENT SWITCHER TAB ================= */}
        <div className="bg-[#121315] border border-white/[0.06] p-1.5 rounded-2xl flex items-center gap-1 mb-16 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveRole('seeker')}
            className={`flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all ${
              activeRole === 'seeker'
                ? 'bg-[#18191b] text-white border border-white/[0.06] shadow-md'
                : 'text-[#71717a] hover:text-white bg-transparent'
            }`}
          >
            <span className="text-sm">👤</span> For Job Seekers
          </button>
          <button
            type="button"
            onClick={() => setActiveRole('recruiter')}
            className={`flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all ${
              activeRole === 'recruiter'
                ? 'bg-[#18191b] text-white border border-white/[0.06] shadow-md'
                : 'text-[#71717a] hover:text-white bg-transparent'
            }`}
          >
            <span className="text-sm">💼</span> For Recruiters
          </button>
        </div>

        {/* ================= PRICING CARDS ARCHITECTURE GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch">
          {activePlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-[#121315] border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all shadow-xl hover:translate-y-[-4px] ${
                plan.isPopular
                  ? 'border-[#2563eb] shadow-blue-950/20 shadow-2xl ring-1 ring-[#2563eb]/40'
                  : 'border-white/[0.06]'
              }`}
            >
              {/* Highlight Badge for Popular Tier Option */}
              {plan.isPopular && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2563eb] text-white text-[9px] font-bold tracking-widest uppercase py-1 px-3.5 rounded-full shadow-md shadow-blue-600/20">
                  Most Popular
                </span>
              )}

              {/* Top Configuration Wrapper */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {plan.name}
                  </h3>
                  <div className="w-9 h-9 rounded-xl bg-[#18191b] border border-white/[0.06] flex items-center justify-center shadow-inner">
                    {plan.icon}
                  </div>
                </div>

                <p className="text-xs text-[#71717a] min-h-[40px] leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Price Display Block */}
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[#52525b] font-medium">
                    {plan.period}
                  </span>
                </div>

                <hr className="border-white/[0.06] mb-6" />

                {/* Features Checklist Panel */}
                <ul className="flex flex-col gap-3.5 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-3 text-xs text-[#a1a1aa] leading-relaxed"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] mt-0.5 shrink-0">
                        <Check width={10} height={10} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lower Conversion Call To Action Trigger */}
              <form action="/api/checkout_sessions" method="POST">
                {/* Hidden input for plan ID */}
                <input type="hidden" name="plan_id" value={plan.id} /> 
                <section>
                  <button
                    className={`w-full h-11 rounded-xl text-xs font-semibold transition-all shadow-md ${
                      plan.isPopular
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-blue-900/30'
                        : 'bg-[#18191b] hover:bg-white/5 text-white border border-white/10'
                    }`}
                    type="submit"
                    role="link"
                  >
                    Checkout
                  </button>
                </section>
              </form>
             
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
