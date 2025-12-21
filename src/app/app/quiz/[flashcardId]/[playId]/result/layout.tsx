import { Home, Pocket, Repeat, User } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { BottomNavigation } from '@/lib/components/BottomNavigation';

const items = [
  {
    route: '/app/home',
    icon: <Home />,
  },
  {
    route: '/app/history',
    icon: <Repeat />,
  },
  {
    route: '/app/tree',
    icon: <Pocket />,
  },
  {
    route: '/app/account',
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
