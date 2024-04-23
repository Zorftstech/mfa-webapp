'use client';

import { ArrowRight } from 'lucide-react';
import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

import useWindowDimensions from '@/hooks/useWindowDimensions';

import bg from '../../images/flash-sale.png';
import { Text } from '../ui/text';
import Timer from '../ui/timer';

function FlashSaleBanner() {
  const { width } = useWindowDimensions();

  if (width && width < 745) {
    return (
      <main className="w-full px-2">
        <div className="flex w-full items-center justify-between rounded-md border border-[#DFC900] bg-[#DFC900] p-4">
          <Text variant={'white'} size={'lg'} weight={'semibold'}>
            Flash Sale
          </Text>
          <div className="flex items-center gap-2 rounded-md bg-white p-2">
            <Timer className="rounded-md bg-[#7ab42c] p-2 text-xs text-white" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Image src={bg} alt="bg" width={800} height={600} />
      <div className="absolute right-0 top-0 h-full w-full max-w-[350px] p-4">
        <Text className="my-2 uppercase text-white" size={'sm'} weight={'medium'}>
          Flash Sale
        </Text>
        <span className="my-4 flex items-center gap-2">
          <Text className="text-[#7ab42c]" size={'5xl'} weight={'bold'}>
            30%
          </Text>
          <Text variant={'white'} size={'5xl'} weight={'bold'}>
            OFF
          </Text>
        </span>
        <div className="flex items-center justify-between gap-2 rounded-md bg-white p-2">
          <Text size={'sm'} weight={'semibold'}>
            Closing in:
          </Text>
          <Timer className="rounded-md bg-[#7ab42c] p-2 text-xs text-white" />
        </div>
        <Button className="mt-4 rounded-3xl px-6 text-sm">
          Shop Now
          <ArrowRight className="w-4 text-white" />
        </Button>
      </div>
    </div>
  );
}

export default FlashSaleBanner;
