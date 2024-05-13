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
import {
   SelectContent,
   Select,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const formSchema = z.object({
   firstname: z.string().min(2, {
      message: "First name must be at least 3 characters.",
   }),
   lastname: z.string().min(2, {
      message: "Last name must be at least 3 characters.",
   }),
   company: z.string().min(0, {
      message: "",
   }),
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
   email: z.string().min(2, {
      message: "Email must be at least 5 characters.",
   }),
   phone: z.string().min(2, {
      message: "Phone must be at least 10 characters.",
   }),
});

const BillingAddress = () => {
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         firstname: "",
         lastname: "",
         address: "",
         email: "",
         phone: "",
         company: "",
         country: "",
         state: "",
         zipcode: "",
      },
   });

   // 2. Define a submit handler.
   function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
   }
   return (
      <div className="mt-4 w-full rounded-md bg-white p-4">
         <h1 className="mb-2">Billing Address</h1>
         <Separator />
         <div className="w-full">
            <div>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-3">
                     <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
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
                     <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                        <FormField
                           control={form.control}
                           name="country"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>Country / Region</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select country" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       <SelectItem value="m@example.com">m@example.com</SelectItem>
                                       <SelectItem value="m@google.com">m@google.com</SelectItem>
                                       <SelectItem value="m@support.com">m@support.com</SelectItem>
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="state"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>States</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select state" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       <SelectItem value="m@example.com">m@example.com</SelectItem>
                                       <SelectItem value="m@google.com">m@google.com</SelectItem>
                                       <SelectItem value="m@support.com">m@support.com</SelectItem>
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="zipcode"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>Zip Code</FormLabel>
                                 <FormControl>
                                    <Input {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                        {" "}
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
                     </div>
                     <Button className="rounded-3xl" type="submit">
                        Save Changes
                     </Button>
                  </form>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default BillingAddress;
