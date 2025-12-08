import { BarChartBig, BookOpen, Home, User } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { BottomNavigation } from '@/lib/components/BottomNavigation';

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
    <div className="relative flex h-screen w-full flex-col">
      <div className="container flex-grow overflow-auto">{props?.children}</div>
      <BottomNavigation items={items} />
    </div>
  );
};

export default Layout;
