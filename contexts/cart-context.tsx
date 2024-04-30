import { createContext, useContext, useState } from "react";
import tomato from "../images/tomato.png";

interface CartContextType {
   currentCart: any[]; // Define the type of currentCart
   setCurrentCart: React.Dispatch<React.SetStateAction<any[]>>; // Define the type of setCurrentCart
}

const CartContext = createContext<CartContextType>({
   currentCart: [],
   setCurrentCart: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
   const [currentCart, setCurrentCart] = useState<any[]>([
      {
         id: 1,
         image: tomato,
         no_of_items: 1,
         name: "Tomato",
         price: 20000,
         status: "In Stock",
      },
      {
         id: 2,
         image: tomato,
         no_of_items: 1,
         name: "Tomato",
         price: 20000,
         status: "In Stock",
      },
   ]);

   const handleMinus = (item: any) => {
      const currentItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
      if (currentItemIndex !== -1) {
         const updatedCart = [...currentCart];
         updatedCart[currentItemIndex] = {
            ...item,
            no_of_items: Math.max(item.no_of_items - 1, 1), // Ensure minimum quantity is 1
         };
         setCurrentCart(updatedCart);
      } else {
         // Item not found in cart, add it to the cart with quantity 1
         setCurrentCart([...currentCart, { ...item, no_of_items: 1 }]);
      }
   };

   const handlePlus = (item: any) => {
      const currentItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
      if (currentItemIndex !== -1) {
         const updatedCart = [...currentCart];
         updatedCart[currentItemIndex] = {
            ...item,
            no_of_items: item.no_of_items + 1,
         };
         setCurrentCart(updatedCart);
      } else {
         // Item not found in cart, add it to the cart with quantity 1
         setCurrentCart([...currentCart, { ...item, no_of_items: 1 }]);
      }
   };

   const handleRemove = (itemId: string) => {
      const updatedCart = currentCart.filter((item) => item.id !== itemId);
      setCurrentCart(updatedCart);
   };

   return (
      <CartContext.Provider value={{ currentCart, setCurrentCart }}>
         {children}
      </CartContext.Provider>
   );
};

export { CartProvider, CartContext };
