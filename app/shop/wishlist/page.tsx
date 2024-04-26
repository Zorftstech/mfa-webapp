'use client';

import { X } from 'lucide-react';
import React from 'react';

import Image from 'next/image';

import Container from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Text } from '@/components/ui/text';

import useWindowDimensions from '@/hooks/useWindowDimensions';
import tomato from '@/images/tomato.png';

import RouteDisplay from '../route-display';

const invoices = [
  {
    id: 1,
    image: tomato,
    name: 'Tomato',
    price: 20000,
    status: 'In Stock',
  },
  {
    id: 2,
    image: tomato,
    name: 'Tomato',
    price: 20000,
    status: 'In Stock',
  },
  {
    id: 3,
    image: tomato,
    name: 'Tomato',
    price: 20000,
    status: 'In Stock',
  },
];

function page() {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { width } = useWindowDimensions();
  return (
    <div style={{ paddingTop: '69px' }}>
      {width && width > 768 && <RouteDisplay route={'wishlist'} />}
      <Container>
        <main
          style={{ maxWidth: '1200px' }}
          className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-1 py-4"
        >
          <Text size={'lg'} weight={'semibold'}>
            My Wishlist
          </Text>
          {width && width <= 768 && (
            <div className="mb-5 w-full p-4">
              {invoices.map(invoice => (
                <div
                  className="flex w-full items-center justify-between border-b border-gray-300 px-3 py-5"
                  key={invoice.id}
                >
                  <div className="flex w-full items-center gap-4">
                    <Image src={invoice.image} alt={invoice.name} />
                    <div>
                      {' '}
                      <Text size={'sm'} weight={'medium'}>
                        {invoice.name}
                      </Text>{' '}
                      <Text
                        className="my-2 w-fit rounded-2xl border border-green-100 bg-green-100 px-4 py-2"
                        size={'xs'}
                        weight={'normal'}
                      >
                        {invoice.status}
                      </Text>
                      <Text size={'sm'}>₦{invoice.price.toLocaleString()}</Text>
                      <Button className="mt-4 rounded-3xl px-4 text-xs">Add to Cart</Button>
                    </div>
                  </div>
                  <Button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black">
                    <X className="w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {width && width > 768 && (
            <Table className="mt-6">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">PRODUCT</TableHead>
                  <TableHead className="text-xs">PRICE</TableHead>
                  <TableHead className="text-xs">STOCK STATUS</TableHead>
                  <TableHead className="text-right">{}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map(invoice => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Image src={invoice.image} alt={invoice.name} />
                        <Text size={'sm'}>{invoice.name}</Text>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.price}</TableCell>
                    <TableCell className="">
                      <Text
                        className="w-fit rounded-2xl border border-green-100 bg-green-100 px-4 py-2"
                        size={'xs'}
                        weight={'normal'}
                      >
                        {invoice.status}
                      </Text>
                    </TableCell>
                    <TableCell className="">
                      <Button className="rounded-3xl px-4 text-xs">Add to Cart</Button>
                    </TableCell>
                    <TableCell className="">
                      <Button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black">
                        <X className="w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </main>
      </Container>
    </div>
  );
}

export default page;
