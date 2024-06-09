import { useState, useEffect } from "react";

const useSortAndSearch = (
   products: any,
   searchTerm: any,
   sortCriterion: any,
   category?: string,
) => {
   const [sortedAndFilteredProducts, setSortedAndFilteredProducts] = useState<any[]>();

   const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];

   function parseCustomDate(dateString: { split: (arg0: string) => [any, any, any] }) {
      const [dayPart, monthPart, yearPart] = dateString.split(" ");
      const month = monthNames.indexOf(monthPart) + 1;
      const day = parseInt(dayPart, 10);
      const year = parseInt(yearPart, 10);
      console.log(day, month, year);
      return { day, month, year };
   }
   const sortProducts = (products: any[], criterion: any) => {
      return products.sort((a: { createdDate: any }, b: { createdDate: any }) => {
         const parsedA = parseCustomDate(a.createdDate);
         const parsedB = parseCustomDate(b.createdDate);

         switch (criterion) {
            case "day":
               return (
                  parsedA.day - parsedB.day ||
                  parsedA.month - parsedB.month ||
                  parsedA.year - parsedB.year
               );
            case "month":
               return parsedA.month - parsedB.month || parsedA.year - parsedB.year;
            case "year":
               return parsedA.year - parsedB.year;
            default:
               return 0;
         }
      });
   };

   useEffect(() => {
      let updatedProducts = [...products];
      // Category Filter
      console.log(category);
      if (category) {
         updatedProducts = updatedProducts.filter((product) => product.category?.id === category);
      }
      // Search
      if (searchTerm) {
         updatedProducts = updatedProducts.filter(
            (product) =>
               product?.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product?.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product?.desc?.toLowerCase().includes(searchTerm.toLowerCase()),
         );
      }

      // Sort
      if (sortCriterion) {
         updatedProducts = sortProducts(updatedProducts, sortCriterion);
      }

      setSortedAndFilteredProducts(updatedProducts);
   }, [products, searchTerm, sortCriterion, category]);

   return sortedAndFilteredProducts;
};

export default useSortAndSearch;
