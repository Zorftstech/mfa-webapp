"use client";
import { Copy, Eye, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useStore from "@/store";
import axios from "axios";
import ProcessError from "@/lib/error";
import Spinner from "@/components/ui/spinner";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import { formatToNaira } from "@/lib/utils";
import { usePaystackPayment } from "react-paystack";
import { callback, HookConfig } from "react-paystack/dist/types";

const formSchema = z.object({
   amount: z.number().min(3, {
      message: "Amount must be at least 3 characters.",
   }),
});
type formInterface = z.infer<typeof formSchema>;


function PaystackButton({
   amount,
   setShowFundForm,
   setIsVerifying,
   refetchWalletBalance,
   refetchTransactions
}: {
   amount: number;
   setShowFundForm: React.Dispatch<React.SetStateAction<boolean>>;
   setIsVerifying: React.Dispatch<React.SetStateAction<boolean>>;
   refetchWalletBalance: () => void;
   refetchTransactions:() => void;
}) {

   const isBrowser = typeof window !== 'undefined';

   if (!isBrowser) {
     return null;
   }

   const { loggedIn, authDetails } = useStore((state) => state);

   const hookConfig =   {
     publicKey: "pk_test_2f5fe11f645e8ffa062f379d652aef8daf391f82", // Replace with your Paystack public key
      email: authDetails.email!,
      reference: "MFA" + Math.floor(Math.random() * 100000000000000000 + 165538),
      amount: amount * 100,
      currency: "NGN",
    
   }

   const onClose = () => {
      toast.info("Payment Closed");
   };

   const onSuccess = (response: any) => {
      const updateWallet = async () => {
         setIsVerifying(true);
         const payload = {
            email: authDetails.email,
            amount: amount,
            reference: response.reference,
            name: `${authDetails.firstName} ${authDetails.lastName}`,
            firstName: authDetails.firstName,
            lastName: authDetails.lastName,
            userId: authDetails.id,
            status: response.status,
            transId: response.trans,
         };

         try {
            await axios.post("/api/payment/credit-wallet", payload);
            refetchWalletBalance();
            refetchTransactions();
            toast.success("Wallet updated successfully");
         } catch (error) {
            console.error("Error updating wallet:", error);
            toast.error("Error updating wallet. Please try again.");
         }
         setIsVerifying(false);
      };
      updateWallet();

      setShowFundForm(false);
   };
 
   // Import your Paystack-related code here
   const { usePaystackPayment } = require('react-paystack')
   const initializePayment = usePaystackPayment(hookConfig);
   // const router = useRouter();


   const onSubmit = async () => {
      initializePayment({
         onClose,
         onSuccess,
      });
   };
   return (
      <Button className="col-span-2  rounded-2xl" type="submit" disabled={amount <= 0}>
      { "Fund"}
   </Button>
   );
}
const WalletCard = ({ refetchTransactions }: { refetchTransactions: () => void }) => {
   const [showFundForm, setShowFundForm] = useState(false);
   const [isPending, setIsPending] = useState(false);
   const [isVerifying, setIsVerifying] = useState(false);
   const [amount, setAmount] = useState(0)
   const form = useForm<formInterface>({
      resolver: zodResolver(formSchema),
   });
  
  

   const { authDetails } = useStore((store) => store);
   const { data: walletBalance, refetch: refetchWalletBalance } = useQueryCollectionByField(
      "wallets",
      "userId",
      authDetails.id ?? "",
   );

   function onSubmit(values: formInterface) {
      setIsPending(true);


   
     
      setIsPending(false);
   }







   if (!showFundForm)
      return (
         <div className="h-55 w-85 mb-5 ml-5 mt-5 flex flex-col justify-between rounded-3xl bg-gradient-to-r from-[#72a929] to-[#83bf33] p-4">
            <div>
               <p className="mb-6 text-sm font-normal text-white">Account balance</p>
               {isVerifying ? (
                  <Spinner className="m-4" />
               ) : (
                  <h2 className="mb-6 mr-4 text-4xl font-bold text-white">
                     {formatToNaira(walletBalance?.[0]?.balance ?? 0)}
                     <Eye className="ml-4 inline-block cursor-pointer align-middle" size={24} />
                  </h2>
               )}
            </div>
            <div>
               <button
                  onClick={() => setShowFundForm(true)}
                  className="w-15 flex items-center rounded-2xl bg-white px-4 py-2 text-[#565656]"
               >
                  Fund
                  <Plus className="ml-2 text-[#7AB42C]" size={18} />
               </button>
            </div>
         </div>
      );

   return (
      <>
        
            <div
             
               className="grid w-full grid-cols-1 gap-4 p-4"
            >
              <Input
                              className="rounded-2xl border border-gray-100 bg-gray-100"
                              placeholder="Amount"
                         
                              type="number"
                              onChange={(e) => {
                                 const value = e.target.valueAsNumber;
                                 setAmount(value)
                              }}
                              value={amount}
                           />

                                 <PaystackButton amount={amount}
                                 
                                 refetchTransactions={refetchTransactions}
                                 refetchWalletBalance={refetchWalletBalance}
                                 setShowFundForm={setShowFundForm} setIsVerifying={setIsVerifying}/>
            </div>
     
      </>
   );
};

export default WalletCard;
