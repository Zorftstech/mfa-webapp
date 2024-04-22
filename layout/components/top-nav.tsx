'use client';

import * as React from 'react';

import { usePathname } from 'next/navigation';

import Each from '@/components/helpers/each';
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';

import useWindowDimensions from '@/hooks/useWindowDimensions';
import { Routes } from '@/routes';

import LinkItem from './link-item';

export function TopNav() {
  const { width } = useWindowDimensions();

  const pathname = usePathname();

  console.log(typeof pathname);

  console.log(width);

  return (
    <NavigationMenu style={{ display: width > 860 ? 'block' : 'none' }}>
      <NavigationMenuList>
        <Each of={Routes} render={(route: any) => <LinkItem route={route} />} />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
