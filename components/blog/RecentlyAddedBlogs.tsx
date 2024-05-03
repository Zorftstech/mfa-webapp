import { Text } from "../ui/text";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import { recentBlogs } from "./mockData";

const RecentlyAddedBlogs = () => {
   return (
      <div className="rounded-xl bg-white p-4 text-[#1A1A1A]">
         <Text className="mb-2 text-[24px] font-medium">Recently Added</Text>
         <div className="flex flex-col gap-4">
            {recentBlogs.map(({ title, dateAdded, image }, index) => (
               <div className="grid grid-cols-[80px,1fr] gap-2" key={index}>
                  <Image
                     alt="recent-blog-img"
                     src={image}
                     className="h-full w-full rounded object-cover"
                  />
                  <div>
                     <Text className="mb-2 text-[16px] font-medium text-[#1A1A1A]">{title}</Text>
                     <span className="flex items-center gap-2 text-[14px]">
                        <CalendarIcon color="#7AB42C" />
                        <Text className="text-[#666666]">{format(dateAdded, "LLL d y")}</Text>
                     </span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default RecentlyAddedBlogs;
