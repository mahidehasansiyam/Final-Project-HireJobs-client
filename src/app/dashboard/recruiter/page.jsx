"use client";
import { authClient } from '@/lib/auth-client';
import React from 'react';
import {
  Briefcase,
  Persons,
  Flame,
  CircleCheck,
  ShieldCheck,
  Users3,
  CircleDollar,
  Gear,
} from '@gravity-ui/icons';
import DashboardStats from '@/components/dashboard/DashboardStats';


const RecruiterHomePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  // console.log(user);
  if (isPending) {
    return <div>Loading...</div>;
  }
  // user dumy stats for now, will be fetched from backend in future
  const userStats = [
    { title: 'Applications Sent', value: '10', icon: Briefcase },
    { title: 'Interviews Booked', value: '5', icon: Flame },
    { title: 'Offers Documented', value: '3', icon: CircleCheck },
    { title: 'Profile Headcount Views', value: '112', icon: Persons },
  ];
  return (
    <div>
      <h2>Welcome, {user?.name || user?.email}!</h2>
      <DashboardStats items={userStats} />
    </div>
  );
};

export default RecruiterHomePage;