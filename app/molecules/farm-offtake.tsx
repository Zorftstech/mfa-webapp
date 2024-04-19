import { ArrowRight } from 'lucide-react';
import React from 'react';
import useCountDown from 'react-countdown-hook';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import Timer from '@/components/ui/timer';

import bg from '../../images/farm-offtake.png';

function FarmOfftake() {
  return (
    <main className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-1 border border-red-500 py-4">
      <div className="relative overflow-hidden rounded-2xl">
        <Image src={bg} alt="bg" width={800} height={600} />
        <div className="absolute right-0 top-0 h-full max-w-[400px] p-4">
          <Text variant={'secondary'} size={'xl'} weight={'semibold'}>
            FARM OFFTAKE
          </Text>
          <Text className="my-2 text-gray-300" size={'xs'} weight={'medium'}>
            Free on all your order, Free Delivery and 30 days money-back guarantee
          </Text>
          <Timer />
          <Button className="mt-4 rounded-3xl px-6 text-sm">
            Shop Now
            <ArrowRight className="w-4 text-white" />
          </Button>
        </div>
      </div>
      <div className="w-full border border-blue-500 py-4">
        <div className="flex w-full items-center justify-between">
          <Text size={'xl'} weight={'semibold'}>
            Farm Offtake
          </Text>
          <Button variant={'ghost'} className="text-sm text-primary-2">
            View All
            <ArrowRight className="w-4 text-primary-2" />
          </Button>
        </div>
      </div>
    </main>
  );
}

export default FarmOfftake;
