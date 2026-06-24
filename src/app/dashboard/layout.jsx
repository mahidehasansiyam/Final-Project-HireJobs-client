import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar/>
      <main className="flex-1 p-3">{children}</main>
    </div>
  );
};

export default DashboardLayout;