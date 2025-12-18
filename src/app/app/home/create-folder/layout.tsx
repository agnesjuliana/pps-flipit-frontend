import type { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      <div className="flex-grow overflow-auto">{props?.children}</div>
    </div>
  );
};

export default Layout;
