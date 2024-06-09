import FarmOfftake from "./molecules/farm-offtake";
import FlashSales from "./molecules/flash-sale";
import Hero from "./molecules/hero";
import PopularProducts from "./molecules/popular-products";
import Sdg from "./molecules/sdg";
import Testimonials from "./molecules/testimonials";
import { revalidateNumber } from "@/lib/utils";
export const revalidate = 60;
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
