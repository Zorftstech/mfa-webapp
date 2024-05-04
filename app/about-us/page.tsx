import React from "react";
import RouteDisplay from "@/components/shared/route-display";
import Container from "@/components/shared/container";

function page() {
   return (
      <div className="pt-[69px]">
         <RouteDisplay route={"About Us"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4"></main>
         </Container>
      </div>
   );
}

export default page;
