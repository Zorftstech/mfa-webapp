import React from 'react';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

function price() {
  return (
    <AccordionItem className="border-0" value="item-2">
      <AccordionTrigger>Price</AccordionTrigger>
      <AccordionContent className="flex items-center justify-start gap-1">
        {/* <Input className="w-3" type="radio" placeholder="Email" /> */}
        <Text size={'xs'}>Price currently not available...</Text>
      </AccordionContent>
    </AccordionItem>
  );
}

export default price;
