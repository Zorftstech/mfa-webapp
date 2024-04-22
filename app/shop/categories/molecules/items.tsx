import { ArrowUpDown } from 'lucide-react';
import React from 'react';

import Each from '@/components/helpers/each';
import ShopItem from '@/components/shared/shop-item';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Text } from '@/components/ui/text';

import dummyItem from '@/images/dummy-item.png';
import { ShopItem as ItemType } from '@/types';

import ItemPagination from './item-pagination';

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

function Items() {
  return (
    <main className="flex-[4] p-4">
      <div className="mb-4 flex w-full items-center justify-between">
        <Text size={'sm'} weight={'medium'}>
          Showing 1-20 of 500 results
        </Text>
        <div className="flex items-center justify-end gap-1">
          <ArrowUpDown className="w-3" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Sorting</SelectItem>
              <SelectItem value="custom">Custom Sorting</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Each of={dummyItems} render={item => <ShopItem itemDetails={item} />} />
      </div>
      <ItemPagination />
    </main>
  );
}

export default Items;
