import { createContext, useContext, useState } from "react";

interface CartItem {
   id: any;
   image?: any;
   no_of_items: number;
   name: string;
   price: number;
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
            no_of_items: Math.max(item.no_of_items - 1, 1),
         };
         setCurrentCart(updatedCart);
      } else {
         setCurrentCart([...currentCart, { ...item, no_of_items: 1 }]);
      }
   };

   const handlePlus = (item: CartItem) => {
      const currentItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
      if (currentItemIndex !== -1) {
         const updatedCart = [...currentCart];
         updatedCart[currentItemIndex] = {
            ...item,
            no_of_items: item.no_of_items + 1,
         };
         setCurrentCart(updatedCart);
      } else {
         setCurrentCart([...currentCart, { ...item, no_of_items: 1 }]);
      }
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
