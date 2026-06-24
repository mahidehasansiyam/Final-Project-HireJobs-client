
import React from 'react';
import JobCard from '@/components/JobCard'; // Adjust path based on your structure
import { getAllJobs } from '@/lib/api/jobsfetch';
import JobsFilter from '@/components/JobsFilter';



export default async function AllJobs() {
 
  const jobs = await getAllJobs();

  return (
    <main className="min-h-screen bg-[#090a0b] py-12 px-6">
      <JobsFilter initialJobs={jobs} />
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Available Openings
          </h1>
          <p className="text-[#71717a] text-sm mt-1">
            Explore current opportunities on HireLoop.
          </p>
        </header>

        {jobs.length === 0 ? (
          <div className="text-center py-12 text-[#71717a] border border-dashed border-white/10 rounded-2xl">
            No active job postings found.
          </div>
        ) : (
          /* Grid Layout container matching the card sizes */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobCard key={job._id?.$oid || job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
