'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { ProfileDropdown } from './ProfileDropdown';
import Link from 'next/link';



export default function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Array data structure as defined in image_32865b.png
  const navLinks = [
    {
      label: 'Browse Jobs',
      href: '/alljobs',
    },
    {
      label: 'Companies',
      href: '/companies',
    },
    {
      label: 'Pricing',
      href: '/planes',
    },
  ];
  const dashboardLinks = {
    seeker: '/dashboard/seeker',
    recruiter: '/dashboard/recruiter',
    admin: '/dashboard/admin',
  };
  if (user?.email) {
    navLinks.push({
      label: 'Dashboard',
      href: dashboardLinks[user?.role] || '/dashboard/seeker',
    });
  }

  // if (isPending) {
  //   return (
  //     <div className="w-full h-20 bg-[#18191b] border border-white/5 rounded-2xl flex items-center justify-center text-sm text-gray-400">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    // Outer page wrapper mimicking the image layout context
    <div className="w-full bg-[#1c1d1f] p-4 sm:p-6 flex justify-center items-center">
      {/* Main Navbar container styled like a floating pill */}
      <nav className="w-full max-w-7xl border border-white/5 bg-[#18191b] rounded-2xl shadow-2xl backdrop-blur-lg relative">
        <header className="flex h-20 items-center justify-between px-6 sm:px-8">
          {/* Left: Brand/Logo section */}
          <Link
            href="/"
            className="flex items-center gap-1 font-bold text-2xl tracking-tight select-none no-underline"
          >
            <span className="text-[#0091ff]">hire</span>
            <span className="text-[#ff7b00]">jobs</span>
          </Link>

          {/* Desktop Navigation Menu (Hidden on mobile, flexes on md screens) */}
          <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#d1d5db] hover:text-white text-[15px] font-medium transition-colors no-underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Custom Vertical Separator */}
            <li className="h-5 w-[1px] bg-white/10 mx-1" aria-hidden="true" />

            {session ? (
              <div className="flex items-center gap-4">
                <ProfileDropdown session={session} />
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <li>
                  <Link
                    href="/auth/login"
                    className="text-[#6366f1] hover:text-[#4f46e5] text-[15px] font-semibold transition-colors no-underline"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup">
                    <Button
                      radius="lg"
                      className="bg-gradient-to-r from-[#5b42f3] to-[#00d2ff] text-white font-medium px-6 h-11 text-[15px] shadow-[0_0_25px_rgba(91,66,243,0.35)] hover:opacity-90 transition-opacity"
                    >
                      Get Started
                    </Button>
                  </Link>
                </li>
              </div>
            )}
          </ul>

          {/* Mobile Menu Button (Visible only on small devices) */}
          <div className="md:hidden flex items-center">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none p-2 min-w-0 bg-transparent"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <div className="flex items-center gap-4">
                  {session && <ProfileDropdown session={session} />}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
              )}
            </Button>
          </div>
        </header>

        {/* Mobile Dropdown Panel Container */}
        {isOpen && (
          <div className="absolute top-[90px] left-0 right-0 bg-[#18191b] border border-white/5 rounded-2xl p-6 shadow-2xl z-[999] flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-200">
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#d1d5db] hover:text-white text-base font-medium block py-1 no-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Horizontal Line separating main items from actions in mobile list */}
            <hr className="border-white/10 my-0" />

            {session ? (
              <div className="flex items-center gap-4">
                <Button
                  onClick={async () => {
                    await authClient.signOut();
                    window.location.href = '/auth/login';
                    setIsOpen(false);
                  }}
                  color="danger"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <Link
                  href="/auth/login"
                  className="text-[#6366f1] hover:text-[#4f46e5] text-[15px] font-semibold transition-colors no-underline text-center py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    radius="lg"
                    className="w-full bg-gradient-to-r from-[#5b42f3] to-[#00d2ff] text-white font-medium h-11 text-[15px] shadow-[0_0_25px_rgba(91,66,243,0.35)] hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
