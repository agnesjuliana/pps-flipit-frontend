'use client';

import type { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="relative min-h-screen w-full bg-brand-base">
      {props?.children}
    </div>
  );
};

export default Layout;
