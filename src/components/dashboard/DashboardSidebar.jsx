
import { getUserSession } from '@/lib/core/session';
import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  Persons,
  Display,
} from '@gravity-ui/icons';
import {Button, Drawer} from "@heroui/react";
import { Bookmark, Briefcase, CreditCard, FileText, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export async function DashboardSidebar() {
  
  const user = await getUserSession();
  
    
   const recruiterNavItems= [
    {icon: House, href: "/dashboard/recruiter", label: "Home"},
    {icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs"},
    {icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post A Job"},
    {icon: Bell, href: "/dashboard/recruiter/company", label: "Company Profile"},
    {icon: Envelope, href: "/dashboard/recruiter/messages", label: "Messages"},
    {icon: Person, href: "/dashboard/recruiter/profile", label: "Profile"},
    {icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings"},
  ];

  const seekerNavItems = [
    {
      icon: LayoutGrid,
      href: '/dashboard/seeker',
      label: 'Dashboard',
    },
    {
      icon: Magnifier,
      href: '/jobs',
      label: 'Jobs',
    },
    {
      icon: Bookmark,
      href: '/dashboard/seeker/saved',
      label: 'Saved Jobs',
    },
    {
      icon: FileText,
      href: '/dashboard/seeker/application',
      label: 'Applications',
    },
    {
      icon: CreditCard,
      href: '/dashboard/seeker/billing',
      label: 'Billing',
    },
    {
      icon: Person,
      href: '/dashboard/seeker/profile',
      label: 'Profile',
    },
    {
      icon: Gear,
      href: '/dashboard/seeker/settings',
      label: 'Settings',
    },
  ];

  const adminNavItems = [
    {
      icon: LayoutGrid,
      href: '/dashboard/admin',
      label: 'Dashboard',
    },
    {
      icon: Persons,
      href: '/dashboard/admin/users',
      label: 'Users',
    },
    {
      icon: Display,
      href: '/dashboard/admin/companies',
      label: 'Companies',
    },
    {
      icon: Briefcase,
      href: '/dashboard/admin/jobs',
      label: 'Jobs',
    },
    {
      icon: CreditCard,
      href: '/dashboard/admin/payments',
      label: 'Payments',
    },
    {
      icon: Gear,
      href: '/dashboard/admin/settings',
      label: 'Settings',
    },
  ];

  const navLinksMapping = {
    recruiter: recruiterNavItems,
    seeker: seekerNavItems,
    admin: adminNavItems,
  };

  const navItems = navLinksMapping[user?.role] || seekerNavItems;
  



  const navItemElements = (
    <nav className="flex flex-col gap-1">
      {navItems.map(item => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-divider p-4">
        {navItemElements}
      </aside>
      <Drawer>
        <Button className="md:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {navItemElements}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}