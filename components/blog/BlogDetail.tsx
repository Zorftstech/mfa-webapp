import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { Blog } from "./mockData";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { FilterIcon, MessageSquareIcon, User2Icon } from "lucide-react";
import Router from "next/router";
import BlogStat from "./BlogStat";

const BlogDetail = (blog: Blog) => {
   const datePosted = format(blog.dateAdded, "d MMM").split(" ");
   return (
      <div className="relative rounded-lg bg-white">
         <div className="relative overflow-hidden  rounded-t-lg">
            <Image
               src={blog.image}
               alt={blog.title}
               className="h-[250px] w-full object-cover hover:scale-[108%] hover:cursor-pointer hover:transition-all"
            />

            <div className="absolute bottom-4 left-4 h-[60px] w-[60px] rounded-full bg-white p-2 text-center">
               <p className="mb-0 text-[20px] font-medium">{datePosted[0]}</p>
               <p className="text-[12px] uppercase text-[#808080]">{datePosted[1]}</p>
            </div>
         </div>
         <div className="p-4 hover:cursor-pointer" onClick={() => Router.push("/blog/1")}>
            <BlogStat {...blog} />
            <h2 className="mt-4 text-xl font-medium text-[#7AB42C]">{blog.title}</h2>
            <p className="mt-2 text-[#969696] ">
               {blog.description.length > 75
                  ? blog.description.slice(0, 75) + "..."
                  : blog.description}
            </p>
            <Link
               href={"/blog/1"}
               className="mt-4 flex items-center gap-2 font-semibold text-[#7AB42C]"
            >
               <span>Read More</span>
               <ArrowRightIcon />
            </Link>
         </div>
      </div>
   );
};

export default BlogDetail;
