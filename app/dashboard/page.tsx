import React from "react";
import RouteDisplay from "@/components/shared/route-display";
import Container from "@/components/shared/container";
import Sidebar from "./molecules/side-bar";
import DashboardLayout from "./molecules/dashboard-layout";
import { Text } from "@/components/ui/text";
import OrderTableDesktop from "@/components/dashboard/orders-history/OrderTableDesktop";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table"

 
function page() {
   return (
      <DashboardLayout>
         <div className="flex flex-col h-full">
            <div style={{background: "#FBFBFB"
                        
            }}className="w-ful flex flex-row">
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
            <div className="w-full bg-white">
               <div className="flex justify-between items-center px-4 py-1">
                  <h1 className="px-4 py-2 pt-8 text-[15px] font-bold md:pt-4">Recent Order History</h1>
                  <p className="text-sm " style={{color: "#7AB42C"}}>View all</p>
               </div>
            <Table>
               <TableHeader style={{background: "#F2F2F2"}}>
                  <TableRow>
                     <TableHead className="w-[100px]">ORDER ID</TableHead>
                     <TableHead>DATE</TableHead>
                     <TableHead>TOTAL</TableHead>
                     <TableHead >STATUS</TableHead>
                     <TableHead >      </TableHead>

                  </TableRow>
               </TableHeader>
               <TableBody>
                  <TableRow>
                     <TableCell className="font-medium">#738</TableCell>
                     <TableCell>8 Sep 2020</TableCell>
                     <TableCell>$135.00 (5 Products)</TableCell>
                     <TableCell>processing</TableCell>
                     <TableCell style={{color: "#7AB42C"}}>view details</TableCell>

                  </TableRow>
                 
                  <TableRow>
                     <TableCell className="font-medium">#703</TableCell>
                     <TableCell>24 May, 2020</TableCell>
                     <TableCell>$25.00 (1 Product)</TableCell>
                     <TableCell>On the way</TableCell>
                     <TableCell style={{color: "#7AB42C"}}>view details</TableCell>

                  </TableRow>
                  <TableRow>
                     <TableCell className="font-medium">#130</TableCell>
                     <TableCell>22 Oct, 2020</TableCell>
                     <TableCell>$250.00 (4 Products)</TableCell>
                     <TableCell>Completed</TableCell>
                     <TableCell style={{color: "#7AB42C"}}>view details</TableCell>

                  </TableRow>
                  <TableRow>
                     <TableCell className="font-medium">#561</TableCell>
                     <TableCell>1 Feb, 2020</TableCell>
                     <TableCell>$35.00 (1 Products)</TableCell>
                     <TableCell>Completed</TableCell>
                     <TableCell style={{color: "#7AB42C"}}>view details</TableCell>

                  </TableRow>

               </TableBody>
            </Table>

      
            </div>
         </div>
      </DashboardLayout>
   );
}

export default page;
