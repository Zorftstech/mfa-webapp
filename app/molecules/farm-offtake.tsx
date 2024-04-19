import React from 'react';

import Image from 'next/image';

import { Text } from '@/components/ui/text';

import bg from '../../images/farm-offtake.png';

function FarmOfftake() {
  return (
    <main className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-1 border border-red-500 py-4">
      <div className="relative overflow-hidden rounded-2xl">
        <Image src={bg} alt="bg" width={800} height={600} />
        <div className="absolute right-0 top-0 h-full max-w-[400px] p-4">
          <Text className="text-primary-2" size={'xl'} weight={'medium'}>
            FARM OFFTAKE
          </Text>
          <Text className="text-gray-300" size={'xs'} weight={'medium'}>
            Free on all your order, Free Delivery and 30 days money-back guarantee
          </Text>
        </div>
      </div>
    </main>
  );
}

export default FarmOfftake;
