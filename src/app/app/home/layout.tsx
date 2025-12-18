import { BarChartBig, BookOpen, Home, User } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { BottomNavigation } from '@/lib/components/BottomNavigation';
import { DesktopNavigation } from '@/lib/components/DesktopNavigation';

const items = [
  {
    route: '/app/home',
    icon: <Home />,
  },
  {
    route: '/app/folder',
    icon: <BookOpen />,
  },
  {
    route: '/app/activity',
    icon: <BarChartBig />,
  },
  {
    route: '/app/profile',
    icon: <User />,
  },
];

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      <div className="flex-grow overflow-auto pb-20">{props?.children}</div>
      <BottomNavigation items={items} />
    </div>
  );
};

export default Layout;
