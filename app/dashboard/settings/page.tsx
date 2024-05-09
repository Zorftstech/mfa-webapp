import React from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import AccountSettings from "./molecules/account-settings";
import BillingAddress from "./molecules/billing-address";
import PasswordChange from "./molecules/change-password";

function page() {
   return (
      <DashboardLayout backgroundColor={"bg-transparent"}>
         <AccountSettings />
         <BillingAddress />
         <PasswordChange />
      </DashboardLayout>
   );
}

export default page;
