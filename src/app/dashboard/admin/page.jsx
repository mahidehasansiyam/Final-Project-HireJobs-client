import React from 'react';
import { Persons, Briefcase, Display, CreditCard } from '@gravity-ui/icons';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-[#18191b] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col gap-4 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-50 transition-opacity group-hover:opacity-100" />
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <p className="text-[#a1a1aa] text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
        <Icon width={24} height={24} className="text-[#00d2ff]" />
      </div>
    </div>
    {trend && (
      <div className="text-xs font-medium mt-2">
        <span className={trend > 0 ? "text-success" : "text-danger"}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-[#71717a] ml-2">vs last month</span>
      </div>
    )}
  </div>
);

export default function AdminDashboardHome() {
  return (
    <div className="w-full bg-[#090a0b] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#a1a1aa]">
            Admin Overview
          </h1>
          <p className="text-sm text-[#71717a]">
            Welcome back to the HireLoop central command.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value="12,492" icon={Persons} trend={12.5} />
          <StatCard title="Active Jobs" value="3,841" icon={Briefcase} trend={8.2} />
          <StatCard title="Companies" value="842" icon={Display} trend={15.3} />
          <StatCard title="Monthly Revenue" value="$42,890" icon={CreditCard} trend={24.1} />
        </div>

        {/* Recent Activity Section */}
        <div className="bg-[#18191b] border border-white/5 rounded-2xl shadow-xl p-8 mt-4">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Platform Activity</h2>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                <div className="w-2 h-2 rounded-full bg-[#00d2ff]" />
                <div className="flex-grow">
                  <p className="text-sm text-white font-medium">New company registered</p>
                  <p className="text-xs text-[#71717a]">TechCorp Inc. just created an employer account.</p>
                </div>
                <span className="text-xs text-[#52525b]">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}