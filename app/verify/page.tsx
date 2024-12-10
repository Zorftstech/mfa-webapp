"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/shared/container";
import RouteDisplay from "@/components/shared/route-display";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import VerificationInput from "react-verification-input";
import { Button } from "@/components/ui/button";
import useStore from "@/store";
// import {
//    createUserWithEmailAndPassword,
//    signInWithEmailAndPassword,
//    updateProfile,
// } from "firebase/auth";
// import { authFirebase, db } from "@/firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import ProcessError from "@/lib/error";
// import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { toast } from "sonner";
import { useParams, useSearchParams } from "next/navigation";
import { useCreate, useMutate } from "@/lib/hooks/request";
import { cn } from "@/lib/utils";

function Page() {
   const [secondsLeft, setSecondsLeft] = useState(60);

   const router = useRouter();
   const search = useSearchParams();
   const redirectUrl = search.get("redirect");
   const phone = search.get("phone");
   const { setAuthDetails, setLoggedIn, setCurrentUser } = useStore((store) => store);
   const [code, setCode] = useState<string>("");
   const { create, loading: isPending } = useCreate("");
   const { mutating, loading } = useMutate(`generate_phone_verification_token`);

   useEffect(() => {
      const countdownInterval = setInterval(() => {
         setSecondsLeft((prevSeconds) => {
            if (prevSeconds === 0) {
               clearInterval(countdownInterval);
            }

            return Math.max(0, prevSeconds - 1);
         });
      }, 1000);

      return () => clearInterval(countdownInterval);
   }, []);

   function onSubmit(e: any) {
      e.preventDefault();
   }

   async function resend() {
      await mutating({ phone_number: phone });
   }

   return (
      <div className="pt-[4rem]">
         <head>
            <title>Sign In | MyFoodAngels</title>
            <meta
               name="description"
               content="Sign in to your MyFoodAngels account to access your dashboard, manage your orders, and explore our wide selection of groceries and food items."
            />
            <meta
               name="keywords"
               content="Sign In, MyFoodAngels, Login, Food Delivery, Account Access"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/icon.png" />
            <meta property="og:title" content="Sign In | MyFoodAngels" />
            <meta
               property="og:description"
               content="Sign in to your MyFoodAngels account to manage your orders and explore our grocery selection."
            />
            <meta property="og:url" content="https://myfoodangels.com/account/signin" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/images/og.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Sign In | MyFoodAngels" />
            <meta
               property="twitter:description"
               content="Sign in to your MyFoodAngels account to manage your orders and explore our grocery selection."
            />
            <meta property="twitter:image" content="/images/og.jpg" />
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     "@context": "https://schema.org",
                     "@type": "FAQPage",
                     mainEntity: [
                        {
                           "@type": "Question",
                           name: "How do I sign in to MyFoodAngels?",
                           acceptedAnswer: {
                              "@type": "Answer",
                              text: "To sign in to MyFoodAngels, enter your registered email address and password on the sign-in page and click 'Sign In'.",
                           },
                        },
                        {
                           "@type": "Question",
                           name: "What if I forgot my password?",
                           acceptedAnswer: {
                              "@type": "Answer",
                              text: "If you forgot your password, click on 'Forgot Password?' on the sign-in page, and follow the instructions to reset your password.",
                           },
                        },
                     ],
                  }),
               }}
            />
         </head>

         <RouteDisplay route={"Verify"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <div className="w-full max-w-[600px] rounded-md border border-gray-100 px-5 py-8 shadow">
                  <h1 className="mb-4 w-full text-center text-3xl font-semibold">Phone Verification</h1>

                  <form onSubmit={onSubmit} className="w-full space-y-6">
                     <div className="flex h-24 w-full items-center justify-center">
                        <VerificationInput
                           classNames={{
                              character: "character",
                              container: "container",
                           }}
                           placeholder=" "
                           length={6}
                           inputProps={{
                              autoComplete: "one-time-code", // for IOS
                           }}
                           onChange={(value: string) => {
                              setCode(value);
                           }}
                        />
                     </div>

                     <Button className="w-full rounded-3xl" type="submit" disabled={isPending}>
                        {isPending ? <Spinner /> : "Verify"}
                     </Button>
                  </form>
                  {secondsLeft <= 0 && (
                     <div className={cn("block w-full space-y-3")}>
                        <div className="flex w-full my-4 items-center justify-center gap-x-2">
                           <p>Didn't get OTP code?</p>
                           <Button
                              disabled={loading}
                              variant={"primary"}
                              onClick={resend}
                              className={cn(
                                 "hidden w-fit px-2 font-semibold text-[#7ab42c] rounded-xl hover:underline",
                                 secondsLeft <= 0 && "flex",
                              )}
                           >
                              Resend
                           </Button>
                        </div>
                     </div>
                  )}
                  <p className="w-full text-center font-semibold">{`0:${
                     secondsLeft >= 10 ? "" : "0"
                  }${secondsLeft}`}</p>
               </div>
            </main>
         </Container>
      </div>
   );
}

export default Page;
