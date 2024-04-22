'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Newsletter from '@/components/shared/newsletter';

import UserProvider, { useUserContext } from '@/contexts/user-context';
import WorkspaceProvider from '@/contexts/workspace-context';
import Footer from '@/layout/footer';
import Header from '@/layout/header';
import Topbar from '@/layout/topbar';

import './globals.css';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};
export default function RootClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <main className="min-h-screen">
        <Header />
        {children}
        <Newsletter />
        <Footer />
      </main>
    </Providers>
  );
}
