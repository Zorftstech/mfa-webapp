import { ShoppingCartIcon } from 'lucide-react';
import React from 'react';

import Image from 'next/image';

import tomato from '@/images/tomato.png';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Button } from '../ui/button';
import { Text } from '../ui/text';

function SuggestedProducts() {
  return (
    <div className="flex-1">
      <Accordion type="single" collapsible className="mt-3 w-full rounded-xl bg-white px-4 py-2">
        <AccordionItem className="border-0" value="item-1">
          <AccordionTrigger>Suggested Products</AccordionTrigger>
          <AccordionContent className="">
            <div className="mb-3 flex w-full items-center gap-2">
              <Image src={tomato} alt="Product" />
              <div className="w-full">
                <Text className="mb-2" size={'xs'} weight={'medium'}>
                  Red Capsicum
                </Text>
                <Text size={'xs'} weight={'medium'}>
                  From: ₦4,800
                </Text>
                <Button className="mt-4 w-full rounded-3xl  border border-primary-2 bg-transparent text-xs text-primary-2">
                  Add to Cart <ShoppingCartIcon className="w-4 text-primary-2" />
                </Button>
              </div>
            </div>
            <div className="mb-3 flex w-full items-center gap-2">
              <Image src={tomato} alt="Product" />
              <div className="w-full">
                <Text className="mb-2" size={'xs'} weight={'medium'}>
                  Red Capsicum
                </Text>
                <Text size={'xs'} weight={'medium'}>
                  From: ₦4,800
                </Text>
                <Button className="mt-4 w-full rounded-3xl  border border-primary-2 bg-transparent text-xs text-primary-2">
                  Add to Cart <ShoppingCartIcon className="w-4 text-primary-2" />
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SuggestedProducts;
