import { createContext, useContext, useState } from "react";

interface CartItem {
   units?: { ratio: number; unit: string; price: number | string }[];
   costprice?: string | number;
   nameYourPrice?: boolean;
   subcategory?: { name: string; id: string };
   category?: { name: string; id: string };
   desc?: string;
   minimumPrice?: number;
   price?: number;
   image?: string;
   name?: string;
   slug?: string;
   unit?: string;
   quantity?: number;
   ratings?: { caption: string; rating: number; ratedBy: string[]; description: string }[];
   id?: any;

   no_of_items?: number;

   status?: string;
}

interface CartContextType {
   currentCart: CartItem[];
   setCurrentCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
   handleMinus: (item: CartItem) => void;
   handlePlus: (item: CartItem) => void;
   handleRemove: (itemId: any) => void;
}

const CartContext = createContext<CartContextType>({
   currentCart: [],
   setCurrentCart: () => {},
   handleMinus: () => {},
   handlePlus: () => {},
   handleRemove: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
   const [currentCart, setCurrentCart] = useState<CartItem[]>([]);

   const handleMinus = (item: CartItem) => {
      const currentItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
      if (currentItemIndex !== -1) {
         const updatedCart = [...currentCart];
         updatedCart[currentItemIndex] = {
            ...item,
            no_of_items: Math.max(item.no_of_items ?? 0 - 1, 1),
         };
         setCurrentCart(updatedCart);
      } else {
         setCurrentCart([...currentCart, { ...item, no_of_items: 1 }]);
      }
   };

   const handlePlus = (item: CartItem) => {
      const currentItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
      if (currentItemIndex !== -1) {
         // console.log(currentItemIndex, "1");
         const updatedCart = [...currentCart];
         updatedCart[currentItemIndex] = {
            ...item,
            no_of_items: item.no_of_items ?? 0 + 1,
         };
         // console.log(updatedCart);
         setCurrentCart(updatedCart);
      } else {
         // console.log(currentItemIndex, "2");
         setCurrentCart([...currentCart, { ...item, no_of_items: 1 }]);
      }
      // console.log(currentItemIndex,'3');
   };

   const handleRemove = (itemId: number) => {
      const updatedCart = currentCart.filter((item) => item.id !== itemId);
      setCurrentCart(updatedCart);
   };

   return (
      <CartContext.Provider
         value={{ currentCart, setCurrentCart, handleMinus, handlePlus, handleRemove }}
      >
         {children}
      </CartContext.Provider>
   );
};

export { CartProvider, CartContext };
