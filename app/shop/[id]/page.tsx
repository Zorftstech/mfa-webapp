import React from 'react';

import Container from '@/components/shared/container';
import SuggestedProducts from '@/components/shared/suggested-products';

import dummyItem from '@/images/dummy-item.png';
import { ShopItem as ItemType } from '@/types';

import RouteDisplay from '../route-display';

import ProductDescription from './molecules/product-description';
import ProductImage from './molecules/product-image';

const orange: ItemType = {
  id: 1,
  image_url: dummyItem,
  images: [dummyItem, dummyItem, dummyItem, dummyItem],
  title: 'Nigerian Orange',
  rating: 4,
  reviews: 12,
  price: 2000.0,
};

function page() {
  return (
    <div>
      <RouteDisplay route={orange.title} />
      <Container>
        <main
          style={{ maxWidth: '1200px' }}
          className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-1 py-4"
        >
          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <ProductImage images={orange.images} />
            <ProductDescription currentItem={orange} />
            <SuggestedProducts />
          </div>
        </main>
      </Container>
    </div>
  );
}

export default page;
