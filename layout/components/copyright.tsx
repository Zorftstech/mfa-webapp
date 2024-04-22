import React from 'react';

import Image from 'next/image';

import Each from '@/components/helpers/each';
import { Text } from '@/components/ui/text';

import flutterwave from '../../images/flutterwave.png';
import mastercard from '../../images/mastercard.png';
import paystack from '../../images/paystack.png';
import visa from '../../images/visa.png';

const images = [paystack, flutterwave, mastercard, visa];

function Copyright() {
  return (
    <div className="flex w-full items-center justify-between py-6">
      <Text style={{ color: '#989898' }} size={'xs'} weight={'medium'}>
        &copy; MY FOOD ANGELS.COM, All rights reserved.
      </Text>
      <div className="flex items-center justify-end gap-2">
        <Each of={images} render={item => <Image className="h-10 w-10" src={item} alt="Partners" />} />
      </div>
    </div>
  );
}

export default Copyright;
