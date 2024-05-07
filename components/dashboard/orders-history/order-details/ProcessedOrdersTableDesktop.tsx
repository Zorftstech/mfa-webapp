import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import React from "react";
import { ORDERHISTORY } from "../mock-orders";
import Image from "next/image";
import SampleProductImg from "@/public/images/orders/sample-product.png";

const ProcessedOrdersTableDesktop = () => {
   const mockData = ORDERHISTORY.slice(0, 3);
   const TableHeadings = ["Product", "Price", "Quantity", "Subtotal"];
   return (
      <Table className="w-full py-[0px]">
         <TableHeader className="bg-[#F2F2F2]">
            <TableRow className="border-none px-6">
               {TableHeadings.map((heading, idx) => (
                  <TableHead key={idx} className="text-xs uppercase">
                     {heading}
                  </TableHead>
               ))}
            </TableRow>
         </TableHeader>
         <TableBody>
            {mockData.map((order, idx) => (
               <TableRow className="border-none text-[#333333]" key={idx}>
                  <TableCell className="flex items-center gap-2">
                     <Image
                        alt="product-image"
                        src={SampleProductImg}
                        className="h-[45px] w-[45px]"
                     />
                     <span>{order.orderId}</span>
                  </TableCell>
                  <TableCell className="">₦{order.total}</TableCell>
                  <TableCell>x{order.quantityPurchased}</TableCell>
                  <TableCell className="">₦{order.total}</TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   );
};

export default ProcessedOrdersTableDesktop;
