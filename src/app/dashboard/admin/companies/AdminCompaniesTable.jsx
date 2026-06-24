'use client';

import React, { useState } from 'react';
import { Button, Avatar } from '@heroui/react';
import { updateCompany } from '@/lib/actions/company';
import { toast } from 'react-toastify';

function formatLocalDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export default function AdminCompaniesTable({ initialCompanies = [] }) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [processingId, setProcessingId] = useState(null);

  const handleUpdateStatus = async (id, newStatus) => {
    setProcessingId(`${id}-${newStatus}`);
    
    try {
      // API call to update status in MongoDB database can be hooked here:
      // await updateCompanyStatus(id, newStatus);
      const result = await updateCompany(id, { status: newStatus })
      console.log(result);
      if (result.modifiedCount) {
        // alert('Status change');
        
      }
      // console.log(result);

      setCompanies(prev =>
        prev.map(c => (c._id === id ? { ...c, status: newStatus } : c)),
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const renderStatus = (status = 'pending') => {
    const norm = status.toLowerCase();
    if (norm === 'approved') {
      return (
        <span className="flex items-center gap-2 text-xs font-semibold text-[#10b981]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
          Approved
        </span>
      );
    }
    if (norm === 'rejected') {
      return (
        <span className="flex items-center gap-2 text-xs font-semibold text-[#ef4444]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
          Rejected
        </span>
      );
    }
    return (
      <span className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
        Pending
      </span>
    );
  };

  return (
    <div className="bg-[#121315] border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.06] bg-[#161719]/50">
              <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                Company Name
              </th>
              <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                Recruiter Email
              </th>
              <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                Job Count
              </th>
              <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                Location
              </th>
              <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                Status
              </th>
              <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                Date Submitted
              </th>
              <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {companies.length > 0 ? (
              companies.map(company => {
                const isPending = company.status?.toLowerCase() === 'pending';
                const isApproved = company.status?.toLowerCase() === 'approved';
                const isRejected = company.status?.toLowerCase() === 'rejected';

                return (
                  <tr
                    key={company._id}
                    className="hover:bg-white/[0.01] transition-colors group"
                  >
                    {/* Company Identity logo + name */}
                    <td className="py-5 px-6 flex items-center gap-3">
                      <Avatar
                        src={company.logo}
                        name={company.name?.substring(0, 2).toUpperCase()}
                        radius="md"
                        size="sm"
                        className="bg-[#18191b] border border-white/10 text-xs font-bold text-white tracking-wider"
                      />
                      <span className="text-sm font-semibold text-white">
                        {company.name || 'Anonymous Company'}
                      </span>
                    </td>

                    {/* Recruiter Identity info row */}
                    <td className="py-5 px-6 text-sm text-[#a1a1aa] font-mono text-xs">
                      {company.recruiterEmail || 'N/A'}
                    </td>

                    {/* Job Count */}
                    <td className="py-5 px-6">
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[11px] font-medium text-[#a1a1aa]">
                        {company.jobcount || 0}
                      </span>
                    </td>
                    {/* Location Badge field */}
                    <td className="py-5 px-6">
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[11px] font-medium text-[#a1a1aa]">
                        {company.location || 'Remote'}
                      </span>
                    </td>

                    {/* Custom status colored dots row */}
                    <td className="py-5 px-6">
                      {renderStatus(company.status)}
                    </td>

                    {/* Date formatting output row */}
                    <td className="py-5 px-6 text-sm text-[#a1a1aa]">
                      {formatLocalDate(company.createdTime)}
                    </td>

                    {/* Contextual verification controls toggles */}
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        {(isPending || isRejected) && (
                          <Button
                            size="sm"
                            variant="flat"
                            isLoading={
                              processingId === `${company._id}-approved`
                            }
                            onClick={() =>
                              handleUpdateStatus(company._id, 'approved')
                            }
                            className="bg-[#10b981]/10 hover:bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/20 rounded-lg text-xs font-semibold px-4 h-8 min-w-0 transition-all"
                          >
                            Approve
                          </Button>
                        )}
                        {(isPending || isApproved) && (
                          <Button
                            size="sm"
                            variant="flat"
                            isLoading={
                              processingId === `${company._id}-rejected`
                            }
                            onClick={() =>
                              handleUpdateStatus(company._id, 'rejected')
                            }
                            className="bg-[#ef4444]/10 hover:bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/20 rounded-lg text-xs font-semibold px-4 h-8 min-w-0 transition-all"
                          >
                            Reject
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-16 text-center text-sm text-[#71717a]"
                >
                  No organizational accounts loaded for moderation tracking.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
