"use client";
import React from "react";
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
import { Input } from "@/components/ui/input";
import Image from "next/image";

const formSchema = z.object({
   firstname: z.string().min(2, {
      message: "First name must be at least 3 characters.",
   }),
   lastname: z.string().min(2, {
      message: "Last name must be at least 3 characters.",
   }),
   email: z.string().min(2, {
      message: "Email must be at least 5 characters.",
   }),
   phone: z.string().min(2, {
      message: "Phone number must be at least 10 characters.",
   }),
});

const AccountSettings = () => {
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         firstname: "",
         lastname: "",
         email: "",
         phone: "",
      },
   });

   // 2. Define a submit handler.
   function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
   }
   return (
      <div className="w-full rounded-md bg-white p-4">
         <h1 className="mb-2">Account Settings</h1>
         <Separator />
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-3">
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
                     <FormField
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
                     />
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

                     <Button className="rounded-3xl" type="submit">
                        Save Changes
                     </Button>
                  </form>
               </Form>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
               <Image src={account} alt="account" />
               <Button className="rounded-3xl border border-[#7ab42c] bg-transparent text-[#7ab42c]">
                  Choose Image
               </Button>
            </div>
         </div>
      </div>
   );
};

export default AccountSettings;
