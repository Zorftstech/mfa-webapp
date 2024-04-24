'use client';

import React from 'react';

import useWindowDimensions from '@/hooks/useWindowDimensions';

import RouteDisplay from '../route-display';

import Filter from './molecules/filter';
import Items from './molecules/items';

function page() {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { width } = useWindowDimensions();

  // console.log(width);
  return (
    <div className="bg-gray-100" style={{ paddingTop: '69px' }}>
      {width && width >= 768 && <RouteDisplay route="Categories" />}
      <main style={{ maxWidth: '1200px' }} className="mx-auto mt-6 flex w-full items-start justify-center gap-2 p-4">
        <Filter />
        <Items />
      </main>
    </div>
  );
}

export default page;
