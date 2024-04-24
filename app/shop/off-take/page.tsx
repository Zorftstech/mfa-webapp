'use client';

import React from 'react';

import Each from '@/components/helpers/each';
import Container from '@/components/shared/container';
import OfftakeBanner from '@/components/shared/offtake-banner';
import ShopItem from '@/components/shared/shop-item';

import useWindowDimensions from '@/hooks/useWindowDimensions';
import dummyItem from '@/images/dummy-item.png';
import { ShopItem as ItemType } from '@/types';

import RouteDisplay from '../route-display';

const dummyItems: ItemType[] = [
  { id: 1, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 2000.0 },
  { id: 2, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
  { id: 3, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
  { id: 4, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
  { id: 5, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
  { id: 6, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
  { id: 7, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
  { id: 8, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
];

function page() {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { width } = useWindowDimensions();
  return (
    <div style={{ paddingTop: '69px' }}>
      {width && width >= 768 && <RouteDisplay route="Farm Offtake" />}
      <Container backgroundColor="bg-gray-100">
        <main
          style={{ maxWidth: '1200px' }}
          className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-1 py-4"
        >
          <OfftakeBanner />
          <div className="w-full py-4">
            <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
              <Each
                of={dummyItems}
                render={(item: ItemType, index: number) => <ShopItem key={index} itemDetails={item} />}
              />
            </div>
          </div>
        </main>
      </Container>
    </div>
  );
}

export default page;
