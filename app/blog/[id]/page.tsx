"use client";

import RecentlyAddedBlogs from "@/components/blog/RecentlyAddedBlogs";
import TopCategories from "@/components/blog/TopCategories";
import WithRouteDisplay from "@/components/shared/with-route-display";
import { cn } from "@/lib/utils/css";
import styles from "@/components/blog/blog.module.css";
import Image from "next/image";
import BlogAvatar from "@/public/images/blog/blog-avatar.png";
import BlogStat from "@/components/blog/BlogStat";
import { blogs } from "@/components/blog/mockData";
import LeaveAComment from "@/components/blog/LeaveAComment";
import RecentBlogImg from "@/public/images/blog/recent-blog.jpg";
import BlogComments from "@/components/blog/BlogComments";
import { Icon } from "@iconify/react";

const Page = () => {
   const iconContainerClasses =
      "group flex h-[24px] w-[24px] items-center justify-center rounded-full hover:cursor-pointer hover:bg-green-600 hover:text-white duration-700 hover:transition-all";
   const iconStyle = "group-hover:text-white";
   const blogContent =
      "<div><p>In today's digital age, learning to code has become increasingly valuable. Whether you're a student, a professional, or simply someone interested in technology, coding can open doors to numerous opportunities.</p><h2>1. Expanding Career Opportunities</h2><p>The tech industry is booming, and coding skills are in high demand. From software development to data analysis, the ability to code can lead to a range of lucrative career paths.</p><h2>2. Enhancing Problem-Solving Skills</h2><p>Coding teaches you how to approach problems methodically and logically. As you write code, you break down complex tasks into manageable steps, which can be applied to various areas of life.</p><h2>3. Fostering Creativity</h2><p>When you learn to code, you have the power to create something from scratch. Whether it's a website, a mobile app, or a piece of software, coding allows you to bring your ideas to life.</p><h2>4. Building a Community</h2><p>Coding is not just about sitting in front of a computer. It's also about connecting with others who share your interests. There are countless online communities where you can collaborate, ask questions, and share your projects.</p><h2>5. Future-Proofing Your Career</h2><p>As technology continues to evolve, so does the demand for coding skills. By learning to code, you're investing in your future and ensuring that you stay relevant in the job market.</p><h2>Conclusion</h2><p>Learning to code is more accessible than ever. With numerous online resources, coding bootcamps, and community support, there's never been a better time to start. So, why not take the plunge? You might discover a passion you never knew you had!</p><blockquote><p>\"The best way to predict the future is to create it.\" - Alan Kay</p></blockquote><p>If you're interested in learning to code, here are some resources to get you started:</p><ul><li><a href='https://www.codecademy.com/' target='_blank'>Codecademy</a></li><li><a href='https://www.freecodecamp.org/' target='_blank'>freeCodeCamp</a></li><li><a href='https://www.coursera.org/' target='_blank'>Coursera</a></li></ul></div>";

   return (
      <div>
         <WithRouteDisplay route="Blog">
            <div
               className={cn(
                  styles.blogWrapper,
                  "mb-12 flex w-full flex-col-reverse gap-16 md:mb-24  md:flex-row",
               )}
            >
               <div className={cn("hideScroll overflow-hidden", styles.blogSection)}>
                  <Image
                     className="h-auto w-auto rounded-xl"
                     alt="blog-banner"
                     src={RecentBlogImg}
                     width={200}
                     height={400}
                  />
                  <div className="pb-2 pt-8">{/* <BlogStat {...blogs[0]} /> */}</div>
                  <h1 className="mb-8 text-[32px] font-[500]">
                     The Juicy Tale of Fresh Oranges: From Tree to Table
                  </h1>
                  <div className="flex justify-between">
                     <div className="flex items-center gap-4">
                        {/* <span className="h-[48px] w-[48px] overflow-hidden rounded-full">
                           <Image src={BlogAvatar} alt="blog-avatar" />
                        </span> */}
                        <div>
                           {/* <p className="text-[16px] font-[500] text-[#1A1A1A]">Deborah Oladeji</p> */}
                           <div className="flex items-center gap-2 text-[14px] text-[#808080]">
                              <p>4 March, 2024</p>
                              <p>•</p>
                              <p>6 min read</p>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <span onClick={() => {}} className={iconContainerClasses}>
                           <Icon className={iconStyle} icon="ri:facebook-fill" />
                        </span>
                        <span onClick={() => {}} className={iconContainerClasses}>
                           <Icon className={iconStyle} icon="ri:twitter-fill" />
                        </span>
                        <span onClick={() => {}} className={iconContainerClasses}>
                           <Icon className={iconStyle} icon="dashicons:pinterest" />
                        </span>
                        <span onClick={() => {}} className={iconContainerClasses}>
                           <Icon className={iconStyle} icon="mdi:instagram" />
                        </span>
                        <span onClick={() => {}} className={iconContainerClasses}>
                           <Icon className={iconStyle} icon="material-symbols:link" />
                        </span>
                     </div>
                  </div>
                  {/* Blog Content */}
                  <div
                     className={cn("pb-8 pt-8", styles.blogPageContent)}
                     dangerouslySetInnerHTML={{ __html: blogContent }}
                  ></div>
                  {/* <LeaveAComment /> */}
                  {/* <BlogComments /> */}
               </div>
               {/* <aside
                  className={cn(
                     styles.blogSidebar,
                     " hideScroll  md:w-[20%] md:min-w-[280px] lg:w-[20%] lg:min-w-[320px] ",
                  )}
               >
                  <TopCategories />
                  <RecentlyAddedBlogs isHidden />
               </aside> */}
            </div>
         </WithRouteDisplay>
      </div>
   );
};

export default Page;
