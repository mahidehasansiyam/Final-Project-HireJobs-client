import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { Briefcase, ArrowUpRight } from '@gravity-ui/icons';
import { getApplicationsByApplicantId } from '@/lib/api/application';
import { getUserSession } from '@/lib/core/session';

// Helper function to format MongoDB timestamps into relative time strings
function formatRelativeTime(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;

  const elapsed = now - past;

  if (elapsed < msPerMinute) return 'Just now';
  if (elapsed < msPerHour) return `${Math.round(elapsed / msPerMinute)}m ago`;
  if (elapsed < msPerDay) return `${Math.round(elapsed / msPerHour)} hours ago`;
  if (elapsed < msPerWeek) return `${Math.round(elapsed / msPerDay)} days ago`;

  const weeks = Math.round(elapsed / msPerWeek);
  return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
}

// Helper to render dynamic status styling to accurately match the image badges
function renderStatusBadge(status = 'Applied') {
  const normalized = status.toLowerCase();

  const styles = {
    applied: 'border-white/20 text-white bg-white/5',
    review: 'border-amber-500/30 text-amber-500 bg-amber-500/5',
    shortlisted: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5',
    rejected: 'border-rose-500/30 text-rose-500 bg-rose-500/5',
    offered: 'border-violet-500/30 text-violet-500 bg-violet-500/5',
  };

  const currentStyle = styles[normalized] || styles.applied;

  return (
    <span
      className={`px-3 py-1 rounded-full border text-xs font-semibold select-none capitalize ${currentStyle}`}
    >
      {status}
    </span>
  );
}

const SeekerApplications = async () => {
  const user = await getUserSession();
  const jobs = await getApplicationsByApplicantId(user.id);
  

  return (
    <div className="w-full bg-[#090a0b] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-white">
      <h2 className="my-2">Total Applications = {jobs.length}</h2>
      <div className="max-w-7xl mx-auto">
        {/* Table Wrapper Fluid Card container */}
        <div className="bg-[#121315] border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              {/* Header Definitions */}
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#161719]/50">
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Company
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Data Node Traversal */}
              <tbody className="divide-y divide-white/[0.04]">
                {jobs && jobs.length > 0 ? (
                  jobs.map(app => (
                    <tr
                      key={app._id}
                      className="hover:bg-white/[0.01] transition-colors group"
                    >
                      {/* Column 1: Job Title Identity */}
                      <td className="py-5 px-6 flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#18191b] border border-white/[0.06] rounded-xl flex items-center justify-center text-[#a1a1aa] group-hover:text-white transition-colors shrink-0">
                          <Briefcase width={18} height={18} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold text-white group-hover:text-[#0091ff] transition-colors">
                            {app.jobTitle || 'Lead Software Engineer'}
                          </span>
                          <span className="text-xs text-[#71717a]">
                            Full-time • Remote
                          </span>
                        </div>
                      </td>

                      {/* Column 2: Managing Organization Name */}
                      <td className="py-5 px-6 text-sm font-medium text-white/90">
                        {app.companyName || 'Adobe'}
                      </td>

                      {/* Column 3: Relative Time Elapsed Duration */}
                      <td className="py-5 px-6 text-sm text-[#a1a1aa]">
                        {app.createdTime
                          ? formatRelativeTime(app.createdTime)
                          : '2 hours ago'}
                      </td>

                      {/* Column 4: Dynamic Status Verification Badges */}
                      <td className="py-5 px-6">
                        {renderStatusBadge(app.status || 'Applied')}
                      </td> 

                      {/* Column 5: Explicit Context Link Target Routes */}
                      <td className="py-5 px-6 text-right">
                        <Link href={`/jobs/${app.jobId}`}>
                          <Button
                            size="sm"
                            variant="light"
                            className="text-xs font-semibold text-[#71717a] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl px-4 transition-all"
                            endContent={<ArrowUpRight width={13} height={13} />}
                          >
                            Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  /* Zero State Fallback Presentation Matrix */
                  <tr>
                    <td
                      colSpan={5}
                      className="py-20 text-center text-sm text-[#71717a]"
                    >
                      No active submissions found. Explore open openings to
                      apply.
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
};

export default SeekerApplications;
