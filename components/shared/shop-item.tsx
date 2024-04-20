import React from 'react';
import { ShopItem } from '@/types';
import Image from 'next/image';
import { Text } from '../ui/text';
import { Button } from '../ui/button';

import { ShoppingCartIcon,StarIcon} from 'lucide-react';

function ShopItem({itemDetails}:{itemDetails:ShopItem}) {
  return <div className='rounded-lg bg-white px-4 py-6'>
    <Image src={itemDetails.image_url} alt={itemDetails.title} width={300} height={300} />
    <Text className='mt-2' size={'md'} weight={'semibold'}>{itemDetails.title}</Text>
    <div className='w-full my-2 flex items-center justify-between'>
        <Text size={'xs'} weight={'medium'} className='flex items-center gap-2 text-gray-500'>
            <StarIcon className='w-3' />
            {itemDetails.rating}{' '}
            ({itemDetails.reviews} reviews)
        </Text>
        <Text weight={'semibold'} size={'md'}>NGN {itemDetails.price.toLocaleString()}</Text>
    </div>
    <Button className="mt-4 w-full rounded-3xl text-sm">Add to Cart <ShoppingCartIcon className="w-4 text-white"  /></Button>
  </div>;
}

export default ShopItem;
