"use client";
import React from "react";
import Container from "@/components/shared/container";
import RouteDisplay from "../../components/shared/route-display";
import HeaderText from "@/components/ui/header-text";
import { Text } from "@/components/ui/text";
import { TabsContent } from "@/components/ui/tabs";
import ContactItems from "@/components/ui/contact-items";
import { Button } from "@/components/ui/button";
import ContactUsForm from "@/components/contact-us";

function page() {
   return (
      <div className="pt-[100px]">
         <RouteDisplay route={"Contact Us"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 bg-[#fbfbfb] py-4">
               <HeaderText text="Reach Out to Us" color="black" position="left" />
               <Text className="text-center text-gray-500 " size="sm" weight="normal">
                  Have any questions, suggestions, advice complaints or inquires? Feel free to
                  contact us using any <br />
                  of the options below!
               </Text>
               <div className="md-1 grid w-full grid-cols-1 gap-0 bg-[#fbfbfb] p-6 md:grid-cols-2">
                  <div className="col-span-1 flex w-[50%] items-center justify-center bg-white md:col-span-2 lg:col-span-1">
                     <div className="flex flex-col items-center justify-between gap-0 px-10 py-5">
                        <ContactItems icon="map-pinned" text="Ikosi Ketu, Lagos, Nigeria" />
                        <ContactItems icon="mail" text="info@myfoodangels.com" />
                        <ContactItems icon="phone-call" text="08090865279" />
                     </div>
                  </div>
                  <ContactUsForm />
               </div>
            </main>
         </Container>
      </div>
   );
}

export default page;
