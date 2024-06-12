"use client";
import { HeartIcon, AlignJustify } from "lucide-react";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Show } from "@/components/helpers/show";
import { Separator } from "@/components/ui/separator";

import { useUserContext } from "@/contexts/user-context";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import ProfileIconDropdown from "../components/dashboard/profile-icon-dropdown";
import { Button } from "../components/ui/button";
import { Text } from "../components/ui/text";
import logo from "../public/images/home/logo.png";

import { MobileNav } from "./components/mobile-nav";
import ShoppingCart from "./components/shopping-cart";
import { TopNav } from "./components/top-nav";
import Marquee from "react-marquee-slider";
import useStore from "@/store";
const Header = () => {
   const { loggedIn } = useStore((store) => store);

   const { width } = useWindowDimensions();

   const [isVisible, setIsVisible] = useState<boolean>(false);

   const handleVisibility = () => {
      setIsVisible(!isVisible);
   };

   return (
      <div
         className="fixed top-0 z-40 w-full"
         style={{
            zIndex: 10,
         }}
      >
         <Show>
            <Show.When isTrue={isVisible}>
               <MobileNav handleVisibility={handleVisibility} />
            </Show.When>
         </Show>
         <section className="w-full bg-white shadow">
            <div className="w-full bg-gray-200 py-2">
               {width ? (
                  <Marquee
                     direction="ltr"
                     scatterRandomly={false}
                     onInit={() => {}}
                     onFinish={() => {}}
                     resetAfterTries={1}
                     velocity={25}
                  >
                     <Text size={"xs"} weight={"medium"}>
                        Enjoy 25% off Farm Direct products!
                     </Text>
                     <Text size={"xs"} weight={"medium"} className="ml-1">
                        Shop Now
                     </Text>
                  </Marquee>
               ) : (
                  <div className="my-1 flex items-center px-5">
                     <Text size={"xs"} weight={"medium"}>
                        Enjoy 25% off Farm Direct products!
                     </Text>
                     <Text size={"xs"} weight={"medium"} className="ml-1">
                        Shop Now
                     </Text>
                  </div>
               )}
            </div>
            <main className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-4 md:px-8">
               <Button
                  className="block md:hidden"
                  variant={"ghost"}
                  size={"none"}
                  onClick={handleVisibility}
               >
                  <AlignJustify className="w-4" />
               </Button>
               <div className="hidden min-w-[24rem] items-center justify-between gap-8 md:flex">
                  <Image src={logo} alt="mfa-logo" className="h-8 w-12" />
                  <TopNav />
               </div>
               <Image src={logo} alt="mfa-logo" className="block h-10 w-12 md:hidden" />
               {width && width > 1040 && (
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <Link href={"/shop/wishlist"} className="">
                           <HeartIcon className="w-6" />
                        </Link>
                        <Separator orientation="vertical" />
                        <div className="flex items-center justify-start gap-4">
                           <ShoppingCart />
                           <span className="flex flex-col">
                              <Text size={"xs"}>Shopping cart</Text>
                              <Text weight={"bold"} size={"xs"}>
                                 NGN 57.00
                              </Text>
                           </span>
                        </div>
                     </div>

                     {loggedIn ? (
                        <ProfileIconDropdown />
                     ) : (
                        <div className="flex">
                           <Link
                              style={{ marginLeft: "50px" }}
                              className="text-xs font-medium text-gray-600 hover:underline"
                              href={"/account/signin"}
                           >
                              Login
                           </Link>
                           <Link
                              style={{ marginLeft: "3px" }}
                              className="text-xs font-medium text-gray-600 hover:underline"
                              href={"/account/register"}
                           >
                              / Register
                           </Link>
                        </div>
                     )}
                  </div>
               )}

               {width && width <= 1040 && <ShoppingCart />}
            </main>
         </section>
      </div>
   );
};

export default Header;
