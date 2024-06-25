import { ChevronDown, MenuIcon } from "lucide-react";
import React from "react";

import { useRouter } from "next/navigation";

import { useUserContext } from "@/contexts/user-context";
import useStore from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dropdown } from "../ui/dropdown-menu";
import { Text } from "../ui/text";

// should infer current user avatar from a useCurrentUserContext()
const ProfileIconDropdown = ({ children }: { children?: React.ReactNode }) => {
   const { authDetails, setLoggedIn, setCurrentUser, setAuthDetails } = useStore((store) => store);
   const router = useRouter();
   return (
      <Dropdown>
         <Dropdown.Trigger>
            {children ?? (
               //   <WorkspaceSelectorDropdownButton currentWorkspace={currentWorkspace} buttonClassName={buttonClassName} />4
               <div className="flex items-center gap-1">
                  <MenuIcon className="h-6 w-6 text-gray-500" />
                  {/* <Avatar>
                     <AvatarImage
                        className="h-full w-full rounded-[inherit] object-cover"
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                        alt="Colm Tuite"
                     />

                     <AvatarFallback>{authDetails?.full_name}</AvatarFallback>
                  </Avatar> */}
                  <ChevronDown className="h-4 w-4 text-gray-500" />
               </div>
            )}
         </Dropdown.Trigger>
         <Dropdown.Content className="mt-2 w-[15rem] border bg-white px-0  py-0 shadow-lg transition-all duration-300 ease-linear">
            <Dropdown.Item
               onClick={() => {
                  router.push("/dashboard");
               }}
               // key={crypto.randomUUID()}
               className=" flex cursor-pointer items-center gap-[0.75rem] px-[1.25rem] py-[0.45rem] text-[0.9rem] leading-[1.3rem] tracking-[0.01rem] hover:!bg-primary-1"
            >
               <Text className="my-3 whitespace-nowrap " size={"sm"}>
                  Dashboard
               </Text>
            </Dropdown.Item>
            <Dropdown.Item
               // key={crypto.randomUUID()}
               className=" flex cursor-pointer items-center gap-[0.75rem] px-[1.25rem] py-[0.75rem] pt-6 text-[0.9rem] leading-[1.3rem] tracking-[0.01rem] hover:!bg-primary-1"
            >
               <Text className="mb-3 whitespace-nowrap  font-semibold" size={"sm"}>
                  {authDetails?.email}
               </Text>
            </Dropdown.Item>

            <hr />

            <hr />
            <Dropdown.Item
               // key={crypto.randomUUID()}
               className=" flex cursor-pointer items-center gap-[0.75rem] py-[0.75rem] text-[0.9rem] leading-[1.3rem] tracking-[0.01rem] hover:!bg-primary-1"
            >
               <Button
                  variant={"link"}
                  onClick={() => {
                     setLoggedIn(false);
                     setCurrentUser(null);
                     setAuthDetails({});

                     router.push("/auth/signin");
                  }}
                  className=" whitespace-nowrap text-red-500 "
                  size={"sm"}
               >
                  Log out
               </Button>
            </Dropdown.Item>
         </Dropdown.Content>
      </Dropdown>
   );
};

export default ProfileIconDropdown;
