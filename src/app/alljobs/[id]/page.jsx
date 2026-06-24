import { getJobById } from '@/lib/api/jobsfetch';
import React from 'react';
import JobDetails from './JobDetails';

const page =async ({params}) => {
  const { id } = await params;
  const job = await getJobById(id);

  return (
    <div>
      <JobDetails job={job} />
    </div>
  );
};

export default page;