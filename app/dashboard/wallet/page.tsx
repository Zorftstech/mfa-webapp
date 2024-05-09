import React from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import TextBoxWithLine from "@/components/dashboard/items-header";
import LineDivider from "@/components/dashboard/line-divider";
import CouponCard from "@/components/dashboard/coupon-card";
import WalletCard from "@/components/dashboard/my-wallet-card";
import { ChevronDown } from "lucide-react";
import MyWalletTransactionCard from "@/components/dashboard/my-wallet-transaction-card";
import {
   Select,
   SelectTrigger,
   SelectContent,
   SelectValue,
   SelectItem,
   SelectGroup,
} from "@/components/ui/select";

function page() {
   return (
      <DashboardLayout>
         <div className="h-auto">
            <TextBoxWithLine text="My Wallet" />
            <div className="w-[40%]">
               <WalletCard amount="₦200,894.00" />
            </div>
            <div className="ml-5 mt-10">
               <p className="mb-2 text-sm font-bold text-[#151515]">Payment Transactions</p>
               <div className="flex items-center justify-start gap-4 px-1">
                  <p className="text-md px-0 font-bold">₦12,000</p>
                  <div className="h-5 w-0.5 bg-[#D7D7D7]"></div>
                  <Select defaultValue="this_month">
                     <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Month" />
                     </SelectTrigger>
                     <SelectContent className="bg-white">
                        <SelectGroup>
                           <SelectItem value="this_month">This Month</SelectItem>
                           <SelectItem value="last_month">Last Month</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
               </div>
            </div>
            <MyWalletTransactionCard
               client_name="Busy Farm"
               date="20th February 2024, 8:30am"
               amount="N500"
               img=""
            />
            <MyWalletTransactionCard
               client_name="Busy Farm"
               date="20th February 2024, 8:30am"
               amount="N500"
               img=""
            />
         </div>
      </DashboardLayout>
   );
}

export default page;
