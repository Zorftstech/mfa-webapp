import FarmOfftake from "./molecules/farm-offtake";
import FlashSales from "./molecules/flash-sale";
import Hero from "./molecules/hero";
import PopularProducts from "./molecules/popular-products";
import Sdg from "./molecules/sdg";
import Testimonials from "./molecules/testimonials";

export default function Home() {
   return (
      <main>
         <Hero />
         <FarmOfftake />
         <PopularProducts />
         <FlashSales />
         <Testimonials />
         <Sdg />
      </main>
   );
}
