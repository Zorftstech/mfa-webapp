"use client";

import React, { useState } from "react";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

function Price() {
   const [minValue, setMinValue] = useState(0);
   const [maxValue, setMaxValue] = useState(0);

   return (
      <AccordionItem className="border-0" value="item-2">
         <AccordionTrigger>Price</AccordionTrigger>
         <AccordionContent className="flex flex-col items-center justify-start gap-1 pt-8">
            {/* <MultiRangeSlider
               min={0}
               max={100000}
               canMinMaxValueSame={true}
               onInput={(e: ChangeResult) => {
                  setMinValue(e.minValue);
                  setMaxValue(e.maxValue);
               }}
               label={false}
               ruler={false}
               style={{ border: "none", width: "100%", boxShadow: "none", padding: "15px 10px" }}
               barLeftColor="white"
               barInnerColor="#7ab42c"
               barRightColor="white"
               thumbLeftColor="white"
               thumbRightColor="white"
            /> */}
            <div className="flex items-center justify-center gap-5">
               <Text size={"sm"} weight={"medium"}>
                  From ₦{minValue.toLocaleString()}
               </Text>
               <Text size={"sm"} weight={"medium"}>
                  To ₦{maxValue.toLocaleString()}
               </Text>
            </div>
         </AccordionContent>
      </AccordionItem>
   );
}

export default Price;
