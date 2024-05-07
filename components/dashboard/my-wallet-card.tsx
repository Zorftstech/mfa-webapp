import { Copy, Eye, Plus } from "lucide-react";

const WalletCard = ({ amount }: { amount: string }) => {
   return (
      <div className="h-55 w-85 mb-5 ml-5 mt-5 flex flex-col justify-between rounded-3xl bg-gradient-to-r from-[#72a929] to-[#83bf33] p-4">
         <div>
            <p className="mb-6 text-sm font-normal text-white">Account balance</p>
            <h2 className="mb-6 mr-4 text-4xl font-bold text-white">
               {amount} <Eye className="ml-4 inline-block cursor-pointer align-middle" size={24} />
            </h2>
         </div>
         <div>
            <button className="w-15 flex items-center rounded-2xl bg-white px-4 py-2 text-[#565656]">
               Fund
               <Plus className="ml-2 text-[#7AB42C]" size={18} />
            </button>
         </div>
      </div>
   );
};

export default WalletCard;
