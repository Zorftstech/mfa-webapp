"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { cn } from "@/lib/utils/css";
import { IconProps } from "@radix-ui/react-icons/dist/types";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
   React.ElementRef<typeof AccordionPrimitive.Item>,
   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
   <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
   IconComp?: any;
   iconClassName?: string;
};

const AccordionTrigger = React.forwardRef<
   React.ElementRef<typeof AccordionPrimitive.Trigger>,
   AccordionTriggerProps
>(({ className, children, IconComp, iconClassName, ...props }, ref) => {
   const iconClasses = "text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200";

   const IconComponent = <IconComp className={iconClasses} /> || (
      <ChevronDownIcon className={iconClasses} />
   );
   return (
      <AccordionPrimitive.Header className="flex">
         <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
               "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
               className,
            )}
            {...props}
         >
            {children}
            <span className={iconClassName}>{IconComponent}</span>
         </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
   );
});

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
   React.ElementRef<typeof AccordionPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
   <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
   >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
   </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
