import React from 'react';
import { Button } from '@heroui/react';
import { CreditCard } from '@gravity-ui/icons';

export default function AdminPaymentsPage() {
  return (
    <div className="w-full bg-[#090a0b] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Payments & Billing
            </h1>
            <p className="text-sm text-[#71717a]">
              Track subscriptions, revenue, and transaction history.
            </p>
          </div>
          <Button radius="lg" className="bg-[#5b42f3] text-white">
            Download Report
          </Button>
        </div>

        {/* Placeholder Content */}
        <div className="w-full bg-[#18191b] border border-white/5 rounded-2xl p-16 flex flex-col items-center justify-center gap-4 mt-6">
          <div className="p-4 bg-white/5 rounded-full">
            <CreditCard width={40} height={40} className="text-[#a1a1aa]" />
          </div>
          <h2 className="text-xl text-white font-medium">Payments Center Coming Soon</h2>
          <p className="text-[#71717a] text-center max-w-md">
            The data table for transactions is currently being constructed. Check back soon for the full feature.
          </p>
        </div>

      </div>
    </div>
  );
}
