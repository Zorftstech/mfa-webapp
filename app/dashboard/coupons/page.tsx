"use client";
import React, { useState } from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import TextBoxWithLine from "@/components/dashboard/items-header";
import LineDivider from "@/components/dashboard/line-divider";
import CouponCard from "@/components/dashboard/coupon-card";
import ProcessError from "@/lib/error";
import { formatDate, getCreatedDateFromDocument } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
function Page() {
   async function fetchCoupons() {
      const couponCollectionsRef = collection(db, "couponCodes");

      const querySnapshot = await getDocs(couponCollectionsRef);

      const coupons: any = [];

      querySnapshot.forEach((doc) => {
         const createdDate = getCreatedDateFromDocument(doc as any);
         coupons.push({
            id: doc.id,
            ...doc.data(),
            createdDate,
         });
      });
      return coupons;
   }

   const { data, isLoading } = useQuery({
      queryKey: ["getCoupons"],
      queryFn: () => fetchCoupons(),
   });
   return (
      <DashboardLayout>
         <div className="h-auto">
            <TextBoxWithLine text="Coupons" />
            <LineDivider width="95%" color="#DDDDDD" />
            <div className="grid  w-full grid-cols-1 gap-x-[1.5rem] gap-y-[2.875rem] px-6 py-8 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
               {data?.map((item: any, idx: number) => (
                  <div key={idx} className="h-full w-full">
                     <CouponCard
                        item={item}
                        purpose={item?.purpose}
                        discount={item?.discountAmount}
                        name={item?.code.slice(0, 14)}
                        link={`/${item?.id}`}
                        date={formatDate(new Date(item?.expirationDate.seconds * 1000).toString())}
                     />
                  </div>
               ))}
            </div>
         </div>
      </DashboardLayout>
   );
}

export default Page;
