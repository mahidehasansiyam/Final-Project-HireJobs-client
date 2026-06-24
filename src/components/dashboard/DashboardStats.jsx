'use client';

import React from 'react';
import { Card } from '@heroui/react';

/**
 * DashboardStats Component
 * @param {Array} items - Array of stat objects: { title, value, icon: ReactComponent }
 */
export default function DashboardStats({ items = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full p-4 ">
      {items.map((item, index) => {
        const IconComponent = item.icon;

        return (
          <Card
            key={index}
            className="bg-[#121315] border border-white/[0.04] rounded-xl shadow-md p-5 flex flex-col gap-4"
          >
            {/* Icon Container Badge matching image_72f3ef.png */}
            <div className="w-9 h-9 bg-white/[0.06] rounded-lg flex items-center justify-center text-white/80 w-fit">
              {IconComponent && (
                <IconComponent
                  aria-label={`${item.title} icon`}
                  className="size-[18px]"
                  role="img"
                />
              )}
            </div>

            {/* Typography Stack utilizing the requested Card subcomponents */}
            <Card.Header className="p-0 flex flex-col gap-1.5 items-start">
              <Card.Description className="text-[11px] sm:text-xs text-[#71717a] font-medium tracking-wide m-0">
                {item.title}
              </Card.Description>
              <Card.Title className="text-xl sm:text-2xl font-semibold text-white tracking-tight m-0">
                {item.value}
              </Card.Title>
            </Card.Header>
          </Card>
        );
      })}
    </div>
  );
}
