import type { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="relative h-full w-full bg-brand-base">
      {props?.children}
    </div>
  );
};

export default Layout;
