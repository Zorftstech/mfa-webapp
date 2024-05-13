"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
   currentPassword: z.string().min(6, {
      message: "Current password must be at least 6 characters.",
   }),
   newPassword: z.string().min(6, {
      message: "New password must be at least 6 characters.",
   }),
   confirmPassword: z.string().min(6, {
      message: "New password must be at least 6 characters.",
   }),
});

const BillingAddress = () => {
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         currentPassword: "",
         newPassword: "",
         confirmPassword: "",
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
         <h1 className="mb-2">Change Password</h1>
         <Separator />
         <div className="w-full">
            <div>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-3">
                     <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                           <FormItem className="w-full flex-1">
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                 <PasswordInput {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                        {" "}
                        <FormField
                           control={form.control}
                           name="newPassword"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>New Password</FormLabel>
                                 <FormControl>
                                    <PasswordInput {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="confirmPassword"
                           render={({ field }) => (
                              <FormItem className="w-full flex-1">
                                 <FormLabel>Confirm Password</FormLabel>
                                 <FormControl>
                                    <PasswordInput {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <Button className="rounded-3xl" type="submit">
                        Change Password
                     </Button>
                  </form>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default BillingAddress;
