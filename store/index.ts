import { create } from "zustand";
import { devtools } from "zustand/middleware";
import appSlice, { AppStateType } from "./features";

export type StoreType = AppStateType;

const useStore = create<StoreType>()(
   devtools(
      (...a) => ({
         ...appSlice(...a),
      }),
      { name: "store" },
   ),
);

export default useStore;
