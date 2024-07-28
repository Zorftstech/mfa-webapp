"use client";
import React from "react";
import Container from "@/components/shared/container";
import RouteDisplay from "../../../components/shared/route-display";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
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
import useStore from "@/store";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   updateProfile,
} from "firebase/auth";
import { authFirebase, db } from "@/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import ProcessError from "@/lib/error";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { toast } from "sonner";
import { useParams, useSearchParams } from "next/navigation";

const formSchema = z.object({
   email: z.string().min(2, {
      message: "email must be at least 2 characters.",
   }),
   password: z.string().min(2, {
      message: "email must be at least 5 characters.",
   }),
});
type formInterface = z.infer<typeof formSchema>;

function Page() {
   const form = useForm<formInterface>({
      resolver: zodResolver(formSchema),
      mode: "all",
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const router = useRouter();
   const search = useSearchParams();
   const redirectUrl = search.get("redirect");
   const { setAuthDetails, setLoggedIn, setCurrentUser } = useStore((store) => store);
   const { mutate, isPending } = useMutation<any, any, formInterface>({
      mutationFn: async ({ email, password }) => {
         const user = await signInWithEmailAndPassword(authFirebase, email, password);
         return user;
      },
      onSuccess: async (data) => {
         // setAuthDetails(data);
         setLoggedIn(true);
         setCurrentUser(data);

         if (redirectUrl) {
            router.push(redirectUrl);
         } else {
            router.push("/dashboard");
         }

         // Create a reference to the document
         const docRef = doc(db, "users", data.user.uid);

         // Retrieve the document
         const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
            // Document exists, use the data
            setAuthDetails({
               ...docSnap.data(),
               ...data["_tokenResponse"],
               id: data.user.uid,
            });
            return docSnap.data(); // Return the document data
         } else {
            // Document does not exist
            console.log("No such document!");
            return null;
         }
      },
      onError: (err) => {
         ProcessError(err);
      },
   });

   function onSubmit(data: formInterface) {
      mutate(data);
   }

   return (
      <div className="pt-[100px]">
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
                        <Button className="w-full rounded-3xl" type="submit" disabled={isPending}>
                           {isPending ? <Spinner /> : "Sign In"}
                        </Button>
                        <div className="my-2 flex w-full items-center justify-center gap-1 ">
                           <Text size={"sm"} weight={"medium"}>
                              Dont have an account?
                           </Text>
                           <Link
                              href={
                                 redirectUrl
                                    ? `/account/register?redirect=${redirectUrl}`
                                    : "/account/register"
                              }
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
