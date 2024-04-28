/* eslint-disable @next/next/no-img-element */
"use client";
import useStore from "store";
// import { useLocation, Navigate, useOutlet } from 'react-router-dom';
import { url } from "@/lib/utils";

import { planTypes } from "types";
import { Unbounded } from "next/font/google";

const unbounded = Unbounded({ subsets: ["latin"] });
interface IRouteGuard {
   children: JSX.Element;
}

const RouteGuard = ({ children }: IRouteGuard) => {
   const loggedIn = useStore((state) => state.loggedIn);

   return !loggedIn ? (
      <div className="mt-[4.3rem] flex h-full  w-full max-w-[1500px] px-container-base py-[3.875rem]">
         <div className=" flex w-full flex-col  items-center justify-center gap-8  ">
            <h1
               className={` text-center ${unbounded.className} text-[1.2rem]  font-medium  text-white/90  `}
            >
               You are not logged in, please login or sign to enjoy this feature
            </h1>
            {/* <img src={url("/svgs/notAllowed.svg")} alt="" className="w-[2rem]" /> */}
         </div>
      </div>
   ) : (
      <>{children}</>
   );
};

export default RouteGuard;
