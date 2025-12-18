'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChartBig, BookOpen, Home, User } from 'lucide-react';

import { cn } from '@/lib/styles/utils';

const items = [
  {
    route: '/app/home',
    icon: <Home />,
    label: 'Home',
  },
  {
    route: '/app/folder',
    icon: <BookOpen />,
    label: 'Folder',
  },
  {
    route: '/app/activity',
    icon: <BarChartBig />,
    label: 'Activity',
  },
  {
    route: '/app/profile',
    icon: <User />,
    label: 'Profile',
  },
];

const DesktopNavigation = () => {
  const pathname = usePathname();

  const checkActive = (route: string) => pathname === route;

  const isShowNav = items.some((val) => checkActive(val.route));

  if (isShowNav) {
    return (
      <nav className="hidden w-full border-b bg-white shadow-sm md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <div className="text-2xl font-bold text-brand-base">Flip It</div>
          <div className="flex items-center gap-1">
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.route}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-brand-base-light hover:text-brand-base',
                  checkActive(item.route) &&
                    'bg-brand-base-light text-brand-base font-semibold'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return null;
};

export default DesktopNavigation;
