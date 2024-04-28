'use client';

import { ArrowRight, Search, ArrowUpDown, Filter } from 'lucide-react';
import React from 'react';

import Link from 'next/link';

import Each from '@/components/helpers/each';
import Container from '@/components/shared/container';
import ShopItem from '@/components/shared/shop-item';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

import useWindowDimensions from '@/hooks/useWindowDimensions';
import { ShopItem as ItemType } from '@/types';

import dummyItem from '../../../images/dummy-item.png';
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

const recommendedItems: ItemType[] = [
  { id: 1, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 2000.0 },
  { id: 2, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
  { id: 3, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
  { id: 4, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
];

const recentItems: ItemType[] = [
  { id: 1, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 2000.0 },
  { id: 2, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
  { id: 3, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
  { id: 4, image_url: dummyItem, title: 'Orange (200g)', rating: 4.5, reviews: 12, price: 200.0 },
];

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { width } = useWindowDimensions();
  return (
    <div style={{ paddingTop: '69px' }}>
      {width && width >= 768 && <RouteDisplay route="Popular Products" />}
      <Container backgroundColor="bg-gray-100">
        <main
          style={{ maxWidth: '1200px' }}
          className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-1 py-4"
        >
          <div className="w-full py-4">
            <div className="mb-6 flex items-center gap-2 px-2">
              <div className="relative w-full">
                <Search className="absolute left-4 top-[25%] w-4" />
                <Input className={`w-full rounded-full bg-white py-6 pl-[40px]`} placeholder={'What do you need?'} />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7ab42c] ">
                <Filter className="w-3 text-white" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7ab42c]">
                <ArrowUpDown className="w-3 text-white" />
              </div>
            </div>
            <div className="flex w-full items-center justify-start px-4">
              <Text size={'lg'} weight={'semibold'}>
                Popular Products
              </Text>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
              <Each
                of={dummyItems}
                render={(item: ItemType, index: number) => <ShopItem key={index} itemDetails={item} />}
              />
            </div>
            <div className="mt-8 flex w-full items-center justify-between px-4">
              <Text size={'lg'} weight={'semibold'}>
                Recommended for you
              </Text>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
              <Each
                of={recommendedItems}
                render={(item: ItemType, index: number) => <ShopItem key={index} itemDetails={item} />}
              />
            </div>
            <div className="mt-8 flex w-full items-center justify-between px-4">
              <Text size={'lg'} weight={'semibold'}>
                Recently Viewed
              </Text>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
              <Each
                of={recentItems}
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
