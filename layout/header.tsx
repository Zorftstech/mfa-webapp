'use client';

import { HeartIcon, ShoppingBag, AlignJustify } from 'lucide-react';
import React, { useState } from 'react';

import Image from 'next/image';

import { Show } from '@/components/helpers/show';
import { Separator } from '@/components/ui/separator';

import { useUserContext } from '@/contexts/user-context';

import ProfileIconDropdown from '../components/dashboard/profile-icon-dropdown';
import { Button } from '../components/ui/button';
import { Text } from '../components/ui/text';
import logo from '../public/images/home/logo.png';

import { MobileNav } from './components/mobile-nav';
import { TopNav } from './components/top-nav';
import './header.css';

const Header = () => {
  const { user } = useUserContext();

  const [isVisible, setIsVisible] = useState<Boolean>(false);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Show>
        <Show.When isTrue={isVisible}>
          <MobileNav handleVisibility={handleVisibility} />
        </Show.When>
      </Show>
      <section className="flex w-full items-center justify-between border border-secondary px-4 py-2 md:px-8">
        <div className="flex min-w-[24rem] items-center justify-between gap-8">
          <Button className="hamburger-btn" variant={'ghost'} size={'none'} onClick={handleVisibility}>
            <AlignJustify className="w-4" />
          </Button>
          <Image src={logo} alt="mfa-logo" />
          <TopNav />
        </div>
        <div className="flex items-center gap-4">
          <span className="wishlist-cart items-center gap-2">
            <Button variant={'ghost'} size={'none'}>
              <HeartIcon className="w-6" />
            </Button>
            <Separator orientation="vertical" />
            <div className="flex items-center justify-start gap-4">
              <Button variant={'ghost'} size={'none'} className="relative pr-2">
                <ShoppingBag className="w-6" />
                <span className="absolute right-0 rounded-full bg-primary px-2" style={{ top: '-5px' }}>
                  <Text variant={'white'} size={'xs'} style={{ fontSize: '10px' }}>
                    0
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
          </span>
          <ProfileIconDropdown />
        </div>
      </section>
    </>
  );
};

export default Header;
