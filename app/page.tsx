import Image from 'next/image';
import Link from 'next/link';

import { Text } from '@/components/ui/text';

import FarmOfftake from './molecules/farm-offtake';
import FlashSales from './molecules/flash-sale';
import Hero from './molecules/hero';
import PopularProducts from './molecules/popular-products';

export default function Home() {
  return (
    <>
      <Hero />
      <FarmOfftake />
      <PopularProducts />
      <FlashSales />
    </>
  );
}
