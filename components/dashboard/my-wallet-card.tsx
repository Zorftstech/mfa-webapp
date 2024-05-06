import { Copy, Eye, Plus } from "lucide-react";

const WalletCard = ({ amount }: { amount: string, }) => {
    return (

<div style={{ 
          backgroundColor: "#7AB42C"
          // background: "linear-gradient(to right, rgba(174, 243, 81, 0.2), rgba(73, 113, 21, 0.2))" 
        }} 
          className="h-55 w-85 mb-5 mt-5 ml-5 rounded-3xl p-4 flex flex-col justify-between">
      <div>
        <p className="text-white text-sm font-normal mb-6">Account balance</p>
        <h2 className="text-white font-bold text-4xl mb-6 mr-4">{amount} <Eye className="inline-block align-middle ml-4" size={24} /></h2>
      </div>
      <div>
        <button style={{color: "#565656"}}className="bg-white px-4 py-2 rounded-2xl flex items-center w-15">
          Fund
          <Plus className="ml-2" size={18} style={{ color: '#7AB42C' }} /> 
        </button>
        </div> 
    </div>
      );
  };
  
  export default WalletCard;
  