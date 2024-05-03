import { Text } from "../ui/text";
import { categories } from "./mockData";

const TopCategories = () => {
   return (
      <div className="mb-6 hidden rounded-xl bg-white p-4 text-[#1A1A1A] md:block">
         <Text className="mb-2 text-[24px] font-medium">Top Categories</Text>
         <div>
            {categories.map(({ itemCount, name }, index) => (
               <div
                  className="flex w-full items-center justify-between py-[4px] text-[16px] "
                  key={index}
               >
                  <span className="border-b border-b-4 border-transparent hover:cursor-pointer hover:border-slate-500">
                     {name}
                  </span>
                  <span className="text-[#808080]">({itemCount})</span>
               </div>
            ))}
         </div>
      </div>
   );
};

export default TopCategories;
