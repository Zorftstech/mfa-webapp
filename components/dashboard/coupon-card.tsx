import { Copy } from "lucide-react";

const CouponCard = ({ voucher_name, discount, event_name, date_text  }: { voucher_name: string, discount: string,
                event_name: string, date_text: string
            }) => {
    return (
        <div style={{backgroundColor: "rgba(249, 244, 204, 0.55)"}} className="flex  justify-center h-64 w-64 mb-5 mt-5 ml-5 rounded-3xl p-4">
          <div className="text-center">
            <p style={{ color: "#262626",
             margin: "0px", fontSize: "18px", }} 
             className="text-sm ">{voucher_name}</p>
            <p style={{ color: "#595959",
              fontSize: "16px", }}  
             className="text-lg  mb-6">{discount}</p>

            <h2 style={{fontSize: "26px", color: "#7AB42C"}} className="text-xl font-extrabold mb-1">{event_name}</h2>
            <p style={{ color: "#595959",
              fontSize: "16px", }}  
             className="text-lg  mb-10">{date_text}</p>
            <button className="border border-gray-500 px-16 py-2 rounded-lg flex items-center">
            Copy
            <Copy className="mr-1 ml-2" /> 
            
            </button>          
            </div>
        </div>
      );
  };
  
  export default CouponCard;
  