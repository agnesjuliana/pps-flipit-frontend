'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/styles/utils';

type TBottomNavigationProps = {
  items: { route: string; icon: JSX.Element }[];
};

const BottomNavigation = ({ items }: TBottomNavigationProps) => {
  const pathname = usePathname();

  const checkActive = (route: string) => pathname === route;

  const isShowNav = items.some((val) => checkActive(val.route));

  if (isShowNav) {
    return (
      <div className="absolute bottom-0 z-50 w-full border-t bg-white pb-[14px]">
        <div className="flex w-full items-center justify-center p-[10px]">
          {items.map((item, i) => (
            <div key={i as number} className="flex-1">
              <div
                className={cn(
                  'mx-auto w-10 rounded-xl p-2 text-gray-500',
                  checkActive(item.route) &&
                    'bg-brand-base-light !text-brand-base'
                )}
              >
                <Link href={item.route}>{item.icon}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default BottomNavigation;
