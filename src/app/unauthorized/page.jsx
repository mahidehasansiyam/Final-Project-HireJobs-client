import React from 'react';
import { Button } from '@heroui/react';
import { ShieldExclamation, ArrowLeft, ShieldKeyhole } from '@gravity-ui/icons';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-[#090a0b] text-white py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-[#121315] border border-white/[0.06] rounded-2xl p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
        {/* Subtle Ambient Crimson/Red Radial Glow for Warning */}
        <div className="absolute -top-24 w-72 h-72 bg-[#ef4444]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Security Shield Lock Icon Container */}
        <div className="w-16 h-16 rounded-2xl bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center text-[#ef4444] mb-6 shadow-lg shadow-[#ef4444]/5">
          <ShieldKeyhole width={28} height={28} />
        </div>

        {/* Header Content */}
        <header className="flex flex-col gap-2 mb-8">
          <span className="text-[10px] text-[#ef4444] uppercase font-bold tracking-widest bg-[#ef4444]/10 px-3 py-1 rounded-full border border-[#ef4444]/20 w-fit mx-auto">
            401 - Access Denied
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-3">
            Halt! Protected Space
          </h1>
          <p className="text-sm text-[#71717a] max-w-sm mx-auto leading-relaxed mt-1">
            You do not have permission to view this directory. Your current role
            clearance levels do not match this endpoint configuration.
          </p>
        </header>

        <hr className="w-full border-white/[0.06] mb-8" />

        {/* Informative Guidance Panel */}
        <div className="w-full bg-[#18191b] border border-white/[0.04] rounded-xl p-4 flex items-start gap-4 text-left shadow-inner mb-8">
          <div className="text-[#71717a] bg-[#090a0b] p-2 rounded-lg border border-white/[0.04] shrink-0 mt-0.5">
            <ShieldExclamation width={16} height={16} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-semibold text-[#52525b] uppercase tracking-wider">
              Why am I seeing this?
            </span>
            <span className="text-xs text-[#a1a1aa] leading-relaxed">
              You might be trying to access a Recruiter panel using a Job Seeker
              profile, or your login session may have timed out. Try switching
              accounts or re-authenticating.
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-3.5">
          <Link href="/" className="w-full sm:w-1/2">
            <Button
              variant="flat"
              className="w-full bg-[#18191b] hover:bg-white/5 text-white border border-white/10 font-semibold text-sm h-12 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft width={16} height={16} />
              Back to Safety
            </Button>
          </Link>

          <Link href="/auth/login" className="w-full sm:w-1/2">
            <Button className="w-full bg-white hover:bg-white/90 text-black font-semibold text-sm h-12 rounded-xl transition-all shadow-lg shadow-white/5">
              Sign In / Re-authenticate
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
