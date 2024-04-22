/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { Text } from '../ui/text';

import { NewsletterForm } from './newsletter-form';

function Newsletter() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-1 px-4 py-4">
      <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <div className="flex flex-col items-center justify-start gap-2 px-4 md:items-start">
          <Text size={'2xl'} weight={'semibold'}>
            Subscribe to our Newsletter
          </Text>
          <Text className=" text-center text-gray-500 md:text-left" size={'md'} weight={'normal'}>
            Join our community of food enthusiasts. Sign up today and let's embark on this flavorful adventure together!
          </Text>
        </div>
        <NewsletterForm />
      </div>
    </main>
  );
}

export default Newsletter;
