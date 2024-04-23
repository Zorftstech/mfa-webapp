'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import Each from '@/components/helpers/each';
import { Button } from '@/components/ui/button';

import styles from './product-image.module.css';

function ProductImage({ images }: { images: any }) {
  const [activeImg, setActiveImg] = useState(0);

  const handleActiveImg = (index: number) => {
    setActiveImg(index);
  };

  console.log(activeImg);
  return (
    <div>
      <div className="flex w-full items-center justify-center">
        <Image src={images[activeImg]} alt={'Product Image'} />
      </div>
      <div className={`${styles.sub_image} mt-6 w-full`}>
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
      </div>
    </div>
  );
}

export default ProductImage;
