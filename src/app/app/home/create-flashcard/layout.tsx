import type { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <div className="container flex-grow overflow-auto">{props?.children}</div>
    </div>
  );
};

export default Layout;
