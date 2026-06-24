import React from 'react';
import { getCompanies } from '@/lib/api/companies';
import AdminCompaniesTable from './AdminCompaniesTable';


const AdminCompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    <div className="w-full bg-[#090a0b] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Company Moderation
        </h1>
        <p className="text-sm text-[#71717a] mt-1">
          Review, approve, or reject newly registered employer accounts.
        </p>
      </div>

      {/* Render the clean moderation table layout */}
      <AdminCompaniesTable initialCompanies={companies} />
    </div>
  );
};

export default AdminCompaniesPage;
