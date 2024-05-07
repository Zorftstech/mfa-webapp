
const MyWalletTransactionCard = ({ client_name, date, img, amount }: { client_name: string, date: string, img: string, amount: string, }) => {
    return (

    <div style={{ border: "1px solid #E6E6E6",}} 
          className="h-55 w-85 mb-5 mt-5 ml-5 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center">
          <div style={{background: "#D9D9D9"}}className="rounded-full h-12 w-12"/>
          <div className="px-3">
            <p className="font-bold">{client_name}</p>
            <p className="text-sm ">{date}</p>
          </div>
        </div>
    </div>
      );
  };
  
  export default MyWalletTransactionCard;
  