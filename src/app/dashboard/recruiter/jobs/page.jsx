
import { Table, Chip } from '@heroui/react';
import { Eye, Pencil, Trash2 } from 'lucide-react'; // Lightweight utility icons
import { getCompanyJobs } from '@/lib/api/jobsfetch';
import React from 'react';
import { getLogedInRecruiterCompany } from '@/lib/api/companies';





export default async function JobsDashboardTable() {

  
  const company = await getLogedInRecruiterCompany();

  if (!company || company.length === 0) {
    return (
      <div className="w-full bg-[#090a0b] p-8 flex justify-center items-center min-h-screen">
        <p className="text-[#71717a] text-sm">No company found. Please register a company first.</p>
      </div>
    );
  }

  const jobs = await getCompanyJobs(company[0]._id);
  // console.log(jobs);


  // Human-readable mapping objects
  const categoryLabels = {
    tech: 'Technology',
    design: 'Design & UX',
    marketing: 'Marketing & Growth',
  };

  const typeLabels = {
    'full-time': 'Full-Time',
    'part-time': 'Part-Time',
    contract: 'Contract',
    internship: 'Internship',
  };
  return (
    <div className="w-full bg-[#090a0b] p-8 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-5xl bg-[#121315] rounded-xl border border-white/[0.06] p-2">
        <Table aria-label="Job Postings Dashboard">
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Active job list openings"
              className="min-w-[600px]"
            >
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="bg-transparent text-[#71717a] font-medium py-4 px-6 text-xs"
                >
                  Job Title
                </Table.Column>
                <Table.Column className="bg-transparent text-[#71717a] font-medium py-4 px-6 text-xs">
                  Type / Category
                </Table.Column>
                <Table.Column className="bg-transparent text-[#71717a] font-medium py-4 px-6 text-xs">
                  Location
                </Table.Column>
                <Table.Column className="bg-transparent text-[#71717a] font-medium py-4 px-6 text-xs">
                  Status
                </Table.Column>
                <Table.Column className="bg-transparent text-[#71717a] font-medium py-4 px-6 text-xs text-right">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {jobs.map(job => (
                  <Table.Row
                    key={job._id}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors last:border-none"
                  >
                    {/* 1. Job Title */}
                    <Table.Cell className="py-5 px-6 text-white font-medium text-sm">
                      {job.title}
                    </Table.Cell>

                    {/* 2. Type / Category stacked layout */}
                    <Table.Cell className="py-5 px-6">
                      <div className="flex flex-col">
                        <span className="text-white font-semibold text-sm">
                          {typeLabels[job.jobType] || job.jobType}
                        </span>
                        <span className="text-[#71717a] text-xs mt-0.5">
                          {categoryLabels[job.category] || job.category}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* 3. Location */}
                    <Table.Cell className="py-5 px-6 text-gray-300 text-sm">
                      {job.city}
                    </Table.Cell>

                    {/* 4. Pill Status component */}
                    <Table.Cell className="py-5 px-6">
                      <Chip
                        variant="flat"
                        className="bg-[#142e1b] text-[#4ade80] font-medium text-xs border border-[#22c55e]/20 px-2 h-6 capitalize"
                      >
                        {job.status}
                      </Chip>
                    </Table.Cell>

                    {/* 5. Row action triggers aligned right matching image_5555c0.png */}
                    <Table.Cell className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label="View opening details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label="Edit opening options"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          className="text-[#ef4444] hover:text-[#f87171] transition-colors"
                          aria-label="Remove opening"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}
