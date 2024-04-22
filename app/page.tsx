import Newsletter from '@/components/shared/newsletter';

import Footer from '@/layout/footer';

import FarmOfftake from './molecules/farm-offtake';
import FlashSales from './molecules/flash-sale';
import Hero from './molecules/hero';
import PopularProducts from './molecules/popular-products';
import Sdg from './molecules/sdg';
import Testimonials from './molecules/testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <FarmOfftake />
      <PopularProducts />
      <FlashSales />
      <Testimonials />
      <Sdg />
      <Newsletter />
      <Footer />
    </>
  );
}
