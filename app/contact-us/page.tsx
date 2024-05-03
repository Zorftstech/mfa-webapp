"use client";
import React from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import Container from "@/components/shared/container";
import RouteDisplay from "../../components/shared/route-display";
import HeaderText from "@/components/ui/header-text";
import { Text } from "@/components/ui/text";
import { TabsContent } from "@/components/ui/tabs";
import ContactItems from "@/components/ui/contact-items";
import { Button } from "@/components/ui/button";

function page() {
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const { width } = useWindowDimensions();
   return (
      <div style={{ paddingTop: "69px" }}>
         {width && width > 768 && <RouteDisplay route={"Contact Us"} />}

         <Container>
            <main
               style={{ maxWidth: "1200px", backgroundColor: "#fbfbfb" }}
               className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-1 py-4"
            >
               <HeaderText text="Reach Out to Us" color="black" position="left" />
               <Text className="text-center text-gray-500 " size="sm" weight="normal">
                  Have any questions, suggestions, advice complaints or inquires? Feel free to
                  contact us using any <br />
                  of the options below!
               </Text>
               <div
                  className="md-1 grid w-full grid-cols-2 gap-0 p-4"
                  style={{ backgroundColor: "#fbfbfb" }}
               >
                  <div
                     className="col-span-1 flex md:col-span-2 lg:col-span-1"
                     style={{ backgroundColor: "white", width: "40%" }}
                  >
                     <div className="flex flex-col justify-between gap-0">
                        <ContactItems icon="map-pinned" text="Ikosi Ketu, Lagos, Nigeria" />
                        <ContactItems icon="mail" text="info@myfoodangels.com" />
                        <ContactItems icon="phone-call" text="08090865279" />
                     </div>
                  </div>
                  <div
                     className="col-span-1 md:col-span-2 lg:col-span-1"
                     style={{ backgroundColor: "white", margin: "5px", width: "100%" }}
                  >
                     <form>
                        <h2 className="mb-4 text-xl font-semibold">Send Us a Message</h2>
                        <div className="mb-4 flex gap-4">
                           <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              placeholder="Your full name"
                              className="flex-1 rounded-md border p-2"
                           />
                           <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Email address"
                              className="flex-1 rounded-md border p-2"
                           />
                        </div>
                        <div className="mb-4">
                           <input
                              type="text"
                              id="subject"
                              name="subject"
                              placeholder="Subject"
                              className="w-full rounded-md border p-2"
                           />
                        </div>
                        <div className="mb-4">
                           <textarea
                              id="message"
                              name="message"
                              rows={4}
                              placeholder="Message"
                              className="w-full rounded-md border p-2"
                           ></textarea>
                        </div>
                        <Button className="mt-4 w-auto rounded-3xl text-sm">Send message</Button>
                     </form>
                  </div>
               </div>
            </main>
         </Container>
      </div>
   );
}

export default page;
