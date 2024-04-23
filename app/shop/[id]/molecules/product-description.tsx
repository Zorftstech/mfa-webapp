import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Ratings } from '@/components/ui/rating';
import { Text } from '@/components/ui/text';

import { ShopItem } from '@/types';

function ProductDescription({ currentItem }: { currentItem: ShopItem }) {
  return (
    <div className="flex-1 border border-red-500 p-2">
      <div className="flex w-full items-center justify-between">
        <Text size={'2xl'} weight={'semibold'}>
          {currentItem.title}
        </Text>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
          <HeartIcon className="w-4 text-gray-600" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-start gap-2">
        <Ratings value={currentItem.rating} />
        <Text size={'xs'} weight={'medium'}>
          {' '}
          {currentItem.reviews} reviews
        </Text>
      </div>
      <Button className="mt-4 w-full rounded-3xl text-sm">
        Add to Cart <ShoppingCartIcon className="w-4 text-white" />
      </Button>
    </div>
  );
}

export default ProductDescription;
