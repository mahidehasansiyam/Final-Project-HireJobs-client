'use client';

import React, { useState, useMemo } from 'react';
import { Select, ListBox, Input } from '@heroui/react';
import { Magnifier } from '@gravity-ui/icons';
import JobCard from '@/components/JobCard'; // Adjust path if necessary

export default function JobsFilter({ initialJobs = [] }) {
  // 1. Filter States mapped using HeroUI v3 specification values
  const [activeJobType, setActiveJobType] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 2. Client Side Filtering Logic Pipeline
  const filteredJobs = useMemo(() => {
    return initialJobs.filter(job => {
      // Search text match (Title, Company Name, City)
      const matchesSearch =
        !searchQuery ||
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.city?.toLowerCase().includes(searchQuery.toLowerCase());

      // Job Type filter match
      const matchesType =
        activeJobType === 'all' ||
        job.jobType?.toLowerCase() === activeJobType.toLowerCase();

      // Category filter match
      const matchesCategory =
        activeCategory === 'all' ||
        job.category?.toLowerCase() === activeCategory.toLowerCase();

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [initialJobs, searchQuery, activeJobType, activeCategory]);

  return (
    <main className="min-h-screen bg-[#090a0b] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ================= SEARCH & FILTER BAR PANEL ================= */}
        <div className="w-full bg-[#121315] border border-white/[0.06] rounded-2xl p-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Input 1: Search Queries */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-medium text-[#71717a] uppercase tracking-wider">
              Search Jobs
            </label>
            <div className="relative flex items-center w-full">
              <span className="absolute left-4 z-10 text-[#52525b]">
                <Magnifier width={16} height={16} />
              </span>
              <Input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Title, company, or keywords..."
                className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white placeholder-[#52525b] pl-11 pr-4 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Input 2: Job Type Dropdown Select */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-medium text-[#71717a] uppercase tracking-wider">
              Job Type
            </label>
            <Select
              placeholder="All Types"
              selectionMode="single"
              value={activeJobType}
              onChange={val => setActiveJobType(val || 'all')}
              className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white text-sm"
            >
              <Select.Trigger className="w-full h-full px-4 flex items-center justify-between text-left">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="bg-[#18191b] border border-white/10 rounded-xl p-1 text-white">
                  <ListBox.Item
                    id="all"
                    textValue="All Types"
                    className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                  >
                    All Types
                  </ListBox.Item>
                  <ListBox.Item
                    id="full-time"
                    textValue="Full-Time"
                    className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                  >
                    Full-Time
                  </ListBox.Item>
                  <ListBox.Item
                    id="part-time"
                    textValue="Part-Time"
                    className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                  >
                    Part-Time
                  </ListBox.Item>
                  <ListBox.Item
                    id="contract"
                    textValue="Contract"
                    className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                  >
                    Contract
                  </ListBox.Item>
                  <ListBox.Item
                    id="internship"
                    textValue="Internship"
                    className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                  >
                    Internship
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Input 3: Industry Category Select */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-medium text-[#71717a] uppercase tracking-wider">
              Category
            </label>
            <Select
              placeholder="All Categories"
              selectionMode="single"
              value={activeCategory}
              onChange={val => setActiveCategory(val || 'all')}
              className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white text-sm"
            >
              <Select.Trigger className="w-full h-full px-4 flex items-center justify-between text-left">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="bg-[#18191b] border border-white/10 rounded-xl p-1 text-white">
                  <ListBox.Item
                    id="all"
                    textValue="All Categories"
                    className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                  >
                    All Categories
                  </ListBox.Item>
                  <ListBox.Item
                    id="tech"
                    textValue="Technology"
                    className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                  >
                    Technology
                  </ListBox.Item>
                  <ListBox.Item
                    id="design"
                    textValue="Design & UX"
                    className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                  >
                    Design & UX
                  </ListBox.Item>
                  <ListBox.Item
                    id="marketing"
                    textValue="Marketing & Growth"
                    className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                  >
                    Marketing & Growth
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        {/* Counter Info Bar */}
        <div className="mb-6 text-sm text-[#71717a]">
          Showing{' '}
          <span className="text-white font-medium">{filteredJobs.length}</span>{' '}
          positions
        </div>

        {/* ================= JOBS GRID RENDERER ================= */}
        {filteredJobs.length === 0 ? (
          <div className="w-full text-center py-16 bg-[#121315] border border-dashed border-white/10 rounded-2xl text-[#71717a]">
            No jobs found matching your search metrics. Try clearing your
            filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job._id?.$oid || job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
