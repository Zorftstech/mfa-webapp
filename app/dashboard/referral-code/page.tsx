"use client";
import React from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import TextBoxWithLine from "@/components/dashboard/items-header";
import LineDivider from "@/components/dashboard/line-divider";
import useStore from "@/store";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import { copyToClipboard } from "@/helper";
import { Copy } from "lucide-react";

function Page() {
   const { authDetails } = useStore((store) => store);
   const { data: balance, refetch: refetchBalance } = useQueryCollectionByField(
      "referrals",
      "userId",
      authDetails.id ?? "",
   );

   return (
      <DashboardLayout>
         <div style={{ height: "auto" }}>
            <TextBoxWithLine text="Referral Code" />
            <LineDivider width="95%" color="#DDDDDD" />
            <div className="grid grid-cols-2 px-5 py-3">
               <p style={{ fontWeight: "500" }} className="text-content mb-4 mt-2">
                  Your referral code is
               </p>
               <button
                  style={{
                     backgroundColor: "#F7F7F7",
                     color: "#7AB42C",
                     fontWeight: "600",
                  }}
                  className="mb-10 px-6 py-4 text-base"
               >
                  {balance?.[0]?.referralCode ?? 0}
               </button>
               <p style={{ fontWeight: "500" }} className="text-content mb-4 mt-2">
                  Your Total Points is
               </p>
               <button
                  style={{
                     backgroundColor: "#F7F7F7",
                     color: "#7AB42C",
                     fontWeight: "600",
                  }}
                  className="mb-10 px-6 py-4 text-base"
               >
                  {balance?.[0]?.points ?? 0}
               </button>
               <button
                  onClick={() => {
                     copyToClipboard(
                        `https://myfoodangels.com/account/register?ref=${balance?.[0]?.referralCode ?? 0}`,
                        "Referral Link Copied to Clipboard",
                     );
                  }}
                  className="flex items-center gap-2 text-center text-[1rem] font-[600] capitalize leading-[27px] text-primary-2 "
               >
                  Copy Link
                  <span>
                     <Copy size={17} className="text-black" />
                  </span>
               </button>
               <button
                  onClick={() => {
                     copyToClipboard(
                        `https://myfoodangels.com/account/register?ref=${balance?.[0]?.referralCode ?? 0}`,
                        "Referral Link Copied to Clipboard",
                     );
                  }}
                  className=" gap-2 rounded-md border  border-primary-2 py-3 text-center text-[1rem] font-[600] capitalize leading-[27px] text-primary-2 "
               >
                  Redeem Points To Wallet Balance
               </button>
            </div>
         </div>
      </DashboardLayout>
   );
}

export default Page;
