import React from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import TextBoxWithLine from "@/components/dashboard/items-header";
import LineDivider from "@/components/dashboard/line-divider";
import CouponCard from "@/components/dashboard/coupon-card";

function page() {
   return (
      <DashboardLayout>
         <div className="h-auto">
            <TextBoxWithLine text="Coupons" />
            <LineDivider width="95%" color="#DDDDDD" />
            <div className="flex flex-wrap  px-0">
               <CouponCard
                  voucher_name="Christmas Voucher"
                  event_name="Christmas24"
                  discount="3% discount"
                  date_text="Valid till Jan 2nd, 2025"
               />
               <CouponCard
                  voucher_name="Valentine Voucher"
                  event_name="Valentine24"
                  discount="10% discount"
                  date_text="Valid till Jan 2nd, 2025"
               />
            </div>
         </div>
      </DashboardLayout>
   );
}

export default page;
