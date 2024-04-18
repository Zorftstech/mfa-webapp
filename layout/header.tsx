'use client';

import { HeartIcon, ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';

import Image from 'next/image';

import Each from '@/components/helpers/each';
import { Separator } from '@/components/ui/separator';

import { useUserContext } from '@/contexts/user-context';
import { Routes } from '@/routes';

import ProfileIconDropdown from '../components/dashboard/profile-icon-dropdown';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Text } from '../components/ui/text';
import logo from '../public/images/home/logo.png';

import LinkItem from './components/link-item';

const Header = () => {
  const { user } = useUserContext();

  return (
    <section className="flex w-full items-center justify-between border border-secondary px-8 py-2">
      <div className="flex min-w-[24rem] items-center justify-between gap-8">
        <Image src={logo} alt="mfa-logo" />
        <div className="flex h-full w-full items-center rounded-md px-4" style={{ gap: '2.5rem' }}>
          <Each of={Routes} render={(route: any, index: any) => <LinkItem key={index} route={route} />} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant={'ghost'} size={'none'}>
          <HeartIcon className="w-6" />
        </Button>
        <Separator orientation="vertical" />
        <div className="flex items-center justify-start gap-4">
          <Button variant={'ghost'} size={'none'} className="relative pr-2">
            <ShoppingBag className="w-6" />
            <span
              className="absolute right-0 rounded-full border border-primary bg-primary px-2"
              style={{ top: '-8px' }}
            >
              <Text variant={'white'} size={'xs'} style={{ fontSize: '10px' }}>
                2
              </Text>
            </span>
          </Button>
          <span className="flex flex-col">
            <Text size={'xs'}>Shopping cart</Text>
            <Text weight={'bold'} size={'xs'}>
              NGN 57.00
            </Text>
          </span>
        </div>
        <ProfileIconDropdown />
      </div>
    </section>
  );
};

export default Header;
