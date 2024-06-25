"use client";
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
} from "@/components/ui/table";
import { format } from "date-fns";
import Link from "next/link";
import profile from "@/images/account.png";
import Image from "next/image";
import useStore from "@/store";

const orderHistory = [
   {
      orderId: "ORD123456",
      datePurchased: "2024-04-01",
      total: 59.99,
      quantityPurchased: 2,
      transactionStatus: "completed",
   },
   {
      orderId: "ORD123457",
      datePurchased: "2024-04-03",
      total: 120.0,
      quantityPurchased: 1,
      transactionStatus: "processing",
   },
   {
      orderId: "ORD123458",
      datePurchased: "2024-04-07",
      total: 35.5,
      quantityPurchased: 4,
      transactionStatus: "on the way",
   },
   {
      orderId: "ORD123459",
      datePurchased: "2024-04-10",
      total: 89.95,
      quantityPurchased: 3,
      transactionStatus: "completed",
   },
];

function Page() {
   const { authDetails, setLoggedIn, setCurrentUser, setAuthDetails } = useStore((store) => store);
   console.log(authDetails);

   return (
      <DashboardLayout backgroundColor="bg-transparent">
         <div className="flex h-full flex-col px-4 md:px-0">
            <div className="flex w-full flex-col gap-4 bg-gray-100 pb-4 md:flex-row">
               <div className="flex w-full flex-1 items-center justify-center bg-white">
                  <div className="flex flex-col items-center">
                     <div className="mt-6 h-20 w-20 rounded-full">
                        <Image
                           src={authDetails?.photoURL || ""}
                           alt="Profile Image"
                           className="h-auto w-auto rounded-full"
                           width={300}
                           height={300}
                        />
                     </div>
                     <Text size={"md"} weight={"semibold"}>
                        {authDetails?.firstName || ""} {authDetails?.lastName || ""}
                     </Text>
                     <Text size={"sm"}>Customer</Text>
                     <Link
                        href={"/dashboard/settings"}
                        className="mb-4 py-3 text-sm font-bold text-[#7AB42C]"
                     >
                        Edit profile
                     </Link>
                  </div>
               </div>

               <div className="w-full flex-1 items-start justify-center bg-white p-4">
                  <Text size={"sm"} className=" text-gray-600">
                     BILLING ADDRESS
                  </Text>
                  <div>
                     <Text size={"md"} weight={"bold"}>
                        {authDetails?.firstName || ""} {authDetails?.lastName || ""}
                     </Text>
                     <Text size={"sm"} className="text-gray-600">
                        {authDetails.addressDetails?.address || ""}{" "}
                        {authDetails.addressDetails?.state || ""}{" "}
                        {authDetails.addressDetails?.country || ""}{" "}
                        {authDetails.addressDetails?.zipcode || ""}
                     </Text>
                  </div>
                  <div className="mb-2 mt-6">
                     <Text size={"sm"}>{authDetails.email}</Text>
                     <Text size={"sm"}>{authDetails.phone || "Add Phone Number"}</Text>
                  </div>
                  <Link
                     href={"/dashboard/settings"}
                     className="mb-4 py-3 text-sm font-bold text-[#7AB42C]"
                  >
                     Edit Address
                  </Link>
               </div>
            </div>
            <div className="w-full bg-white p-4">
               <div className="flex items-center justify-between p-4">
                  <h1 className="text-[15px] font-bold">Recent Order History</h1>
                  <p className="text-sm text-[#7AB42C]">View all</p>
               </div>
               <div className="hidden w-full min-w-[500px] md:table">
                  <Table>
                     <TableHeader style={{ background: "#F2F2F2" }}>
                        <TableRow>
                           <TableHead className="w-[100px]">ORDER ID</TableHead>
                           <TableHead>DATE</TableHead>
                           <TableHead>TOTAL</TableHead>
                           <TableHead>STATUS</TableHead>
                           <TableHead> </TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow>
                           <TableCell className="font-medium">#738</TableCell>
                           <TableCell>8 Sep 2020</TableCell>
                           <TableCell>$135.00 (5 Products)</TableCell>
                           <TableCell>processing</TableCell>
                           <TableCell style={{ color: "#7AB42C" }}>view details</TableCell>
                        </TableRow>

                        <TableRow>
                           <TableCell className="font-medium">#703</TableCell>
                           <TableCell>24 May, 2020</TableCell>
                           <TableCell>$25.00 (1 Product)</TableCell>
                           <TableCell>On the way</TableCell>
                           <TableCell style={{ color: "#7AB42C" }}>view details</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell className="font-medium">#130</TableCell>
                           <TableCell>22 Oct, 2020</TableCell>
                           <TableCell>$250.00 (4 Products)</TableCell>
                           <TableCell>Completed</TableCell>
                           <TableCell style={{ color: "#7AB42C" }}>view details</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell className="font-medium">#561</TableCell>
                           <TableCell>1 Feb, 2020</TableCell>
                           <TableCell>$35.00 (1 Products)</TableCell>
                           <TableCell>Completed</TableCell>
                           <TableCell style={{ color: "#7AB42C" }}>view details</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </div>
               <div className="flex flex-col gap-2 md:hidden">
                  {orderHistory.map((order, idx) => (
                     <div
                        key={idx}
                        className="grid grid-cols-[2fr,2fr,1.5fr] items-end gap-2 rounded-[16px] bg-slate-50 px-4 py-6"
                     >
                        <div>
                           <p className="mb-2 text-[14px] font-semibold text-[#1a1a1a]">
                              {order.orderId}
                           </p>
                           <p className="text-[10px] font-[400] text-[#828282]">
                              {format(new Date(order.datePurchased), "d LLL, y")}
                           </p>
                        </div>
                        <div>
                           <p className="mb-2 text-[14px] font-semibold text-[#1a1a1a]">
                              ₦{order.total}{" "}
                              <span className="text-[12px] font-[400]">
                                 ({order.quantityPurchased}
                                 {order.quantityPurchased > 1 ? " Products" : " Product"})
                              </span>
                           </p>
                           <p className="text-[10px] font-[400] capitalize text-[#333333]">
                              {order.transactionStatus}
                           </p>
                        </div>
                        <Link
                           href="/dashboard/order-history/something"
                           className="text-right text-[12px] font-medium text-[#7AB42C] hover:cursor-pointer hover:underline"
                        >
                           View Details
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
}

export default Page;
