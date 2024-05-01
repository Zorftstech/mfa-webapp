'use client';
import React from 'react';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import Container from '@/components/shared/container';
import RouteDisplay from '../shop/route-display';

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { width } = useWindowDimensions();
  return (
    <div style={{ paddingTop: '69px' }}>
      {width && width > 768 && <RouteDisplay route={'Contact Us'} />}

      <Container>
      <main style={{ maxWidth: '1200px' }} className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-1 py-4">

        </main>
      </Container>
    </div>
  );
}

export default page;
