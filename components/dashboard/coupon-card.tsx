import { Copy } from "lucide-react";
import { Text } from "../ui/text";

const CouponCard = ({
   voucher_name,
   discount,
   event_name,
   date_text,
}: {
   voucher_name: string;
   discount: string;
   event_name: string;
   date_text: string;
}) => {
   return (
      <div
         style={{ backgroundColor: "rgba(249, 244, 204, 0.55)" }}
         className="mb-5  ml-5 mt-5 flex h-64 w-64 justify-center rounded-3xl p-4"
      >
         <div className="text-center">
            <Text className="mb-1" size={"sm"}>
               {voucher_name}
            </Text>
            <Text className="mb-4" size={"lg"}>
               {discount}
            </Text>
            <h2 className="mb-4 text-xl font-extrabold text-[#7AB42C]">{event_name}</h2>
            <Text className="mb-4" size={"lg"}>
               {date_text}
            </Text>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-500 px-16 py-2">
               <Text size={"sm"}>Copy</Text>
               <Copy className="w-3" />
            </button>
         </div>
      </div>
   );
};

export default CouponCard;
