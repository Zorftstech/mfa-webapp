import React from 'react';

import RouteDisplay from '../route-display';

import Filter from './molecules/filter';
import Items from './molecules/items';
import './page.css';

function page() {
  return (
    <div className="bg-gray-100">
      <RouteDisplay route="Categories" />
      <main className="mt-6 flex w-full items-start justify-center gap-2 p-4">
        <Filter />
        <Items />
      </main>
    </div>
  );
}

export default page;
