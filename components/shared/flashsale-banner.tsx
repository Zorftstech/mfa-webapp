import { ArrowRight } from 'lucide-react';
import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

import bg from '../../images/flash-sale.png';
import { Text } from '../ui/text';
import Timer from '../ui/timer';

function FlashSaleBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Image src={bg} alt="bg" width={800} height={600} />
      <div className="absolute right-0 top-0 h-full w-full max-w-[330px] p-4">
        <Text className="my-2 text-gray-300" size={'sm'} weight={'medium'}>
          Flash Sale
        </Text>
        <span className="flex items-center gap-2">
          <Text className="my-4" variant={'secondary'} size={'5xl'} weight={'semibold'}>
            30%
          </Text>
          <Text className="my-4" variant={'white'} size={'5xl'} weight={'semibold'}>
            OFF
          </Text>
        </span>
        <Timer />
        <Button className="mt-6 rounded-3xl px-6 text-sm">
          Shop Now
          <ArrowRight className="w-4 text-white" />
        </Button>
      </div>
    </div>
  );
}

export default FlashSaleBanner;
