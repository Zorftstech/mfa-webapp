"use client";

import { ShoppingCartIcon, Plus, Minus } from "lucide-react";
import React, { useState, useContext, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Ratings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { toast } from "sonner";
import { CartContext } from "@/contexts/cart-context";
import { SingleProduct } from "@/types";
import ShareItem from "@/components/shared/share-item";
import Each from "@/components/helpers/each";
import Image from "next/image";
import { formatToNaira } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// import { CartContext } from "@/contexts/cart-context";

function ProductDescription({
   currentItem,
   product,
}: {
   currentItem: Partial<SingleProduct>;
   product: any;
}) {
   const [productCount, setProductCount] = useState(1);

   const { handlePlus, handleMinus, currentCart } = useContext(CartContext);

   const [selectedWeightId, setSelectedWeightId] = useState(
      currentItem.units && currentItem.units?.length > 0 ? currentItem.units[0].unit: "",
   );
   const [currentSelectedPrice, setCurrentSelectedPrice] = useState(
      currentItem.units && currentItem.units?.length > 0 ? currentItem.units[0].price: currentItem?.price,
   );
   const [currentSelectedUnitQty, setCurrentSelectedUnitQty] = useState(
      currentItem.units && currentItem.units?.length > 0 ? currentItem.units[0].quantity: 0,
   )
   const [currentSelectedUnitId, setCurrentSelectedUnitId] = useState(
      currentItem.units && currentItem.units?.length > 0 ? currentItem.units[0].loysStarId: 0,
   )
   const [currentSelectedImage, setCurrentSelectedImage] = useState(
      currentItem.units && currentItem.units?.length > 0 ? currentItem.units[0].image : currentItem?.image
   );

   const [showIsNameYourPrice, setShowIsNameYourPrice] = useState(false);
   const [nameYourPriceValue, setNameYourPriceValue] = useState(0);

   const handleWeight = (id: any) => {
      setSelectedWeightId(id);
   };

   const handleAdd = (product: any, price: number, unit: string, qty: number, id: number) => {
      setProductCount(productCount + 1);

      handlePlus(product, {
         price: price,
         unit: unit,
         quantity: qty,
         unitId: id
      });
   };

   const handleSubtract = (product: any, price: number, unit: string, qty: number, id: number) => {
      if (productCount === 1) return setProductCount(1);
      setProductCount(productCount - 1);
      handleMinus(product, {
         price: price,
         unit: unit,
         quantity: qty,
         unitId: id
      });
   };

   // console.log("sgegeg", currentItem.units, currentItem);

   const acitveUnit = useMemo(() => {
     
         return {quantity: Number(currentItem?.quantity|| 0)};
          // if (currentItem && selectedWeightId) {
      //    return currentItem?.units?.find((v) => v?.unit === selectedWeightId);
      // } else {
     // }
   }, [selectedWeightId, currentItem]);

  // console.log(currentItem?.quantity)

   const quantityState = useMemo(() => {
      if (
         currentCart?.length > 0 &&
         Array.isArray(currentItem?.units) &&
         currentItem?.units?.length > 0
      ) {
       
         //
         const unitQtySum = currentCart?.filter((item) =>  {
            console.log(currentItem?.units?.map((i) => `${i.unit}_${i.price}`))
            console.log(currentItem?.units?.map((i) => `${i.unit}_${i.price}`).includes(item?.chosenUnit || ''))
            return currentItem?.units?.map((i) => `${i.unit}_${i.price}`).includes(item?.chosenUnit || '')
         }).reduce((acc, curr) => acc + (Number(curr?.loystarUnitQty || 0) * Number(curr?.no_of_items)), 0)
       
         // const qty = currentCart?.find(
         //    (v) =>
         //       v?.chosenUnit === `${selectedWeightId}_${currentSelectedPrice}` &&
         //       v?.id === currentItem?.id,
         // )?.no_of_items;
         // const unitValue = currentItem?.units?.find((v) => v?.unit === selectedWeightId)?.quantity

         console.log(unitQtySum)
         return unitQtySum;
      } else if (
         currentCart?.length > 0 &&
         Array.isArray(currentItem?.units) &&
         currentItem?.units?.length === 0
      ) {
         return currentCart?.find((v) => v?.id === currentItem?.id)?.no_of_items;
      } else return 0;
   }, [currentCart, currentItem, selectedWeightId, currentSelectedPrice]);

  // console.log(quantityState);

  useMemo(() => {
   if (currentCart?.length === 0) {
      setProductCount(1)
   }
  },[currentCart])

  // console.log("current", currentItem)

   return (
      <>
         <div>
            <div className="flex h-[300px] w-full items-center justify-center">
               <Image
                  src={currentSelectedImage || ""}
                  alt={"Product Image"}
                  width={300}
                  height={300}
                  className="h-[300px] w-[300px] rounded-md object-cover"
               />
            </div>
         </div>
         <div className="flex-1 p-2">
            <div className="flex w-full items-center justify-between">
               <Text size={"2xl"} weight={"semibold"} className="capitalize">
                  {currentItem.name}
               </Text>
               {/* <Button className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
               <HeartIcon className="w-4 text-gray-600" />
            </Button> */}
            </div>
            <div className="mt-4 flex items-end justify-start gap-2">
               <Ratings value={5} />
               <Text size={"xs"} weight={"medium"}>
                  {" "}
                  {currentItem.ratings && currentItem.ratings.length}{" "}
                  {currentItem.ratings && "reviews"}
               </Text>
            </div>
            <div className="mt-2 flex w-full items-center justify-start gap-2">
               <Text size={"md"} weight={"semibold"}>
                  ₦{currentSelectedPrice?.toLocaleString()}
               </Text>
               {product.inStock ? (
                  <Text
                     className="rounded-2xl border border-green-100 bg-green-100 px-4 py-2"
                     size={"xs"}
                     weight={"normal"}
                  >
                     In stock
                  </Text>
               ) : (
                  <Text
                     className="rounded-2xl border border-red-100 bg-red-100 px-4 py-2"
                     size={"xs"}
                     weight={"normal"}
                  >
                     Out of stock
                  </Text>
               )}
            </div>
            <div className="mt-2 flex w-full items-center gap-x-2">
               <p className="font-medium ">Quantity: </p>
               <p>{Number(acitveUnit?.quantity || 0) - Number(quantityState || 0) || 0}</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
               <Text size={"sm"} weight={"medium"}>
                  Unit of Measurement:
               </Text>
               <Each
                  of={currentItem.units || []}
                  render={(item) => (
                     <Button
                        key={item?.ratio}
                        onClick={() => {
                           setSelectedWeightId(item?.unit);
                           setCurrentSelectedPrice(item?.price);
                           setCurrentSelectedImage(item?.image);
                           setCurrentSelectedUnitQty(item?.quantity)
                           setCurrentSelectedUnitId(item?.loystarId)
                           setProductCount(1);
                           showIsNameYourPrice && setShowIsNameYourPrice(false);
                        }}
                        className={
                           item?.unit === selectedWeightId
                              ? `rounded-2xl border border-[#7ab42c] bg-[#7ab42c] px-4 py-1 capitalize text-white`
                              : `rounded-2xl border border-gray-300 bg-white px-4 py-1 capitalize text-gray-600`
                        }
                     >
                        {item?.unit}
                     </Button>
                  )}
               />
               {product.nameYourPrice && (
                  <Button
                     onClick={() => {
                        setSelectedWeightId("Name Your Price");
                        setShowIsNameYourPrice(true);
                     }}
                     className={
                        "Name Your Price" === selectedWeightId
                           ? `rounded-2xl border border-[#7ab42c] bg-[#7ab42c] px-4 py-1 capitalize text-white`
                           : `rounded-2xl border border-gray-300 bg-white px-4 py-1 capitalize text-gray-600`
                     }
                  >
                     Name Your Price
                  </Button>
               )}
            </div>
            <Separator className="my-4" />

            <div className="my-3">
               {showIsNameYourPrice ? (
                  <div>
                     <Text size={"sm"} weight={"medium"}>
                        Name Your Price: Minimum {formatToNaira(product.minimumPrice)}
                     </Text>
                     <Input
                        type="number"
                        value={nameYourPriceValue}
                        onChange={(e) => {
                           setNameYourPriceValue(parseInt(e.target.value));
                        }}
                        className="my-3 w-full rounded-2xl border border-gray-300 p-2"
                     />
                     <div className="mb-3 flex w-fit items-center gap-2 rounded-full border border-gray-300 p-2">
                        <Button
                           disabled={
                              !product.inStock || nameYourPriceValue < product.minimumPrice
                                 ? true
                                 : false
                           }
                           onClick={() => {
                              if (nameYourPriceValue < product.minimumPrice) {
                                 toast.error("Price must be greater than minimum price");
                                 return;
                              }
                              if (nameYourPriceValue >= product.minimumPrice) {
                                 handleSubtract(
                                    product,
                                    nameYourPriceValue,
                                    selectedWeightId as string,
                                    currentSelectedUnitQty,
                                    currentSelectedUnitId
                                    
                                 );
                              }
                           }}
                           className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                        >
                           <Minus className="w-4" />
                        </Button>
                        <Text size={"sm"} weight={"medium"}>
                           {productCount}
                        </Text>
                        <Button
                           disabled={
                              !product.inStock || nameYourPriceValue < product.minimumPrice
                                 ? true
                                 : false
                           }
                           onClick={() => {
                              if (nameYourPriceValue < product.minimumPrice) {
                                 toast.error("Price must be greater than minimum price");
                                 return;
                              }
                              if (nameYourPriceValue >= product.minimumPrice) {
                                 handleAdd(product, nameYourPriceValue, selectedWeightId as string, currentSelectedUnitQty, currentSelectedUnitId);
                              }
                           }}
                           className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                        >
                           <Plus className="w-4" />
                        </Button>
                     </div>

                     <Button
                        disabled={nameYourPriceValue < product.minimumPrice ? true : false}
                        onClick={(e) => {
                           if (nameYourPriceValue < product.minimumPrice) {
                              toast.error("Price must be greater than minimum price");
                              return;
                           }
                           if (nameYourPriceValue >= product.minimumPrice) {
                              handlePlus(product, {
                                 unit: selectedWeightId,
                                 price: nameYourPriceValue,
                                 quantity: currentSelectedUnitQty,
                                 unitId: currentSelectedUnitId
                              });
                              // setShowIsNameYourPrice(false);
                           }
                        }}
                        className=" w-full rounded-3xl text-sm"
                     >
                        Add to Cart <ShoppingCartIcon className="w-4 text-white" />
                     </Button>
                  </div>
               ) : (
                  <>
                     <div className="flex w-fit items-center gap-2 rounded-full border border-gray-300 p-2">
                        <Button
                           disabled={!product.inStock || showIsNameYourPrice ? true : false}
                           onClick={() => {
                              handleSubtract(
                                 product,
                                 currentSelectedPrice as number,
                                 selectedWeightId as string,
                                 currentSelectedUnitQty as number,
                                 currentSelectedUnitId as number
                              );
                           }}
                           className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                        >
                           <Minus className="w-4" />
                        </Button>
                        <Text size={"sm"} weight={"medium"}>
                           {productCount}
                        </Text>
                        <Button
                           disabled={
                              !product.inStock ||
                              showIsNameYourPrice ||
                              (acitveUnit && (Number(acitveUnit?.quantity || 0) - Number(quantityState || 0) === 0))
                                 ? true
                                 : false
                           }
                           onClick={() => {
                              handleAdd(
                                 product,
                                 currentSelectedPrice as number,
                                 selectedWeightId as string,
                                 currentSelectedUnitQty as number,
                                 currentSelectedUnitId as number
                              );
                           }}
                           className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                        >
                           <Plus className="w-4" />
                        </Button>
                     </div>
                  </>
               )}
            </div>
            {!showIsNameYourPrice && (
               <Button
                  disabled={product.inStock ? false : true}
                  onClick={(e) =>
                     handlePlus(product, {
                        unit: selectedWeightId,
                        price: currentSelectedPrice,
                        quantity: currentSelectedUnitQty,
                        unitId: currentSelectedUnitId
                     })
                  }
                  className="mt-4 w-full rounded-3xl text-sm disabled:cursor-not-allowed"
               >
                  Add to Cart <ShoppingCartIcon className="w-4 text-white" />
               </Button>
            )}
            <Separator className="my-4" />
            <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
               <Text size={"sm"} weight={"medium"}>
                  Category: <span className="text-gray-400">{currentItem.category?.name}</span>
               </Text>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
               <Text size={"sm"} weight={"medium"}>
                  Tag: <span className="text-gray-400"> {currentItem.subcategory?.name}</span>
               </Text>
            </div>
            <ShareItem />
         </div>
      </>
   );
}

export default ProductDescription;
