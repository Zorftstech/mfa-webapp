import { ShoppingBag } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

function ShoppingCart() {
  return (
    <Button variant={'ghost'} size={'none'} className="relative pr-2">
      <ShoppingBag className="w-6" />
      <span className="absolute right-0 rounded-full bg-primary px-2" style={{ top: '-5px' }}>
        <Text variant={'white'} size={'xs'} style={{ fontSize: '10px' }}>
          0
        </Text>
      </span>
    </Button>
  );
}

export default ShoppingCart;
