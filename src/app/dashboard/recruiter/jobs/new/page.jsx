import React from 'react';
import PostJobForm from './PostJobForm';
import { getRecruiterCompany } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';


const PostJobPage =async () => {
   const user =await getUserSession();
  // console.log(user);
  const company = await getRecruiterCompany(user?.id);
  // console.log("company",company);
  return (
    <div>
      <PostJobForm recruiter={user} recruitercompanies={company} />
    </div>
  );
};

export default PostJobPage;