'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: 'Full Name must be at least 2 characters.',
  }),
  phone_number: z.string().min(2, {
    message: 'Phone must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please provide a valid email address...',
  }),
});

export function NewsletterForm({ mode }: { mode?: 'light' | 'dark' }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone_number: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={`rounded-2xl border ${mode === 'dark' ? 'border-[#393939] bg-[#393939] text-white' : 'border-gray-100 bg-gray-100'}`}
                  placeholder="Full name*"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={`rounded-2xl border ${mode === 'dark' ? 'border-[#393939] bg-[#393939] text-white' : 'border-gray-100 bg-gray-100'}`}
                  placeholder="E-mail*"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={`rounded-2xl border ${mode === 'dark' ? 'border-[#393939] bg-[#393939] text-white' : 'border-gray-100 bg-gray-100'}`}
                  placeholder="Phone Number*"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="rounded-2xl" type="submit">
          Subscribe
        </Button>
      </form>
    </Form>
  );
}
