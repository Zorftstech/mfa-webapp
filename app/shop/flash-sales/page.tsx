import React from 'react';

import Each from '@/components/helpers/each';
import Container from '@/components/shared/container';
import FlashSaleBanner from '@/components/shared/flashsale-banner';
import Newsletter from '@/components/shared/newsletter';
import ShopItem from '@/components/shared/shop-item';

import dummyItem from '@/images/dummy-item.png';
import Footer from '@/layout/footer';
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
  return (
    <div>
      <RouteDisplay route="Flash Sales" />
      <Container backgroundColor="bg-gray-100">
        <main className="mx-auto mt-8 flex w-full max-w-[1440px] flex-col items-center justify-center gap-1 py-4">
          <FlashSaleBanner />
          <div className="w-full py-4">
            <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
              <Each of={dummyItems} render={item => <ShopItem itemDetails={item} />} />
            </div>
          </div>
        </main>
      </Container>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default page;
