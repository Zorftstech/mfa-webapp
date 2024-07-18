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
import { Filter } from "lucide-react";
const searchClient = algoliasearch("7IGIHUZ06I", "60c379c16c8524fa0a2c6ceb105b824a");

const Hit = ({ hit }: { hit: any }) => {
   return (
      <div>
         <div className="hit-name underline ">
            {hit.name}
            <Highlight attribute="name" hit={hit} />
         </div>
      </div>
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
            <Button variant="outline">
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7ab42c] ">
                  <Filter className="w-3 text-white" />
               </div>
            </Button>
         </DialogTrigger>
         <DialogContent className="h-[500px] w-[95%] bg-white">
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
