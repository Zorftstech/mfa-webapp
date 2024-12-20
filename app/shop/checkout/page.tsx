"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import useWindowDimensions from "@/hooks/useWindowDimensions";
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
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import PayWithWalletModal from "@/components/shared/pay-with-wallet";
import axios from "axios";
import Spinner from "@/components/ui/spinner";
import { addProductsToUserSoTheyCanReview, formatToNaira } from "@/lib/utils";
import { Show } from "@/components/helpers/show";
import useDeliveryFees from "../hooks/delivery-fees/useDelivery-fees";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import EmptyContentWrapper from "@/hoc/EmptyContentWrapper";
import { useCreateUserRequest } from "@/lib/hooks/request";
import { callback, HookConfig } from "react-paystack/dist/types";

// Form validation schema using zod
const formSchema = z.object({
   fname: z.string().min(2, { message: "Please enter a First name." }),
   lname: z.string().min(2, { message: "Please enter a Last name." }),
   country: z.string().min(2, { message: "Please enter a valid country." }),
   state: z.string().min(2, { message: "Please enter a valid state." }),
   email: z.string().email({ message: "Please enter a valid email." }),
   phone: z.string(),
   streetAddress: z.string().min(2, { message: "Please enter a valid street address." }),
   message: z.string(),
});

type formInterface = z.infer<typeof formSchema>;

function PaystackButton({
   hookConfig,
   onClose,
   onSuccess,
}: {
   hookConfig: HookConfig;
   onClose: callback;
   onSuccess: callback;
}) {

   const isBrowser = typeof window !== 'undefined';

   if (!isBrowser) {
     return null;
   }
 
   // Import your Paystack-related code here
   const { usePaystackPayment } = require('react-paystack')
   const initializePayment = usePaystackPayment(hookConfig);
   const router = useRouter();
   const { loggedIn } = useStore((state) => state);

   const onSubmit = async () => {
      initializePayment({
         onClose,
         onSuccess,
      });
   };
   return (
      <Button
         onClick={() => {
            if (!loggedIn) {
               toast.warning("Please login to place an order");
               router.push("/account/signin?redirect=/shop/checkout");
               return;
            }
            onSubmit();
         }}
         className="mb-3 mt-5 w-full rounded-3xl px-4 text-xs"
      >
         Place Order
      </Button>
   );
}

