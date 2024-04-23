import { Home, ShoppingCart, Heart, User } from 'lucide-react';
import React from 'react';

import Link from 'next/link';

import Each from '@/components/helpers/each';
import { Text } from '@/components/ui/text';

const links = [
  { id: 1, title: 'Home', href: '/', icon: <Home className="w-10" /> },
  { id: 2, title: 'Cart', href: '/', icon: <ShoppingCart className="w-10" /> },
  { id: 3, title: 'Wishlist', href: '/', icon: <Heart className="w-10" /> },
  { id: 4, title: 'Account', href: '/', icon: <User className="w-10" /> },
];
function BottomNav() {
  return (
    <div className="mt-3 flex w-full items-center justify-between bg-white p-4">
      <Each
        of={links}
        render={(item: any, index: number) => (
          <Link className="flex flex-1 flex-col items-center justify-center gap-2" href={item.href}>
            {item.icon}
            <Text size={'xs'} weight={'medium'}>
              {item.title}
            </Text>
          </Link>
        )}
      />
    </div>
  );
}

export default BottomNav;
