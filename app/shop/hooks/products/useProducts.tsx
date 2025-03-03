import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { getCreatedDateFromDocument } from "@/lib/utils";
import ProcessError from "@/lib/error";
import useSortAndSearch from "@/hooks/useSearchAndSort";
import useStore from "@/store";
import { categoriesId } from "@/lib/utils";
import axios from "axios";
const useProducts = (LandingPageCategory?: string) => {
   const [allProducts, setAllProducts] = useState<any[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [sortCriterion, setSortCriterion] = useState("");
   const [price, setPrice] = useState<number | null>(null);
   const { selectedCategory, showFarmOffTakesForAll, showFlashSalesForAll } = useStore(
      (state) => state,
   );
   const selectedCategoryOnCategoryPage = selectedCategory;
   const fetchProducts = async () => {
      const productsCollectionRef = collection(db, "products");
      const querySnapshot = await getDocs(productsCollectionRef);
      const products: any = [];
      querySnapshot.forEach((doc) => {
         const createdDate = getCreatedDateFromDocument(doc as any);
         products.push({
            id: doc.id,
            ...doc.data(),
            createdDate,
         });
      });

      return products;
   };

   const { data, isError, error, isSuccess } = useQuery({
      queryKey: ["get-products"],
      queryFn: fetchProducts,
   });

   // fetch loystar products
   async function fetchLoystarProducts() {
      try {
         const baseUrl = process.env.NEXT_PUBLIC_LOYSTAR_BASE_URL;
         const merchant_id = process.env.NEXT_PUBLIC_MERCHANT_ID;
         const response = await axios.get(
            `${baseUrl}/get_products_of_merchant_urewards?merchant_id=${merchant_id}&limit=5000`,
         );

         console.log(response?.data);
         return await response.data;
      } catch (error) {
         console.log(error);
         return [];
      }
   }

   // https://api0.loystar.co/api/v2/get_products_of_merchant_urewards?merchant_id=21750&page[number]=1&page[size]=10

   // filter out all products with no loystarId and update the product quantity accordingly

   useEffect(() => {
      (async () => {
         if (isSuccess) {
            const loystarProducts = await fetchLoystarProducts();
            // update the quamtity with the quamtity from loystar
            // quantity   // quantity
            const refinedProducts = updateProductQuantities(data, loystarProducts)
          
            let products = refinedProducts;
            if (!showFarmOffTakesForAll) {
               products = products.filter(
                  (item: any) => item.category.id !== categoriesId.farmOffTake,
               );
            }
            if (!showFlashSalesForAll) {
               products = products.filter(
                  (item: any) => item.category.id !== categoriesId.flashSales,
               );
            }

            setAllProducts(products);
         }
      })();
   }, [isSuccess, data]);

   useEffect(() => {
      if (isError) {
         ProcessError(error);
      }
   }, [isError, error]);

   // using js Map since its retain order and its good for large dataset
   function updateProductQuantities(firebaseProducts: any[], loystarProducts: any[]) {
      // create a  map of the product id and quantity [[id, qty], .....]
      const bMap = new Map(loystarProducts.map((product) => [product.id, product.quantity]));

      return firebaseProducts.map((product) => {
         // check if the mapped data has an id that matches this product loystar Id
         if (product.loystarId && bMap.has(product.loystarId)) {
            // get the id accordingly
            return { ...product, quantity: bMap.get(product.loystarId)! };
         }
         return product;
      });
   }

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value.toLowerCase());
   };

   const handleSortChange = (newValue: string) => {
      setSortCriterion(newValue);
   };
   const handlePriceChange = (newValue: number | null) => {
      setPrice(newValue);
   };

   const sortedAndFilteredProducts = useSortAndSearch(
      allProducts,
      searchTerm,
      sortCriterion,
      LandingPageCategory || selectedCategoryOnCategoryPage,
      price,
   );

   return {
      allProducts,
      sortedAndFilteredProducts,
      handleSearch,
      handleSortChange,
      searchTerm,
      sortCriterion,
      price,
      handlePriceChange,
   };
};

export default useProducts;
