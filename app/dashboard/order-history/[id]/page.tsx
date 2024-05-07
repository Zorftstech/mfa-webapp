import { AddressData, ORDERHISTORY } from "@/components/dashboard/orders-history/mock-orders";
import DashboardLayout from "../../molecules/dashboard-layout";
import { format } from "date-fns";
import OrderDeail from "@/components/dashboard/orders-history/order-details/OrderDetail";
import CustomStepper from "@/components/shared/stepper/CustomStepper";
import ProcessedOrdersTableDesktop from "@/components/dashboard/orders-history/order-details/ProcessedOrdersTableDesktop";
import ProcessedOrdersTableMobile from "@/components/dashboard/orders-history/order-details/ProcessedOrdersTableMobile";

const Page = () => {
   const OrderDetail = ORDERHISTORY[0];
   return (
      <DashboardLayout removePadding>
         <div className="flex items-center gap-2 border-b px-4 py-4 text-[14px] text-[#4D4D4D]">
            <h1 className="text-[20px] font-[500]">Order Details</h1>
            <p>•</p>
            <p>{format(new Date(OrderDetail.datePurchased), "d LLL, y")}</p>
            <p>•</p>
            <p>
               {OrderDetail.quantityPurchased}
               {OrderDetail.quantityPurchased > 1 ? " Products" : " Product"}
            </p>
         </div>
         <div className="my-4 grid gap-4 px-4 md:grid-cols-[2fr,1fr]">
            <div className="grid rounded-xl border md:grid-cols-2">
               {AddressData.map((address, index) => (
                  <div key={index} className={`${index !== AddressData.length - 1 && "border-r"}`}>
                     <p className="border-b p-4 text-[14px] uppercase text-[#999999]">
                        {address.type}
                     </p>
                     <div className="p-4">
                        <div className="mb-8">
                           <p className="mb-2 text-[16px] leading-[24px] text-[#1A1A1A]">
                              {address.name}
                           </p>
                           <p className="text-[14px] text-[#666666]">{address.address}</p>
                        </div>
                        <div className="mb-2">
                           <p className=" text-[12px] uppercase text-[#999999]">Email</p>
                           <p className="break-all text-[14px] text-[#1A1A1A]">{address.email}</p>
                        </div>
                        <div>
                           <p className="text-[12px] uppercase text-[#999999]">Phone</p>
                           <p className="text-[14px] text-[#1A1A1A]">{address.phone}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <OrderDeail {...OrderDetail} />
         </div>
         <div className="px-4 md:py-12">
            {/* Add your stepper logic */}
            <CustomStepper
               steps={["Order received", "Processing", "En route", "Delivered"]}
               activeStep={2}
            />
         </div>
         <div className="hidden w-full overflow-auto px-4 md:block">
            <ProcessedOrdersTableDesktop />
         </div>
         <div className="px-4 md:hidden">
            <ProcessedOrdersTableMobile />
         </div>
      </DashboardLayout>
   );
};

export default Page;
