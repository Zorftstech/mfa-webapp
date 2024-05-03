import React from "react";
import RouteDisplay from "@/components/shared/route-display";
import Container from "@/components/shared/container";
import Sidebar from "./molecules/side-bar";
import DashboardLayout from "./molecules/dashboard-layout";
import { Text } from "@/components/ui/text";

function page() {
   return (
      <DashboardLayout>
         <div className="border border-gray-300">
            <Text>Profile</Text>
         </div>
      </DashboardLayout>
   );
}

export default page;
