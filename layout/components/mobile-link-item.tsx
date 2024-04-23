import React from 'react';

import Link from 'next/link';

import Each from '@/components/helpers/each';

import { Route } from '@/types';

const className =
  'w-full rounded-lg border border-gray-100 bg-gray-100 py-4 text-center text-sm focus:border-gray-700 focus:bg-gray-700';

function MobileLinkItem({ item }: { item: Route }) {
  if (item.components) {
    return (
      <>
        <Each
          of={item.components}
          render={(item: any, index: number) => (
            <Link className={className} key={index} href={item.href}>
              {item.title}
            </Link>
          )}
        />
      </>
    );
  }

  return (
    <Link className={className} key={item.id} href={item.href}>
      {item.title}
    </Link>
  );
}

export default MobileLinkItem;
