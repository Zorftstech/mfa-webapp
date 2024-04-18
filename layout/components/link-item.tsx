import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Route } from '@/types';

const LinkItem = ({ route }: { route: Route }) => {
  const pathname = usePathname();

  return (
    <Link
      className={`mx-6 text-sm hover:underline ${pathname === route.href ? 'text-text-dim' : 'text-black'}`}
      href={route.href}
    >
      {route.title}
    </Link>
  );
};

export default LinkItem;
