"use client";

import styles from "@/components/blog/blog.module.css";
import { cn } from "@/lib/utils/css";
import WithRouteDisplay from "@/components/shared/with-route-display";
import TopCategories from "@/components/blog/TopCategories";
import RecentlyAddedBlogs from "@/components/blog/RecentlyAddedBlogs";
import BlogSection from "@/components/blog/BlogSection";
import BlogDetail from "@/components/blog/BlogDetail";
import useBlogs from "./hooks/useBlogs";
const Page = () => {
   const blogs = useBlogs().data || [];
   return (
      <div className="">
         <WithRouteDisplay route="Blog" extraChildrenClassname="">
            <div
               className={cn(
                  styles.blogWrapper,
                  "mb-12 flex w-full flex-col-reverse gap-8 md:h-[70vh] md:flex-row",
               )}
            >
               <aside
                  className={cn(
                     styles.blogSidebar,
                     "  hideScroll hidden md:h-[70vh] md:w-[20%] md:min-w-[280px] lg:w-[20%] lg:min-w-[320px]",
                  )}
               >
                  <TopCategories />
                  <RecentlyAddedBlogs />
               </aside>
               <div className={cn("hideScroll", styles.blogSection)}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                     {blogs.map((blog, index) => (
                        <BlogDetail key={index} {...blog} />
                     ))}
                  </div>
               </div>
            </div>
         </WithRouteDisplay>
      </div>
   );
};

export default Page;
