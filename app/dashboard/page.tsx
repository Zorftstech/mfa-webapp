import React from "react";
import RouteDisplay from "@/components/shared/route-display";
import Container from "@/components/shared/container";
import Sidebar from "./molecules/side-bar";
import DashboardLayout from "./molecules/dashboard-layout";
import { Text } from "@/components/ui/text";
import OrderTableDesktop from "@/components/dashboard/orders-history/OrderTableDesktop";

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
            <h1 className="px-4 py-4 pt-8 text-[20px] font-[500] md:pt-4">Order History</h1>
         <div className="hidden w-full overflow-auto md:block">
            <OrderTableDesktop />
         </div>

         <div className="flex flex-col gap-2 md:hidden">
            {pagedData.map((order, idx) => (
               <div
                  key={idx}
                  className="grid grid-cols-[2fr,2fr,1.5fr] items-end gap-2 rounded-[16px] bg-slate-100 px-4 py-6"
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
         <div className="my-12 flex flex-col items-center">
            <div className="flex items-center gap-2">
               <Button
                  aria-disabled={isLessThanFirstPage}
                  disabled={isLessThanFirstPage}
                  className={btnClassName}
                  onClick={handlePrevious}
               >
                  <Icon icon="iconamoon:arrow-left-2" width="32" height="32" />
               </Button>
               {pageNumbers.map((page, idx) => (
                  <Button
                     className={`buttonStyle button h-[45px] w-[45px] rounded-full ${page === currentPage ? "bg-[#7AB42C] text-white" : "bg-white text-[#666666]"} text-[16px]`}
                     onClick={() => {
                        if (currentPage !== page) setCurrentPage(page);
                     }}
                     key={idx}
                  >
                     <span className="">{page}</span>
                  </Button>
               ))}
               <Button
                  aria-disabled={isGreaterThanDataLength}
                  disabled={isGreaterThanDataLength}
                  className={btnClassName}
                  onClick={handleNext}
               >
                  <Icon icon="iconamoon:arrow-right-2" width="32" height="32" />
               </Button>
            </div>
         </div>
            </div>
         </div>
      </DashboardLayout>
   );
}

export default page;
