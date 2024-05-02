import React from "react";

import Container from "@/components/shared/container";
import {
   Carousel,
   CarouselContent,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import { Text } from "@/components/ui/text";

import TestimonialItem from "./testimonial-item";

function Testimonials() {
   return (
      <Container backgroundColor="bg-gray-100 pb-4">
         <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 px-4 py-8">
            <Carousel
               opts={{
                  align: "start",
               }}
               className="w-full"
            >
               <div className="mb-4 flex w-full items-center justify-between py-8">
                  <Text size={"xl"} weight={"bold"}>
                     What Our Customers Say
                  </Text>
                  <span className="flex items-center justify-end gap-2">
                     <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
                     <CarouselNext className="relative left-0 top-0 translate-y-0 bg-[#7ab42c] text-white" />
                  </span>
               </div>
               <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                     <TestimonialItem key={index} />
                  ))}
               </CarouselContent>
            </Carousel>
         </main>
      </Container>
   );
}

export default Testimonials;
