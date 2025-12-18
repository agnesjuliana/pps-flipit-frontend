import type { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-brand-base md:bg-gradient-to-br md:from-brand-base md:to-brand-700">
      {props?.children}
    </div>
  );
};

export default Layout;
