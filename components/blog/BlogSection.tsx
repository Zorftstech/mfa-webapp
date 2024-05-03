import React from "react";
import BlogDetail from "./BlogDetail";
import { blogs } from "./mockData";

const BlogSection = () => {
   return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
         {blogs.map((blog, index) => (
            <BlogDetail key={index} {...blog} />
         ))}
      </div>
   );
};

export default BlogSection;
