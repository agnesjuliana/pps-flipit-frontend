import type { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  return <div className="relative">{props?.children}</div>;
};

export default Layout;
