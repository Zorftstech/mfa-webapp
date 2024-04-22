import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Each from '@/components/helpers/each';
import Container from '@/components/shared/container';
import { Text } from '@/components/ui/text';

import logo from '../images/logo.png';

const quickLinks = [
  { id: 1, title: 'About Us', href: '/' },
  { id: 2, title: 'Track My Order', href: '/' },
  { id: 3, title: 'Our Blog', href: '/' },
  { id: 4, title: 'Recently Viewed Products', href: '/' },
  { id: 5, title: 'Contact Us', href: '/' },
  { id: 6, title: 'Wishlist', href: '/' },
  { id: 7, title: 'My Account', href: '/' },
  { id: 8, title: 'Privacy Policy', href: '/' },
];

function Footer() {
  return (
    <Container backgroundColor="bg-black">
      <main className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3">
        <div className="border border-red-500">
          <Image src={logo} alt="Logo" className="mb-4" />
          <Text style={{ color: '#ccc' }} size={'sm'} weight={'normal'}>
            We are much more than a food delivery service. We are disrupting the whole african supply chain, one link at
            a time.
          </Text>
        </div>
        <div className="border border-red-500">
          <Text variant={'white'} size={'md'} weight={'medium'}>
            Quick Links
          </Text>
          <div className="grid w-full grid-cols-1 gap-4 py-4 md:grid-cols-2">
            {quickLinks.map((item: any) => (
              <Link key={item.id} href={item.href}>
                <Text style={{ color: '#ccc' }} size={'sm'} weight={'normal'}>
                  {item.title}
                </Text>
              </Link>
            ))}
            {/* <Each
              of={quickLinks}
              render={item => (
                <Link href={item.href} className="flex-1 border border-red-500">
                  <Text style={{ color: '#ccc' }} size={'sm'} weight={'normal'}>
                    {item.title}
                  </Text>
                </Link>
              )}
            /> */}
          </div>
        </div>
        <div className="border border-red-500"></div>
      </main>
    </Container>
  );
}

export default Footer;
