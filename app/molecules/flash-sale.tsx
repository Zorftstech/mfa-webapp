import { ArrowRight } from 'lucide-react';
import React from 'react';

import Each from '@/components/helpers/each';
import Container from '@/components/shared/container';
import FlashSaleBanner from '@/components/shared/flashsale-banner';
import ShopItem from '@/components/shared/shop-item';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import { ShopItem as ItemType } from '@/types';

import dummyItem from '../../images/dummy-item.png';

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

function FlashSales() {
  return (
    <Container backgroundColor="bg-white">
      <main className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-1 py-4">
        <FlashSaleBanner />
        <div className="w-full py-4">
          <div className="flex w-full items-center justify-between px-4">
            <Text size={'2xl'} weight={'semibold'}>
              Flash Sale
            </Text>
            <Button variant={'ghost'} className=" rounded-3xl bg-gray-100 text-sm text-primary-2">
              View All
              <ArrowRight className="w-4 text-primary-2" />
            </Button>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
            <Each of={dummyItems} render={item => <ShopItem itemDetails={item} />} />
          </div>
        </div>
      </main>
    </Container>
  );
}

export default FlashSales;
