import React from 'react';

import Link from 'next/link';

import { Text } from '@/components/ui/text';

const learnMore = [
  { id: 1, title: 'FAQs', href: '/' },
  { id: 2, title: 'Terms of Use', href: '/' },
  { id: 3, title: 'Shipping Policy', href: '/' },
  { id: 4, title: 'Cookie Policy', href: '/' },
  { id: 5, title: 'Refund and Returns Policy', href: '/' },
  { id: 6, title: 'FB Policy', href: '/' },
  { id: 7, title: 'Privacy Policy', href: '/' },
];

function LearnMore() {
  return (
    <div>
      <Text variant={'white'} size={'md'} weight={'medium'}>
        Learn More
      </Text>
      <div className="grid w-full grid-cols-1 gap-4 py-4 md:grid-cols-2">
        {learnMore.map((item: any) => (
          <Link key={item.id} href={item.href}>
            <Text className="hover:underline" style={{ color: '#989898' }} size={'sm'} weight={'normal'}>
              {item.title}
            </Text>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LearnMore;
