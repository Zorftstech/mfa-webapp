import React from 'react';

import Container from '@/components/shared/container';
import { Separator } from '@/components/ui/separator';

import ContactDetails from './components/contact-details';
import Copyright from './components/copyright';
import LearnMore from './components/learn-more';
import QuickLinks from './components/quick-links';

function Footer() {
  return (
    <Container backgroundColor="bg-black">
      <main style={{ maxWidth: '1200px' }} className="mx-auto w-full">
        <div className="mb-4 grid w-full grid-cols-1 gap-8 px-4 py-4 md:grid-cols-3">
          <ContactDetails />
          <QuickLinks />
          <LearnMore />
        </div>
        <Separator style={{ color: '#989898' }} />
        <Copyright />
      </main>
    </Container>
  );
}

export default Footer;
