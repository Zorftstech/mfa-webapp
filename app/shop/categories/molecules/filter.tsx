'use client';

import { Filter as FilterIcon } from 'lucide-react';
import React from 'react';

import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

import useWindowDimensions from '@/hooks/useWindowDimensions';

import Price from './price';
import ProductCategories from './product-categories';

function Filter() {
  const { width } = useWindowDimensions();

  return (
    <aside style={{ display: width > 860 ? 'block' : 'none' }} className="flex-1 p-4">
      <Button className="w-full rounded-2xl">
        Filter
        <FilterIcon className="w-3" />
      </Button>
      <Accordion type="single" collapsible className="mt-3 w-full rounded-xl bg-white px-4 py-2">
        <ProductCategories />
        <Price />
      </Accordion>
    </aside>
  );
}

export default Filter;
