import { StateCreator } from "zustand";
import { authDetailsInterface, planTypes, categoryTypes } from "../../types";

export type AppStateType = {
   authDetails: authDetailsInterface;
   setAuthDetails: (arg: authDetailsInterface) => void;
   categories: any;
   setCategories: (arg: categoryTypes) => void;
   selectedCategory: any;
   setSelectedCategory: (arg: categoryTypes) => void;
   loggedIn: boolean;
   userCheckoutEmail: string;
   setUserCheckoutEmail: (arg: string) => void;
};

const appSlice: StateCreator<AppStateType, [["zustand/devtools", never]], []> = (set) => ({
   authDetails: {},
   selectedCategory: {},
   loggedIn: false,
   userCheckoutEmail: "",
   setUserCheckoutEmail: (arg) => {
      set({ userCheckoutEmail: arg });
   },
   setSelectedCategory: (arg) => {
      set({ selectedCategory: arg });
   },

   setAuthDetails: (arg) => {
      set({ authDetails: arg });
   },
   categories: [],
   setCategories: (arg) => {
      set({ categories: arg });
   },
});

export default appSlice;
