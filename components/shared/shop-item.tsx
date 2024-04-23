import { ShoppingCartIcon, StarIcon } from 'lucide-react';
import { Eye, HeartIcon } from 'lucide-react';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

import { ShopItem } from '@/types';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

import styles from './shop-item.module.css';

const Shop = ({ itemDetails }: { itemDetails: ShopItem }) => {
  return (
    <Card className="w-full cursor-pointer border border-transparent bg-white px-4 py-6 shadow-none duration-300 hover:border-gray-300">
      <CardContent className="w-full p-0">
        <div className={`${styles.img_container} relative flex w-full items-center justify-center`}>
          <Image src={itemDetails.image_url} alt={itemDetails.title} width={300} height={300} />
          <div className="absolute bottom-0 flex w-full items-center justify-between border border-gray-300 bg-gray-200">
            <button className="flex w-[50%] flex-col items-center justify-center rounded-none p-0">
              <HeartIcon className="w-4" />
              <Text size={'xs'} weight={'medium'}>
                Add to Wishlist
              </Text>
            </button>
            <Link
              className="flex w-[50%] flex-col items-center justify-center py-[11.5px]"
              href={`/shop/${itemDetails.id}`}
            >
              <Eye className="w-4" />
              <Text size={'xs'} weight={'medium'}>
                View Item
              </Text>
            </Link>
          </div>
        </div>
        <Text className="mt-2" size={'md'} weight={'semibold'}>
          {itemDetails.title}
        </Text>
        <div className="my-2 flex w-full flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <Text size={'xs'} weight={'medium'} className="flex items-center gap-1 text-gray-500">
            <StarIcon className="w-3" />
            {itemDetails.rating} ({itemDetails.reviews} reviews)
          </Text>
          <Text weight={'semibold'} size={'sm'}>
            ₦{itemDetails.price.toLocaleString()}
          </Text>
        </div>
        <Button className="mt-4 w-full rounded-3xl text-sm">
          Add to Cart <ShoppingCartIcon className="w-4 text-white" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Shop;
