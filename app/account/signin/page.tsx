"use client";
import React from "react";
import Container from "@/components/shared/container";
import RouteDisplay from "../../../components/shared/route-display";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Text } from "@/components/ui/text";
import { PasswordInput } from "@/components/ui/password-input";

const FormSchema = z.object({
   email: z.string().min(2, {
      message: "email must be at least 2 characters.",
   }),
   password: z.string().min(2, {
      message: "email must be at least 5 characters.",
   }),
});

function Page() {
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
         title: "You submitted the following values:",
         description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
               <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
         ),
      });
   }

   return (
      <div className="pt-[69px]">
         <RouteDisplay route={"Login"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <div className="w-full max-w-[600px] rounded-md border border-gray-100 px-5 py-8 shadow">
                  <h1 className="mb-4 w-full text-center text-3xl font-semibold">Sign In</h1>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input className="py-6" placeholder="Email" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <PasswordInput
                                       className="py-6"
                                       placeholder="Password"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <div className="my-8 flex w-full items-center justify-between ">
                           <div className="flex items-center space-x-2">
                              <Checkbox id="terms" />
                              <label
                                 htmlFor="terms"
                                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                 Remember Me
                              </label>
                           </div>
                           <Link
                              className="text-sm font-medium hover:text-blue-800 hover:underline"
                              href={"/account/recover"}
                           >
                              Forgot Password?
                           </Link>
                        </div>
                        <Button className="w-full rounded-3xl" type="submit">
                           Login
                        </Button>
                        <div className="my-2 flex w-full items-center justify-center gap-1 ">
                           <Text size={"sm"} weight={"medium"}>
                              Dont have an account?
                           </Text>
                           <Link
                              href={"/account/register"}
                              className="text-sm font-medium hover:text-blue-800 hover:underline"
                           >
                              Register
                           </Link>
                        </div>
                     </form>
                  </Form>
               </div>
            </main>
         </Container>
      </div>
   );
}

export default Page;
