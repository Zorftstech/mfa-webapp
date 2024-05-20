"use client";
import React from "react";
import Container from "@/components/shared/container";
import RouteDisplay from "../../components/shared/route-display";
import HeaderText from "@/components/ui/header-text";
import { Text } from "@/components/ui/text";
import { TabsContent } from "@/components/ui/tabs";
import ContactItems from "@/components/ui/contact-items";
import { Button } from "@/components/ui/button";

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
                  <div className="col-span-1 mx-[5px] my-[5px] w-full bg-white md:col-span-2 lg:col-span-1">
                     <form className="p-5">
                        <h2 className="mb-4 text-xl font-semibold">Send Us a Message</h2>
                        <div className="mb-4 flex gap-4">
                           <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              placeholder="Your full name"
                              className="flex-1 rounded-md border p-2 text-sm"
                           />
                           <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Email address"
                              className="flex-1 rounded-md  border p-2 text-sm"
                           />
                        </div>
                        <div className="mb-4">
                           <input
                              type="text"
                              id="subject"
                              name="subject"
                              placeholder="Subject"
                              className="w-full rounded-md border p-2 text-sm"
                           />
                        </div>
                        <div className="mb-4">
                           <textarea
                              id="message"
                              name="message"
                              rows={4}
                              placeholder="Message"
                              className="w-full rounded-md border p-2 text-sm"
                           ></textarea>
                        </div>
                        <Button className="mt-4 w-auto rounded-3xl px-5 text-sm">
                           Send message
                        </Button>
                     </form>
                  </div>
               </div>
            </main>
         </Container>
      </div>
   );
}

export default page;
