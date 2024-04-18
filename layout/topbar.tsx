'use client';

// @ts-ignore
import { BellDotIcon, LucidePlus, Search } from 'lucide-react';
import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useUserContext } from '@/contexts/user-context';
import { Routes } from '@/routes';

import ProfileIconDropdown from '../components/dashboard/profile-icon-dropdown';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Text } from '../components/ui/text';
import logo from '../images/logo.png';

const Topbar = () => {
  const { user } = useUserContext();
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // const currentRoute = pathname;
  // console.log(currentRoute);

  return (
    <section className="flex w-full items-center justify-between border border-secondary px-8 py-4">
      <div className="flex min-w-[24rem] items-center justify-between gap-8">
        <Image src={logo} alt="mfa-logo" />
        <div className="flex h-full w-full items-center rounded-md px-4" style={{ gap: '40px' }}>
          {Routes.map((route, index) => (
            <Link
              className={`mx-6 text-sm hover:underline ${pathname === route.href ? 'text-red-500' : 'text-black'}`}
              key={index}
              href={route.href}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="flex gap-2 rounded-full border px-3 py-2">
          <LucidePlus className="w-4 text-gray-200" />
          <Text className="text-xs">New Issue</Text>
        </Button>
        <Button variant={'ghost'} className="flex gap-2 rounded-full border px-3 py-2">
          <BellDotIcon className="w-5" />
        </Button>
        <ProfileIconDropdown />
      </div>
    </section>
  );
};

export default Topbar;
