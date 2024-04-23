import React from 'react';

import { Text } from '@/components/ui/text';

import { ShopItem } from '@/types';

function ProductDescription({ currentItem }: { currentItem: ShopItem }) {
  console.log(currentItem);

  return (
    <div className="flex-1 border border-red-500 p-2">
      <Text size={'2xl'} weight={'semibold'}>
        {currentItem.title}
      </Text>
    </div>
  );
}

export default ProductDescription;
