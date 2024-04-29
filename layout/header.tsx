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

const Header = () => {
   const { user } = useUserContext();

   const { width } = useWindowDimensions();

   const [isVisible, setIsVisible] = useState<boolean>(false);

   const handleVisibility = () => {
      setIsVisible(!isVisible);
   };

   return (
      <>
         <Show>
            <Show.When isTrue={isVisible}>
               <MobileNav handleVisibility={handleVisibility} />
            </Show.When>
         </Show>
         <section className="fixed top-0 z-40 w-full bg-white shadow">
            <main
               style={{ maxWidth: "1200px" }}
               className="mx-auto flex w-full items-center justify-between px-4 py-4 md:px-8"
            >
               <div className="flex min-w-[24rem] items-center justify-between gap-8">
                  {/* {width && width <= 860 && (
                     <Button variant={"ghost"} size={"none"} onClick={handleVisibility}>
                        <AlignJustify className="w-4" />
                     </Button>
                  )}
                  {width && width > 860 && (
                     <>
                        <Image src={logo} alt="mfa-logo" className="h-20 w-12" />
                        <TopNav />
                     </>
                  )} */}

                  <Button
                     variant={"ghost"}
                     size={"none"}
                     onClick={handleVisibility}
                     className="md:hidden"
                  >
                     <AlignJustify className="w-4" />
                  </Button>

                  <div className="hidden md:flex">
                     <Image src={logo} alt="mfa-logo" className="h-20 w-12" />
                     <TopNav />
                  </div>
               </div>
               {width && width <= 860 && <Image src={logo} alt="mfa-logo" className="h-20 w-12" />}
               {width && width >= 1040 && (
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
                     <ProfileIconDropdown />
                  </div>
               )}
               {width && width < 1040 && <ShoppingCart />}
            </main>
         </section>
      </>
   );
};

export default Header;
