import { Text } from "../ui/text";
import { TrendingUp } from "lucide-react";

const MyWalletTransactionCard = ({
   client_name,
   date,
   img,
   amount,
}: {
   client_name: string;
   date: string;
   img: string;
   amount: string;
}) => {
   return (
      <div className="h-55 w-85 m-4 flex items-center justify-between gap-2 rounded-xl border border-gray-200 p-4">
         <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-[#D9D9D9]" />
            <div className="px-3">
               <p className="font-bold">{client_name}</p>
               <p className="text-sm ">{date}</p>
            </div>
         </div>
         <Text size={"sm"} weight={"medium"}>
            ₦500
         </Text>
         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <TrendingUp className="w-4 text-green-500" />
         </div>
      </div>
   );
};

export default MyWalletTransactionCard;
