import { ORDERHISTORY } from "../mock-orders";
import Image from "next/image";
import SampleProductImg from "@/public/images/orders/sample-product.png";

const ProcessedOrdersTableMobile = () => {
   const mockData = ORDERHISTORY.slice(0, 3);
   return (
      <div className="mb-8 flex flex-col gap-4">
         {mockData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 rounded-xl bg-slate-100 p-4">
               <Image alt="product-image" src={SampleProductImg} className="h-[80px] w-[80px]" />
               <div>
                  <p className="mb-2 text-[14px] font-[500] text-[#1A1A1A]">{item.orderId}</p>
                  <div className="flex items-end gap-4">
                     <p className="text-[10px] text-[#767676]">
                        Price:{" "}
                        <span className="text-[14px] font-[500] text-[#1A1A1A]">₦{item.total}</span>
                     </p>
                     <p className="text-[10px] text-[#767676]">
                        Qty:{" "}
                        <span className="text-[14px] font-[500] text-[#1A1A1A]">
                           {item.quantityPurchased}
                        </span>
                     </p>
                  </div>
                  <p className="text-[10px] text-[#767676]">
                     Sub total:{" "}
                     <span className="text-[14px] font-[500] text-[#1A1A1A]">₦{item.total}</span>
                  </p>
               </div>
            </div>
         ))}
      </div>
   );
};

export default ProcessedOrdersTableMobile;
