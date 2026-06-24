import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPage =async () => {
  const user =await getUserSession();
  // console.log(user);
  const company = await getRecruiterCompany(user?.id);
  // console.log("company",company);
  return (
    <div>
      <CompanyProfile recruiter={user} recruitercompany={company} ></CompanyProfile>
    </div>
  );
};

export default CompanyPage;