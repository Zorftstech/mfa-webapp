// components/PayWithWalletModal.tsx
import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight, Configure } from "react-instantsearch";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Eye, Filter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { set } from "date-fns";
import useStore from "@/store";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import { formatToNaira } from "@/lib/utils";
interface IProps {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PayWithWalletModal: React.FC<IProps> = ({ open, setOpen }) => {
   const { authDetails } = useStore((store) => store);
   const { data: walletBalance, refetch: refetchWalletBalance } = useQueryCollectionByField(
      "wallets",
      "userId",
      authDetails.id ?? "",
   );

   return (
      <Dialog onOpenChange={setOpen} open={open}>
         <DialogTrigger asChild></DialogTrigger>
         <DialogContent className=" w-[95%] bg-white">
            <div className="h-55 w-85 mb-5 ml-5 mt-5 flex flex-col justify-between rounded-3xl bg-gradient-to-r from-[#72a929] to-[#83bf33] p-4">
               <div>
                  <p className="mb-6 text-sm font-normal text-white">Account balance</p>
                  <h2 className="mb-6 mr-4 text-4xl font-bold text-white">
                     {formatToNaira(walletBalance?.[0]?.balance ?? 0)}
                     <Eye className="ml-4 inline-block cursor-pointer align-middle" size={24} />
                  </h2>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default PayWithWalletModal;
