'use client';
import React from 'react';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import Container from '@/components/shared/container';
import RouteDisplay from '../shop/route-display';
import HeaderText from '@/components/ui/header-text';
import { Text } from '@/components/ui/text';

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { width } = useWindowDimensions();
  return (
    <div style={{ paddingTop: '69px' }}>
      {width && width > 768 && <RouteDisplay route={'Contact Us'} />}

      <Container>
        <main style={{ maxWidth: '1200px' }} className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-1 py-4">
            <HeaderText text="Reach Out to Us" color="black" position="left" />
            <Text
            className="text-center text-gray-500" 
            size="sm"
            weight="normal">
            Have any questions, suggestions, advice complaints or inquires? Feel free to contact us using any <br/>of the options below!
            </Text>

        </main>
      </Container>
    </div>
  );
}

export default page;
