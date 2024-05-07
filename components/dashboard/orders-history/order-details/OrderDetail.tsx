const OrderDetail = (OrderDetail: any) => {
   return (
      <div className="rounded-xl border">
         <div className="flex gap-4 border-b p-4">
            <div>
               <p className="mb-[4px] text-[12px] uppercase text-[#999999]">Order ID:</p>
               <p className="text-[14px] text-[#1A1A1A]">#{OrderDetail.orderId}</p>
            </div>
            <div>
               <p className="mb-[4px] text-[12px] uppercase text-[#999999]">Payment Method:</p>
               <p className="text-[14px] text-[#1A1A1A]">Paypal</p>
            </div>
         </div>
         <div className="flex flex-col gap-6 p-4">
            <div className="flex justify-between text-[14px]">
               <p className="text-[#666666]">Subtotal:</p>
               <p className="font-medium ">₦3365.00</p>
            </div>
            <div className="flex justify-between text-[14px]">
               <p className="text-[#666666]">Discount</p>
               <p className="font-medium ">20%</p>
            </div>
            <div className="flex justify-between border-b pb-6 text-[14px]">
               <p className="text-[#666666]">Shipping</p>
               <p className="font-medium ">Free</p>
            </div>
            <div className="flex justify-between text-[18px]">
               <p className="capitalize text-[#1A1A1A]">total</p>
               <p className="font-medium text-[#2C742F]">₦3000.00</p>
            </div>
         </div>
      </div>
   );
};

export default OrderDetail;