function Page() {
   const { currentCart, clearCart } = useContext(CartContext);
   const { data: deliveryFees, isLoading: fetchingShippingRates, isSuccess } = useDeliveryFees();
   const shippingRates = deliveryFees || [];
   const [openWalletModal, setOpenWalletModal] = useState(false);
   const [selectedValue, setSelectedValue] = useState("card");
   const [discount, setDiscount] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const [couponCode, setCouponCode] = useState("");
   const [selectedShippingRate, setSelectedShippingRate] = useState(0);
   const [selectedShipping, setSelectedShipping] = useState("");
   const { authDetails, loggedIn } = useStore((state) => state);

   const [isOpen, setOpen] = useState(false);



   const { create } = useCreateUserRequest("sales");

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

   const calculateAmounts = () => {
      const cartTotal = calculateTotalPrice(currentCart);
      const shippingTotal = selectedShippingRate;
      const total = cartTotal + shippingTotal;
      const discountAmount = discount;
      const finalAmount = total - discountAmount;
      return { total, discountAmount, finalAmount };
   };

   const { total, discountAmount, finalAmount } = calculateAmounts();

   const config = {
      publicKey,
      email: authDetails?.email,
      reference: "MFA" + Math.floor(Math.random() * 100000000000000 + 1375),
      currency: "NGN",
      amount: finalAmount * 100,

      // metadata: {
      //    custom_fields: [
      //       {
      //          display_name: authDetails.firstName,
      //          variable_name: "name",
      //          value: authDetails.lastName,
      //       },
      //    ],
      // },
   };

   // const config = { publicKey };

   const applyCouponCode = async () => {
      setIsLoading(true);
      const payload = {
         couponCode,
         userId: authDetails.id,
         orderTotal: total,
      };

      try {
         const res = await axios.post("/api/payment/use-coupon", payload);
         setDiscount(Number(Number(res.data.discountAmount).toFixed(0)));
         toast.success("Coupon code applied successfully!");
      } catch (error) {
         toast.error("Error applying coupon code. Please try again.");
      }
      setIsLoading(false);
   };


   const onSuccess = async (response: any) => {
      toast.success("Payment Successful! Reference: " + response.reference);

      // const singleOrder = {
      //    name: `${values.fname} ${values.lname}`,
      //    firstName: values.fname,
      //    lastName: values.lname,
      //    email: values.email,
      //    totalAmount: finalAmount,
      //    address: `${values.streetAddress}, ${values.state}, ${values.country}`,
      //    message: values.message,
      //    phone: values.phone,
      //    paymentReference: `${response.reference}`,
      //    cartItems: currentCart,
      //    orderId: `${response.reference}`,
      //    status: "pending",
      //    userId: authDetails.id || values.email,
      //    created_date: serverTimestamp(),
      // };

      //create loystar user
      // const payloadLoystar = {
      //    first_name: values?.fname,
      //    last_name: values.lname,
      //    email: values.email,
      //    phone_number: values.phone,
      //    date_of_birth: "23-04-1980",
      //    sex: "M",
      //    local_db_created_at: "NiL",
      //    address_line1: values?.streetAddress,
      //    address_line2: "NIL",
      //    postcode: "00",
      //    state: values.state,
      //    country: values.country || "Nigeria",
      // };

      const loystarUserId = localStorage.getItem("loystarUserId")

     // console.log({ currentCart, selectedShipping });
      const orderedItem  = currentCart?.map((item) => {
         return {
            product_id : Number(item?.loystarId),
            quantity: Number(item?.no_of_items),
            user_id: Number(loystarUserId),
            amount: item?.price,
            merchant_id: 21750,
          //  custom_quantity_id: item?.loystarUnitId || ''  ,
          //  "merchant_loyalty_program_id": ""


         }
      })

  //    return;



      // merchant id
      // const responseData =    await create({payload:payloadLoystar, infunctionParam:`add_user_for_merchant/21750`});
    

     

      // create loystar order

      // const createOrder = async () => {
      //    try {
      //       const collectionRef = collection(db, "orders");
      //       await addDoc(collectionRef, singleOrder);
      //       await addProductsToUserSoTheyCanReview(authDetails.id!, currentCart);
      //       toast.success("Order created successfully!");

      //       form.reset();
      //       clearCart();

      //       router.push("/shop/categories");
      //    } catch (error) {
      //       console.error("Error creating order: ", error);
      //       toast("Error creating order. Please try again.");
      //    }
      // };
      if (response.status === "success") {
         //console.log("res", response)
         // createOrder();
        
         await create({
            payload: {
               "sale": {
                // "user_id": Number(loystarUserId),
               //   "shared_loyalty_txn": true,
               //   "instant_reward_loyalty_txn": false,
               //   "device_id": "",
               //   "discount_amount": 50.5,
                 "is_paid_with_cash": false,
                 "is_paid_with_card": true,
                 "is_paid_with_mobile": false,
                // "is_paid_with_mtransfer": false,
                 //"is_paid_with_point": false,
                  //"is_paid_with_customer_account": true,
                  // "business_branch_id": '',
               //   "payment_label_id": 12,
                "payment_reference": response.reference,
               //   "card_payment_ref": "",
                // "channel": "web",
               // "created_at": new Date().toISOString(),
               //   "loyalty_id": 67,
               //   "itranfer": "",
               //   "reference_code": "REF-9876",
               //   "mtier_amount": 100.0,
               //   "credit_customer_loyalty": true,
                 "transactions": orderedItem
               }
             }
             
             
            
         });
         if (couponCode) {
            applyCouponCode();
         }
      }
   };

   const onClose = () => {
      toast.info("Payment Closed");
   };

   const checkIfCouponCodeIsValidForUser = async () => {
      setIsLoading(true);
      const payload = {
         couponCode,
         userId: authDetails.id,
         orderTotal: total,
      };

      try {
         const res = await axios.post("/api/payment/use-coupon/check", payload);
         if (res.data.used) {
            toast.error("Coupon code has already been used by You");

            throw new Error("Coupon code has already been used by You");
         }
         setDiscount(Number(Number(res.data.discountAmount).toFixed(0)));
         toast.success("Coupon code applied successfully!");
      } catch (error) {
         toast.error("Error applying coupon code");
         console.error("Error checking coupon code:", error);
      }
      setIsLoading(false);
   };

   const handleShippingChange = (value: string) => {
      setSelectedShipping(value);
      const selectedRate = shippingRates.find((item) => item.slug === value)?.price || 0;
      setSelectedShippingRate(selectedRate);
      // if (couponCode) {
      //    checkIfCouponCodeIsValidForUser();
      // }
   };

   useEffect(() => {
      if (isSuccess && shippingRates.length > 0) {
         const defaultShipping = shippingRates.find((item) => item.slug === "nationwide");
         if (defaultShipping) {
            setSelectedShipping(defaultShipping.slug);
            setSelectedShippingRate(defaultShipping.price);
         }
      }
   }, [fetchingShippingRates, isSuccess]);

   function onToggle() {
      setOpen(!isOpen);
   }
   return (
      <div className="pt-[69px]">
         <head>
            <title>Checkout | MyFoodAngels</title>
            <meta
               name="description"
               content="Complete your purchase at MyFoodAngels. Review your order, apply discount codes, and choose your preferred payment method."
            />
            <meta
               name="keywords"
               content="MyFoodAngels, Checkout, Online Shopping, Food Delivery, Secure Payment, Grocery Shopping"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/icon.png" />
            <meta property="og:title" content="Checkout | MyFoodAngels" />
            <meta
               property="og:description"
               content="Complete your purchase at MyFoodAngels. Review your order, apply discount codes, and choose your preferred payment method."
            />
            <meta property="og:url" content="https://myfoodangels.com/shop/checkout" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/og.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Checkout | MyFoodAngels" />
            <meta
               property="twitter:description"
               content="Complete your purchase at MyFoodAngels. Review your order, apply discount codes, and choose your preferred payment method."
            />
            <meta property="twitter:image" content="/og.jpg" />
         </head>

         <RouteDisplay route={"Shopping cart"} />
         <Container backgroundColor="bg-gray-100">
            <EmptyContentWrapper
               isEmpty={currentCart && currentCart?.length <= 0}
               customMessage="Empty Cart"
               className="flex h-full w-full items-center justify-center py-12 "
            >
               <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
                  <div className="flex w-full flex-col items-start justify-between gap-4 px-4 md:flex-row">
                     <div className="mt-6 w-full flex-[4] bg-white p-3">
                        <CheckoutForm />

                     </div>
                     <div className="flex w-full md:w-auto md:flex-[2]">
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
                                 {formatToNaira(calculateTotalPrice(currentCart))}
                              </Text>
                           </div>
                           <div className="mt-3 flex items-center justify-between">
                              <Text size={"sm"} weight={"medium"}>
                                 Shipping:
                              </Text>
                              <Select onValueChange={handleShippingChange} value={selectedShipping}>
                                 <SelectTrigger className="w-[70%] px-4 py-3 text-sm transition-all duration-300 ease-in-out placeholder:text-lg focus-within:text-black">
                                    <SelectValue placeholder="Select a shipping location" />
                                 </SelectTrigger>
                                 <SelectContent className="bg-primary-2">
                                    {shippingRates?.map((item, index) => (
                                       <SelectItem
                                          value={item.slug}
                                          className="cursor-pointer py-3 text-sm  text-white transition-all duration-100 ease-linear hover:text-black"
                                          key={index}
                                       >
                                          {item.location} - {formatToNaira(item.price)}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           </div>
                           <div className="mt-3 flex items-center justify-between">
                              <Text size={"sm"} weight={"medium"}>
                                 Total:
                              </Text>
                              <Text size={"sm"} weight={"medium"}>
                                 {formatToNaira(total)}
                              </Text>
                           </div>
                           <Show>
                              <Show.When isTrue={discount > 0}>
                                 <div className="mt-3 flex items-center justify-between">
                                    <Text size={"sm"} weight={"medium"}>
                                       Discount:
                                    </Text>
                                    <Text size={"sm"} weight={"medium"}>
                                       {formatToNaira(discountAmount)}
                                    </Text>
                                 </div>
                                 <div className="mt-3 flex items-center justify-between">
                                    <Text size={"sm"} weight={"medium"}>
                                       New Total:
                                    </Text>
                                    <Text size={"sm"} weight={"medium"}>
                                       {formatToNaira(finalAmount)}
                                    </Text>
                                 </div>
                              </Show.When>
                           </Show>
                           <Separator className="my-3" />
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
                                    disabled={isLoading || discount > 0 || !couponCode}
                                    className="mt-3 w-full rounded-3xl px-4 text-xs disabled:cursor-not-allowed disabled:opacity-70"
                                 >
                                    {isLoading ? (
                                       <Spinner color="green" className="mx-auto w-4" />
                                    ) : (
                                       "Apply"
                                    )}
                                 </Button>
                              </p>
                           </div>

                           {selectedValue === "wallet" ? (
                              <Button
                                 onClick={() => {
                                    if (!loggedIn) {
                                       toast.warning("Please login to place an order");
                                       router.push("/account/signin?redirect=/shop/checkout");
                                       return;
                                    }

                                    setOpenWalletModal(true);
                                 }}
                                 className="mb-3 mt-5 w-full rounded-3xl px-4 text-xs"
                              >
                                 Place Order
                              </Button>
                           ) : (
                              <PaystackButton
                                 onClose={onClose}
                                 onSuccess={onSuccess}
                                 hookConfig={config}
                              />
                           )}

                        </div>
                     </div>
                  </div>
                  <PayWithWalletModal
                     open={openWalletModal}
                     setOpen={setOpenWalletModal}
                     amount={finalAmount}
                     orderDetails={{
                        address: `${form.getValues().streetAddress}, ${form.getValues().state}, ${form.getValues().country}`,
                        message: form.getValues().message,
                        phone: form.getValues().phone,
                        cartItems: currentCart,
                     }}
                     revokeCouponCodeForUser={applyCouponCode}
                     couponCode={couponCode}
                  />
               </main>
            </EmptyContentWrapper>
         </Container>
         {isOpen && <SuccessModal close={onToggle} />}
      </div>
   );
}

export default Page;

function SuccessModal({ close }: { close: () => void }) {
   return (
      <div onClick={close} className="fixed inset-0 z-[99999] h-full w-full bg-white/60">
         <div
            onClick={(e) => e.stopPropagation()}
            className="fle absolute inset-0 m-auto w-[95%] max-w-2xl flex flex-col items-center h-fit justify-center gap-y-10 rounded-xl bg-white py-10  px-6"
         >
            <h2 className="text-xl text-center font-semibold">Your Order has been placed successfully 🎁</h2>

            <button onClick={close} className="rounded-xl bg-primary-2 px-4 py-2 text-white">
               Close
            </button>
         </div>
      </div>
   );
}
