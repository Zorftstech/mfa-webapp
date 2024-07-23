"use client";

import { X } from "lucide-react";
import { Minus, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import tomato from "@/images/tomato.png";
import { PaystackButton } from "react-paystack";

import RouteDisplay from "../../../components/shared/route-display";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { CheckoutForm } from "./molecules/form";
import { PaymentOption } from "./molecules/payment-option";

import { calculateTotalPrice } from "@/app/helper";
import { CartContext } from "@/contexts/cart-context";
import Each from "@/components/helpers/each";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { db } from "@/firebase";
import { z } from "zod";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "sonner";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { usePaystackPayment } from "react-paystack";
import PayWithWalletModal from "@/components/shared/pay-with-wallet";
import { set } from "date-fns";
import { ProcessError } from "@/helper/error";
import axios from "axios";
import Spinner from "@/components/ui/spinner";
import { formatToNaira } from "@/lib/utils";
import { Show } from "@/components/helpers/show";

const formSchema = z.object({
   fname: z.string().min(2, {
      message: "Please enter a First name.",
   }),
   lname: z.string().min(2, {
      message: "Please enter a Last name.",
   }),
   country: z.string().min(2, {
      message: "Please enter a valid country.",
   }),

   state: z.string().min(2, {
      message: "Please enter a valid state.",
   }),
   email: z
      .string()
      .min(2, {
         message: "Please enter a valid email.",
      })
      .email(),
   phone: z.string(),
   streetAddress: z.string().min(2, {
      message: "Please enter a valid street address.",
   }),

   message: z.string(),
});
type formInterface = z.infer<typeof formSchema>;

function Page() {
   const { currentCart, clearCart } = useContext(CartContext);
   const [openWalletModal, setOpenWalletModal] = useState(false);
   const [selectedValue, setSelectedValue] = useState("card");
   const [discount, setDiscount] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const [couponCode, setCouponCode] = useState("");
   const [amount, setAmount] = useState(Number(calculateTotalPrice(currentCart)) * 100);
   const [discountedAmount, setDiscountedAmount] = useState(0);
   const { authDetails } = useStore((state) => state);
   const router = useRouter();
   const form = useForm<formInterface>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         fname: authDetails.firstName || "",
         country: "Nigeria",
         lname: authDetails.lastName || "",
         state: authDetails.addressDetails?.state || "",
         email: authDetails.email || "",
         phone: authDetails.phone || "",
         message: "",
         streetAddress: authDetails.addressDetails?.address || "",
      },
   });

   const publicKey = "pk_test_2f5fe11f645e8ffa062f379d652aef8daf391f82"; // Replace with your Paystack public key
   const [formValues, setFormValues] = React.useState(form.getValues());
   const config = {
      publicKey,
   };

   const initializePayment = usePaystackPayment(config);
   const revokeCouponCodeForUser = async () => {
      setIsLoading(true);
      const payload = {
         couponCode,
         userId: authDetails.id,
         orderTotal: calculateTotalPrice(currentCart),
      };

      try {
         const res = await axios.post("/api/payment/use-coupon", payload);

         toast.success("Coupon code applied successfully!");
      } catch (error) {
         toast.error("Error applying coupon code. Please try again.");
         // ProcessError(error);
      }
      setIsLoading(false);
   };
   function onSubmit(values: formInterface) {
      const onSuccess = (response: any) => {
         toast.success("Payment Successful! Reference: " + response.reference);

         const singleOrder = {
            name: `${values.fname} ${values.lname}`,
            firstName: values.fname,
            lastName: values.lname,
            email: values.email,
            totalAmount: amount,
            address: `${values.streetAddress}, ${values.state}, ${values.country}`,
            message: values.message,
            phone: values.phone,
            paymentReference: `${response.reference}`,
            cartItems: currentCart,
            orderId: `${response.reference}`,
            status: "pending",
            userId: authDetails.id || values.email,
         };
         const createOrder = async () => {
            try {
               const collectionRef = collection(db, "orders");
               await addDoc(collectionRef, singleOrder);
               toast.success("Order created successfully!");
               form.reset();
               clearCart();
               router.push("/shop/categories");
            } catch (error) {
               console.error("Error creating order: ", error);
               toast("Error creating order. Please try again.");
            }
         };
         if (response.status === "success") {
            createOrder();
            revokeCouponCodeForUser();
         }
      };
      const onClose = () => {
         toast.info("Payment Closed");
      };
      setFormValues(values);
      initializePayment({
         onClose,
         onSuccess,
         config: {
            email: values.email,
            reference: "MFA" + Math.floor(Math.random() * 100000000000000 + 1375),
            amount: discountedAmount <= 0 ? amount : Number(discountedAmount.toFixed(0)) * 100,
            currency: "NGN",
            metadata: {
               custom_fields: [
                  {
                     display_name: values.fname,
                     variable_name: "name",
                     value: values.fname,
                  },
               ],
            },
         },
      });
   }
   const checkIfCouponCodeIsValidForUser = async () => {
      setIsLoading(true);
      const payload = {
         couponCode,
         userId: authDetails.id,
         orderTotal: calculateTotalPrice(currentCart),
      };

      try {
         const res = await axios.post("/api/payment/use-coupon/check", payload);
         if (res.data.used) {
            toast.error("Coupon code has already been used by You");

            throw new Error("Coupon code has already been used by You");
         }
         setDiscount(res.data.discountAmount);
         console.log(amount);
         setDiscountedAmount(amount / 100 - res.data.discountAmount);

         toast.success("Coupon code applied successfully!");
      } catch (error) {
         console.error("Error updating wallet:", error);
         // ProcessError(error);
      }
      setIsLoading(false);
   };

   return (
      <div className="pt-[69px]">
         <RouteDisplay route={"Shopping cart"} />
         <Container backgroundColor="bg-gray-100">
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <div className="flex w-full flex-col items-start justify-between gap-4 px-4 md:flex-row">
                  <div className="mt-6 w-full flex-[4] bg-white p-3">
                     <CheckoutForm form={form} onSubmit={onSubmit} />
                  </div>
                  <div className="flex w-full md:w-auto md:flex-[2] ">
                     <div className="mt-6 w-full bg-white p-4">
                        <Text size={"lg"} weight={"medium"}>
                           Order Summary
                        </Text>
                        <Each
                           of={currentCart}
                           render={(item) => (
                              <div className="my-2 flex items-center justify-between">
                                 <div className="p-3">
                                    <Image
                                       src={item.image}
                                       alt={item.name}
                                       className="h-10 w-10"
                                       width={12}
                                       height={12}
                                    />
                                    <Text size={"sm"} weight={"medium"}>
                                       {item.name}
                                    </Text>
                                 </div>
                                 <Text size={"sm"} weight={"medium"}>
                                    {item.no_of_items} x ₦{item.price.toLocaleString()}
                                 </Text>
                              </div>
                           )}
                        />
                        <Separator />
                        <div className="mt-3 flex items-center justify-between">
                           <Text size={"sm"} weight={"medium"}>
                              Subtotal:
                           </Text>
                           <Text size={"sm"} weight={"medium"}>
                              ₦{calculateTotalPrice(currentCart).toLocaleString()}
                           </Text>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                           <Text size={"sm"} weight={"medium"}>
                              Shipping:
                           </Text>
                           <Text size={"sm"} weight={"medium"}>
                              Free
                           </Text>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                           <Text size={"sm"} weight={"medium"}>
                              Total:
                           </Text>
                           <Text size={"sm"} weight={"medium"}>
                              ₦{calculateTotalPrice(currentCart).toLocaleString()}
                           </Text>
                        </div>
                        <Show>
                           <Show.When isTrue={discount > 0}>
                              <div className="mt-3 flex items-center justify-between">
                                 <Text size={"sm"} weight={"medium"}>
                                    Discount:
                                 </Text>
                                 <Text size={"sm"} weight={"medium"}>
                                    {formatToNaira(discount)}
                                 </Text>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                 <Text size={"sm"} weight={"medium"}>
                                    New Total:
                                 </Text>
                                 <Text size={"sm"} weight={"medium"}>
                                    {formatToNaira(discountedAmount)}
                                 </Text>
                              </div>
                           </Show.When>
                        </Show>
                        <Separator className="my-3" />
                        {/* <Button className="mb-3 mt-5 w-full rounded-3xl px-4 text-xs">Proceed to checkout</Button> */}
                        <Text size={"md"} weight={"semibold"}>
                           Payment Method
                        </Text>
                        <RadioGroup className="my-3" defaultValue="card">
                           <div
                              className="flex items-center space-x-2"
                              onClick={() => setSelectedValue("wallet")}
                           >
                              <RadioGroupItem value="wallet" id="r1" />
                              <Label htmlFor="r1">From Wallet Balance</Label>
                           </div>
                           <div
                              className="flex items-center space-x-2"
                              onClick={() => setSelectedValue("card")}
                           >
                              <RadioGroupItem value="card" id="r2" />
                              <Label htmlFor="r2">Debit Card or Bank Transfer</Label>
                           </div>
                        </RadioGroup>
                        <div>
                           <p>
                              <Text size={"sm"} weight={"medium"}>
                                 Coupon Code
                              </Text>
                              <Input
                                 value={couponCode}
                                 onChange={(e) => setCouponCode(e.target.value.trim())}
                              />

                              <Button
                                 onClick={checkIfCouponCodeIsValidForUser}
                                 disabled={isLoading || discount > 0}
                                 className="mt-3 w-full rounded-3xl px-4 text-xs"
                              >
                                 {isLoading ? (
                                    <Spinner color="green" className="mx-auto w-4" />
                                 ) : (
                                    "Apply"
                                 )}
                              </Button>
                           </p>
                        </div>

                        <Button
                           onClick={() => {
                              if (selectedValue === "wallet") {
                                 setOpenWalletModal(true);
                              } else {
                                 form.handleSubmit(onSubmit)();
                              }
                           }}
                           className="mb-3 mt-5 w-full rounded-3xl px-4 text-xs"
                        >
                           Place Order
                        </Button>
                     </div>
                  </div>
               </div>
               <PayWithWalletModal
                  open={openWalletModal}
                  setOpen={setOpenWalletModal}
                  amount={discountedAmount <= 0 ? amount/100 : Number(discountedAmount.toFixed(0))}
                  orderDetails={{
                     address: `${form.getValues().streetAddress}, ${form.getValues().state}, ${form.getValues().country}`,
                     message: form.getValues().message,
                     phone: form.getValues().phone,
                     cartItems: currentCart,
                  }}
               />
            </main>
         </Container>
      </div>
   );
}

export default Page;
