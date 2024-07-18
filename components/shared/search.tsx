// components/SearchBar.tsx
import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight, Configure } from "react-instantsearch";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "../ui/input";
const searchClient = algoliasearch("7IGIHUZ06I", "60c379c16c8524fa0a2c6ceb105b824a");

const Hit = ({ hit }: { hit: any }) => {
   return (
      <p className="hit-name w-full border-none  text-sm underline">
         {hit.name}
         {/* <Highlight attribute="name" hit={hit} /> */}
      </p>
   );
};

const SearchBar: React.FC = () => {
   const [query, setQuery] = useState("");

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
   };

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="default" className="w-full">
               <Search className="absolute left-4 top-[25%] block w-4 md:hidden" />
               <Input
                  className="w-full rounded-full bg-white py-6 pl-[40px] md:pl-2"
                  placeholder={"I am looking for..."}
                  name={"search"}
               />
               <Search className="absolute right-4 top-[25%] hidden w-4 md:block" />
            </Button>
         </DialogTrigger>
         <DialogContent className=" w-[95%] bg-white">
            <Configure hitsPerPage={100} />
            <SearchBox />
            <div className="border border-red-700">
               <Hits hitComponent={Hit} />
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default SearchBar;
