import React from 'react';
import { Button, Avatar, Chip } from '@heroui/react';
import { getAllUsers } from '@/lib/api/users';

function formatLocalDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="w-full bg-[#090a0b] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              User Management
            </h1>
            <p className="text-sm text-[#71717a]">
              Manage job seekers, recruiters, and administrators.
            </p>
          </div>
          <Button radius="lg" className="bg-[#5b42f3] text-white font-medium">
            Add New User
          </Button>
        </div>

        {/* Data Table */}
        <div className="bg-[#121315] border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden mt-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#161719]/50">
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    User
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Role
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Joined Date
                  </th>
                  <th className="py-5 px-6 text-xs font-semibold text-[#71717a] uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {users && users.length > 0 ? (
                  users.map(user => (
                    <tr
                      key={user._id || user.id}
                      className="hover:bg-white/[0.01] transition-colors group"
                    >
                      {/* Identity logo + name */}
                      <td className="py-5 px-6 flex items-center gap-3">
                        <Avatar
                          src={user.image}
                          name={user.name?.substring(0, 2).toUpperCase()}
                          radius="md"
                          size="sm"
                          className="bg-[#18191b] border border-white/10 text-xs font-bold text-white tracking-wider"
                        />
                        <span className="text-sm font-semibold text-white">
                          {user.name || 'Anonymous User'}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="py-5 px-6 text-sm text-[#a1a1aa] font-mono text-xs">
                        {user.email || 'N/A'}
                      </td>

                      {/* Role */}
                      <td className="py-5 px-6">
                        <span className="px-2.5 py-1 rounded-md bg-[#5b42f3]/10 text-[#5b42f3] border border-[#5b42f3]/20 text-[11px] font-bold tracking-wide uppercase">
                          {user.role || 'SEEKER'}
                        </span>
                      </td>

                      {/* Plan */}
                      <td className="py-5 px-6">
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[11px] font-medium text-[#a1a1aa]">
                          {user.plan || 'Free'}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-5 px-6 text-sm text-[#a1a1aa]">
                        {formatLocalDate(user.createdAt || user.createdTime)}
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-right">
                        <Button
                          size="sm"
                          variant="flat"
                          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs font-semibold px-4 h-8 min-w-0 transition-all"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-16 text-center text-sm text-[#71717a]"
                    >
                      No users found.
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
}
