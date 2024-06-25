"use client";
import React from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import TextBoxWithLine from "@/components/dashboard/items-header";
import LineDivider from "@/components/dashboard/line-divider";
import useStore from "@/store";

function Page() {
   const { authDetails } = useStore((store) => store);
   console.log(authDetails);

   return (
      <DashboardLayout>
         <div style={{ height: "auto" }}>
            <TextBoxWithLine text="Referral Code" />
            <LineDivider width="95%" color="#DDDDDD" />
            <div className="px-5 py-3 ">
               <p style={{ fontWeight: "500" }} className="text-content mb-4 mt-2">
                  Your referral code is
               </p>
               <button
                  style={{
                     backgroundColor: "#F7F7F7",
                     color: "#7AB42C",
                     fontSize: "1.5rem",
                     fontWeight: "600",
                  }}
                  className="mb-10 px-6 py-4 text-lg"
               >
                  {authDetails?.referralCode}
               </button>
            </div>
         </div>
      </DashboardLayout>
   );
}

export default Page;
