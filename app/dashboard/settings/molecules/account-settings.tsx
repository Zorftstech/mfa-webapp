"use client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import account from "@/images/account.png";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input, inputVariants } from "@/components/ui/input";
import Image from "next/image";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import ProcessError from "@/lib/error";
import { useDropzone } from "react-dropzone";
import useStore from "store";
import { toast } from "sonner";
import { db } from "@/firebase";
import { splitStringBySpaceAndReplaceWithDash } from "@/lib/utils";
import { Camera } from "lucide-react";
import Spinner from "@/components/ui/spinner";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useCreate, useMutateRequest } from "@/lib/hooks/request";
const formSchema = z.object({
   firstname: z.string().min(2, {
      message: "First name must be at least 3 characters.",
   }),
   lastname: z.string().min(2, {
      message: "Last name must be at least 3 characters.",
   }),
   // email: z.string().min(2, {
   //    message: "Email must be at least 5 characters.",
   // }),
   phone: z.string().min(2, {
      message: "Phone number must be at least 10 characters.",
   }),
   company: z.string().optional(),
   address: z.string().min(2, {
      message: "Address must be at least 5 characters.",
   }),
   zipcode: z.string().min(2, {
      message: "Zipcode must be at least 6 characters.",
   }),
   country: z.string().min(2, {
      message: "Country must be at least 4 characters.",
   }),
   state: z.string().min(2, {
      message: "Country must be at least 3 characters.",
   }),
});

