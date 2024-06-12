"use client";

import React, { useState } from "react";

import Image from "next/image";

import Each from "@/components/helpers/each";
import { Button } from "@/components/ui/button";

import styles from "./product-image.module.css";

function ProductImage({ image }: { image: string }) {
   const [activeImg, setActiveImg] = useState(0);

   const handleActiveImg = (index: number) => {
      setActiveImg(index);
   };

   return (
      <div>
         <div className="flex h-[300px] w-full items-center justify-center">
            {/* <Image src={images[activeImg]} alt={'Product Image'} /> */}
            <Image
               src={image}
               alt={"Product Image"}
               width={300}
               height={300}
               className="h-[300px] w-[300px] rounded-md object-cover"
            />
         </div>
         {/* <div className={`${styles.sub_image} mt-8 w-full`}>
        <Each
          of={images}
          render={(item: any, index: any) => (
            <div key={index}>
              <Button onClick={() => handleActiveImg(index)} variant={'ghost'}>
                <Image src={item} alt={`Image ${index}`} />
              </Button>
            </div>
          )}
        />
      </div> */}
      </div>
   );
}

export default ProductImage;
