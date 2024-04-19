import Image from 'next/image';
import Link from 'next/link';

import { Text } from '@/components/ui/text';

import FarmOfftake from './molecules/farm-offtake';
import Hero from './molecules/hero';

export default function Home() {
  return (
    <>
      <Hero />
      <FarmOfftake />
    </>
  );
}
