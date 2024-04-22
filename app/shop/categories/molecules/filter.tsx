import { Filter as FilterIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

function Filter() {
  return (
    <aside className="flex-1 p-4">
      <Button className="w-full rounded-2xl">
        Filter
        <FilterIcon className="w-3" />
      </Button>
    </aside>
  );
}

export default Filter;
