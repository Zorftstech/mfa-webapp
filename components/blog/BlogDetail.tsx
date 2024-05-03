import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { Blog } from "./mockData";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { FilterIcon, MessageSquareIcon, User2Icon } from "lucide-react";

const BlogDetail = (blog: Blog) => {
   const datePosted = format(blog.dateAdded, "d MMM").split(" ");
   return (
      <div className="relative rounded-lg bg-white">
         <div className="relative">
            <Image
               src={blog.image}
               alt={blog.title}
               className=" h-[250px] w-full rounded-t-lg object-cover"
            />

            <div className="absolute bottom-4 left-4 h-[60px] w-[60px] rounded-full bg-white p-2 text-center">
               <p className="mb-0 text-[20px] font-medium">{datePosted[0]}</p>
               <p className="text-[12px] uppercase text-[#808080]">{datePosted[1]}</p>
            </div>
         </div>
         <div className="p-4 hover:cursor-pointer">
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-gray-600">
               <span className="flex items-center gap-2 text-[14px]">
                  <FilterIcon fontSize={"14px"} color="#B3B3B3" />
                  <p className="text-[#4D4D4D]">{blog.category}</p>
               </span>
               <span className="flex items-center gap-2 text-[14px]">
                  <User2Icon fontSize={"14px"} color="#B3B3B3" />
                  <p className="text-[#4D4D4D]">By {blog.postedBy}</p>
               </span>
               <span className="flex items-center gap-2 text-[14px]">
                  <MessageSquareIcon fontSize={"14px"} color="#B3B3B3" />
                  <p className="text-[#4D4D4D]">{blog.comments} comments</p>
               </span>
            </div>
            <h2 className="mt-4 text-xl font-medium text-[#7AB42C]">{blog.title}</h2>
            <p className="mt-2 text-[#969696] ">
               {blog.description.length > 75
                  ? blog.description.slice(0, 75) + "..."
                  : blog.description}
            </p>
            <Link href={"#"} className="mt-4 flex items-center gap-2 font-semibold text-[#7AB42C]">
               <span>Read More</span>
               <ArrowRightIcon />
            </Link>
         </div>
      </div>
   );
};

export default BlogDetail;
