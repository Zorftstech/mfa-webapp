"use client";
import React, { useState } from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import useUserInfo from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@radix-ui/react-dialog';
// import { Flex, Text, Button } from '@radix-ui/themes';

function Page() {
   const { refetch } = useUserInfo();
   const refetchUserInfo = () => {
      refetch();
   };

    const [email, setEmail] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) {
        setError('Please enter your email address.')
        return
        }
        setIsDialogOpen(true)
    }

    const handleConfirmDelete = () => {
        // Simulating an API call to delete the account
        setTimeout(() => {
        setIsDialogOpen(false)
        setIsSuccess(true)
        setEmail('')
        }, 1000)
    }

   return (
      <DashboardLayout>
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md px-4">
            <h1 className="text-2xl font-bold mb-6">Delete Account</h1>
            {!isSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
                <label htmlFor="email" className="text-lg">Enter your email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2 rounded-md w-full"
                    placeholder="you@example.com"
                />
                <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all">
                    Delete Account
                </button>
                </form>
            ) : (
                <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600">Account successfully deleted!</h2>
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <DialogTitle className="text-xl font-semibold">Confirm Account Deletion</DialogTitle>
                <DialogDescription className="text-sm text-gray-600 mt-2">
                    Are you sure you want to delete the account associated with <strong>{email}</strong>?
                </DialogDescription>
                <div className="flex justify-end gap-4 mt-6">
                    <DialogClose asChild>
                    <button className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition-all" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                    </button>
                    </DialogClose>
                    <button onClick={handleConfirmDelete} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all">
                    Yes, Delete My Account
                    </button>
                </div>
                </DialogContent>
            </Dialog>
        </div>
      </DashboardLayout>
   );
}

export default Page;