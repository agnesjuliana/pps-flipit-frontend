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
      <div className="fixed bottom-0 left-0 right-0 z-50 w-full border-t bg-white pb-3 shadow-lg sm:pb-4">
        <div className="mx-auto flex w-full max-w-md items-center justify-center p-2 sm:p-3">
          {items.map((item, i) => (
            <div key={i as number} className="flex-1">
              <div
                className={cn(
                  'mx-auto w-10 rounded-xl p-2 text-gray-500 transition-all hover:bg-gray-100 sm:w-12 sm:p-2.5',
                  checkActive(item.route) &&
                    'bg-brand-base-light !text-brand-base shadow-sm'
                )}
              >
                <Link
                  href={item.route}
                  className="flex items-center justify-center"
                >
                  {item.icon}
                </Link>
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
