import React from 'react';

import Each from '@/components/helpers/each';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

const categories = [
  'Animal Protein',
  'Beverages',
  'Canned Foods',
  'Christmans Bundles',
  'Condiments',
  'Cooking Oils',
  'Dry Foods',
];

function ProductCategories() {
  return (
    <AccordionItem className="border-0" value="item-1">
      <AccordionTrigger>Product Categories</AccordionTrigger>
      <Each
        of={categories}
        render={(item: any, index: number) => (
          <AccordionContent key={index} className="flex items-center justify-start gap-1">
            <Input className="w-3" type="radio" placeholder="Email" />
            <Text size={'xs'}>{item} (134)</Text>
          </AccordionContent>
        )}
      />
    </AccordionItem>
  );
}

export default ProductCategories;