const AccountSettings = ({ refetchUserInfo }: { refetchUserInfo: () => void }) => {
   const { authDetails } = useStore((store) => store);
   console.log("authDetails", authDetails);
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         firstname: authDetails.firstName ?? "",
         lastname: authDetails.lastName ?? "",

         phone: authDetails.phone ?? "",
         address: authDetails.addressDetails?.address ?? "",

         company: authDetails.addressDetails?.company ?? "",
         country: authDetails.addressDetails?.country ?? "",
         state: authDetails.addressDetails?.state ?? "",
         zipcode: authDetails.addressDetails?.zipcode ?? "",
      },
   });

   const [formIsLoading, setFormIsLoading] = useState(false);
   const [uploading, setUploading] = React.useState(false);
   const [file, setFile] = React.useState<any>(null);
   const [imageUrl, setImageUrl] = React.useState<string | null>(authDetails.photoURL || null); // New state for image URL
   const { create } = useCreate("");
   const {create: update} = useMutateRequest("")
   
   const handleFileDrop = async (files: any) => {
      setFile(files);
      const fileUrl = URL.createObjectURL(files);
      setImageUrl(fileUrl); // Store the URL in state
   };
   const onDrop = (acceptedFiles: any) => {
      handleFileDrop(acceptedFiles[0]);
   };
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      multiple: false,
      accept: {
         "image/jpeg": [],
         "image/png": [],
         "image/gif": [],
      },
   });

   // 2. Define a submit handler.
   async function onSubmit(data: z.infer<typeof formSchema>) {
      setFormIsLoading(true);
      let downloadURL = "";

      if (file) {
         const storageRef = ref(getStorage(), `users/${file.name}`);
         const snapshot = await uploadBytes(storageRef, file);
         downloadURL = await getDownloadURL(snapshot.ref);
      }

      if (!downloadURL) {
         toast.error("Image is required.");
         setFormIsLoading(false);
         return;
      }

      try {
         // const payloadLoystar = {
         //    first_name: data?.firstname,
         //    last_name: data.lastname,
         //    email: authDetails?.email,
         //    phone_number: data?.phone,
         //    date_of_birth: "23-04-1980",
         //    sex: "M",
         //    local_db_created_at: "NiL",
         //    address_line1: data?.address,
         //    address_line2: "NIL",
         //    postcode: Number(data?.zipcode),
         //    state: data.state,
         //    country: data.country || "Nigeria",
         // };

         const loystarToken = localStorage.getItem("loystarToken");
         const loystarUserId  = localStorage.getItem("loystarUserId")

         //


         const response = loystarToken ? await update({
            payload: {
               "data": {
                  "address_line1": data?.address,
                 "address_line2": "NIL",
                 "postcode": Number(data?.zipcode),
             "state": data.state,
               "country": data.country 
               }
             },

             infunctionParam:`merchants/21750/customers/${loystarUserId}/update_address`
         }) :await create({
            payload: {  "data": {
               "first_name": data?.firstname,
               "last_name": data.lastname,
               "email":authDetails?.email,
               "phone_number": data?.phone,
               "date_of_birth": "01-01-1980",
               "sex": "M",
               "local_db_created_at": "NIL",
               "address_line1": data?.address,
               "address_line2": "NIL",
               "postcode": Number(data?.zipcode),
               "state": data.state,
               "country": data.country 
           }},
            infunctionParam: `add_user_for_merchant/21750`,
            errorMessage: "Account already exist",
         });

     console.log("response ",response)
      if (response?.headers && !loystarToken) {
         localStorage.setItem("loystarToken",response?.headers["access-token"])
         localStorage.setItem("loystarUserId", response?.data?.user_id)

      }
         if (response !== null) {
            const postData = {
               firstName: data.firstname,
               lastName: data.lastname,
               photoURL: downloadURL,
               phone: data.phone,
               addressDetails: {
                  address: data.address,
                  company: data.company,
                  country: data.country,
                  state: data.state,
                  zipcode: data.zipcode,
               },
               slug: splitStringBySpaceAndReplaceWithDash(data.firstname + " " + data.lastname),
            };

            const docRef = doc(db, "users", authDetails.id ?? "");
            await updateDoc(docRef, postData);
            toast.success("Profile updated successfully");
            refetchUserInfo();

            // form.reset();
            setImageUrl(null);
            setFile(null);
         }
      } catch (error) {
         // ProcessError(error);
         toast.error("An error occurred, please try again.");
      } finally {
         setFormIsLoading(false);
      }
   }
   return (
      <div className="w-full rounded-md bg-white p-4">
         <h1 className="mb-2">Account Settings</h1>
         <Separator />
         <div className="w-full">
            <div>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="grid grid-cols-1 items-start gap-4  bg-white p-3 md:grid-cols-2"
                  >
                     <div className="w-full space-y-8">
                        <FormField
                           control={form.control}
                           name="firstname"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>First name</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Your first name" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="lastname"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>Last name</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Your last name" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        {/* <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem className="w-full flex-1">
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input placeholder="xyz@gmail.com" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     /> */}
                        <FormField
                           control={form.control}
                           name="phone"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>Phone Number</FormLabel>
                                 <FormControl>
                                    <Input placeholder="(+234) 801-123 3344" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <h1 className="mb-2">Billing Address</h1>
                        <Separator />

                        <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                           <FormField
                              control={form.control}
                              name="company"
                              render={({ field }) => (
                                 <FormItem className="w-full flex-1">
                                    <FormLabel>
                                       Company <span className="text-gray-300">(optional)</span>
                                    </FormLabel>
                                    <FormControl>
                                       <Input placeholder="Company name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                        <FormField
                           control={form.control}
                           name="address"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>Street Address</FormLabel>
                                 <FormControl>
                                    <Input {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <section className="grid grid-cols-2 gap-2 pb-2">
                           <div>
                              <Label htmlFor="country" className=" mb-2 ">
                                 Country
                              </Label>
                              <CountryDropdown
                                 classes={inputVariants({ variant: "default" })}
                                 name={"country"}
                                 defaultOptionLabel="Choose country"
                                 value={form.watch("country")}
                                 onChange={(country) => {
                                    form.setValue("country", country);
                                 }}
                              />
                           </div>

                           <div>
                              <Label htmlFor="state" className=" mb-2 ">
                                 State
                              </Label>

                              <RegionDropdown
                                 classes={inputVariants({ variant: "default" })}
                                 name={"state"}
                                 defaultOptionLabel="Select state or region"
                                 blankOptionLabel="Select state or region"
                                 country={form.watch("country")}
                                 value={form.watch("state")}
                                 onChange={(state) => {
                                    form.setValue("state", state);
                                 }}
                              />
                           </div>
                           <FormField
                              control={form.control}
                              name="zipcode"
                              render={({ field }) => (
                                 <FormItem className="col-span-full w-full flex-1">
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                       <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </section>
                     </div>

                     <div
                        onClick={(e) => {
                           e.stopPropagation();
                           e.preventDefault();
                        }}
                        className="flex items-center justify-center "
                     >
                        <section className=" rounded-xl    ">
                           <section {...getRootProps()}>
                              <input {...getInputProps()} />
                              {imageUrl ? (
                                 <div className="relative h-[10rem] w-[10rem] rounded-full  hover:cursor-pointer">
                                    <Image
                                       src={imageUrl}
                                       width={100}
                                       height={100}
                                       alt="Selected"
                                       className=" h-full w-full  object-cover object-center "
                                    />{" "}
                                    {/* Display the selected image */}
                                    <div className="absolute bottom-[5%] right-0 h-fit rounded-full   bg-slate-100 p-2">
                                       <Camera className="h-6 w-6" />
                                    </div>
                                 </div>
                              ) : isDragActive ? (
                                 <p>Drop the files here ...</p>
                              ) : (
                                 <div className="flex items-center justify-center gap-3  rounded-full  bg-gray-100 px-14 py-12  outline-2  outline-gray-500 hover:cursor-pointer">
                                    <Camera className="h-6 w-6" />
                                 </div>
                              )}
                           </section>
                        </section>
                     </div>

                     <Button className=" rounded-3xl" type="submit" disabled={formIsLoading}>
                        {formIsLoading ? <Spinner /> : " Save Changes"}
                     </Button>
                  </form>
               </Form>
            </div>

            {/* <div className="flex flex-col items-center justify-center gap-4">
               <Image src={account} alt="account" />
               <Button className="rounded-3xl border border-[#7ab42c] bg-transparent text-[#7ab42c]">
                  Choose Image
               </Button>
            </div> */}
         </div>
      </div>
   );
};

export default AccountSettings;
