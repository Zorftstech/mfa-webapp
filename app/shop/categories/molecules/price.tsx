"use client";

import React, { useEffect, useState } from "react";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import "react-range-slider-input/dist/style.css";
import "../page.module.css";
import { formatToNaira } from "@/lib/utils";
import useProducts from "../../hooks/products/useProducts";
import RangeSlider from "react-range-slider-input";

function Price({ handlePriceChange }: { handlePriceChange: (newValue: number | null) => void }) {
   const [minValue, setMinValue] = useState(0);
   const [maxValue, setMaxValue] = useState(500000);
   const [value, setValue] = useState([0, 0]);
   useEffect(() => {
      if (value[1] > 0) {
         handlePriceChange(value[1]);
      } else {
         handlePriceChange(null);
      }
   }, [value]);
   return (
      <AccordionItem className="border-0" value="item-2">
         <AccordionTrigger>Price</AccordionTrigger>
         <AccordionContent className="flex flex-col items-center justify-start gap-1 pt-8">
            <RangeSlider
               className="single-thumb"
               value={value}
               onInput={setValue}
               thumbsDisabled={[true, false]}
               rangeSlideDisabled={true}
               min={minValue}
               max={maxValue}
            />
            <div className="flex items-center justify-center gap-5">
               <Text size={"sm"} weight={"medium"}>
                  From {"  "}
                  {formatToNaira(Number(value[0]))}
               </Text>
               <Text size={"sm"} weight={"medium"}>
                  To {"  "}
                  {formatToNaira(Number(value[1]))}
               </Text>
            </div>
         </AccordionContent>
      </AccordionItem>
   );
}

export default Price;
