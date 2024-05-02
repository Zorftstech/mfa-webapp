"use client";

import styles from "@/components/blog/blog.module.css";
import { cn } from "@/lib/utils/css";
import WithRouteDisplay from "@/components/shared/with-route-display";
import TopCategories from "@/components/blog/TopCategories";
import RecentlyAddedBlogs from "@/components/blog/RecentlyAddedBlogs";
import BlogSection from "@/components/blog/BlogSection";

const Page = () => {
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
                     "  h-fit md:w-[20%] md:min-w-[280px] lg:w-[20%] lg:min-w-[320px] ",
                  )}
               >
                  <TopCategories />
                  <RecentlyAddedBlogs />
               </aside>
               <div className={cn("hideScroll", styles.blogSection)}>
                  <BlogSection />
               </div>
            </div>
         </WithRouteDisplay>
      </div>
   );
};

export default Page;
