import React from 'react';
import { Button, Chip } from '@heroui/react';
import { getAllJobs } from '@/lib/api/jobsfetch';

function formatLocalDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export default async function AdminJobsPage() {
  const jobs = await getAllJobs();

  return (
    <div className="w-full bg-[#090a0b] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Job Listings
            </h1>
            <p className="text-sm text-[#71717a]">
              Monitor all job postings on the platform.
            </p>
          </div>
          <Button radius="lg" className="bg-[#5b42f3] text-white font-medium">
            Export Jobs
          </Button>
        </div>

        {/* Data Table */}
        <div className="bg-[#121315] border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden mt-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#161719]/50">
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Company
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Location
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Posted Date
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {jobs && jobs.length > 0 ? (
                  jobs.map(job => (
                    <tr
                      key={job._id}
                      className="hover:bg-white/[0.01] transition-colors group"
                    >
                      {/* Job Title */}
                      <td className="py-5 px-6">
                        <span className="text-sm font-semibold text-white">
                          {job.title || 'Untitled Job'}
                        </span>
                      </td>

                      {/* Company Name */}
                      <td className="py-5 px-6 text-sm text-[#a1a1aa]">
                        {job.companyName || job.companyId || 'N/A'}
                      </td>

                      {/* Location */}
                      <td className="py-5 px-6">
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[11px] font-medium text-[#a1a1aa]">
                          {job.location || 'Remote'}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="py-5 px-6">
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[11px] font-medium text-[#a1a1aa]">
                          {job.jobType || job.type || 'Full-Time'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6">
                        <span className="flex items-center gap-2 text-xs font-semibold text-[#10b981]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                          {job.status || 'Active'}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-5 px-6 text-sm text-[#a1a1aa]">
                        {formatLocalDate(job.createdTime)}
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-right">
                        <Button
                          size="sm"
                          variant="flat"
                          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs font-semibold px-4 h-8 min-w-0 transition-all"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-16 text-center text-sm text-[#71717a]"
                    >
                      No job postings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
