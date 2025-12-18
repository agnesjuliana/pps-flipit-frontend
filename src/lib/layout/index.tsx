'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

import { AuthProvider } from '@/app/context/AuthContext';
import { ThemeProvider } from '@/lib/components/theme-provider';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="content light min-h-screen">{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
};

export default Layout;
