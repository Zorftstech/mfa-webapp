import { ShoppingCartIcon, StarIcon } from 'lucide-react';
import React from 'react';

import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

import { ShopItem } from '@/types';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

const Shop = ({ itemDetails }: { itemDetails: ShopItem }) => {
  return (
    <Card className="w-full bg-white px-4 py-6">
      <CardContent className="w-full p-0">
        <div className="flex w-full items-center justify-center">
          <Image src={itemDetails.image_url} alt={itemDetails.title} width={300} height={300} />
        </div>
        <Text className="mt-2" size={'md'} weight={'semibold'}>
          {itemDetails.title}
        </Text>
        <div className="my-2 flex w-full items-center justify-between">
          <Text size={'xs'} weight={'medium'} className="flex items-center gap-1 text-gray-500">
            <StarIcon className="w-3" />
            {itemDetails.rating} ({itemDetails.reviews} reviews)
          </Text>
          <Text weight={'semibold'} size={'sm'}>
            NGN {itemDetails.price.toLocaleString()}
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
