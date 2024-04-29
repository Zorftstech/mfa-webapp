import { ShoppingBag, ChevronRight } from "lucide-react";
import React from "react";

import { Text } from "@/components/ui/text";

function RouteDisplay({ route }: { route: string }) {
   return (
      <div
         style={{
            backgroundImage: `url(/images/shop/route-display-bg.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
         }}
         className="hidden w-full items-center justify-between bg-black p-8 md:flex"
      >
         <div
            style={{ maxWidth: "1200px" }}
            className="mx-auto flex w-full items-center justify-start gap-2"
         >
            <ShoppingBag className="w-6 text-white" />
            <ChevronRight className="w-6 text-white" />
            <Text className="text-primary-2" weight={"medium"} size={"sm"}>
               {route}
            </Text>
         </div>
      </div>
   );
}

export default RouteDisplay;
