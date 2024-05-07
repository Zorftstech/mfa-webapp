import React from "react";
import RouteDisplay from "@/components/shared/route-display";
import Container from "@/components/shared/container";
import Sidebar from "./molecules/side-bar";
import DashboardLayout from "./molecules/dashboard-layout";
import { Text } from "@/components/ui/text";

function page() {
   return (
      <DashboardLayout>
         <div className="flex flex-col">
            <div style={{background: "#FBFBFB"}}className="w-ful flex flex-row">
               <div className="flex bg-white justify-center w-1/2 items-center mr-2 mt-4 mb-4">
                  <div className="flex flex-col items-center">
                     <div className="rounded-full h-20 w-20 bg-slate-400 mt-6"></div>
                     <p className="text-md font-bold mt-2">Chioma Azuka</p>
                     <p style={{color: "#808080"}} className="mt-1  text-sm">Customer</p>
                     <p style={{color: "#7AB42C"}} className="text-sm font-bold mb-4 py-3">Edit profile</p>
                     </div>
                  
               </div>

               <div className="bg-white justify-center items-start w-1/2 ml-2 mb-4 mt-4">
                  <div className="ml-8">
                     <p style={{color: "#666666"}} className=" text-sm mb-4 mt-4">BILLING ADDRESS</p>
                     <div>
                        <p className="font-bold text-md py-2">Chioma Azuka</p>
                        <p style={{color: "#666666"}}className="text-sm">10, Allen Avenue, Ikeja Lagos State</p>
                     </div>
                     <div className="mt-6 mb-2">
                        <p className="text-sm ">ChiomaAzuka@gmail.com</p>
                        <p className="text-sm">(+234) 805-347 6829</p>
                     </div>
                     <p style={{color: "#7AB42C"}} className="text-sm font-bold mb-4 py-3">Edit Address</p>
                  </div>
               </div>
            </div>
            <div className="w-full bg-slate-500">
               <p>Hello</p>
            </div>
         </div>
      </DashboardLayout>
   );
}

export default page;
