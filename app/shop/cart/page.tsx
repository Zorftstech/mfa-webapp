'use client';

import { X } from 'lucide-react';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

import Image from 'next/image';

import Container from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const CartTotal = () => {
  return (
    <div className="mt-6 w-full bg-white p-4">
      <Text size={'lg'} weight={'medium'}>
        Cart Total
      </Text>
      <div className="mt-3 flex items-center justify-between">
        <Text size={'sm'} weight={'medium'}>
          Subtotal:
        </Text>
        <Text size={'sm'} weight={'medium'}>
          ₦2,000
        </Text>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Text size={'sm'} weight={'medium'}>
          Shipping:
        </Text>
        <Text size={'sm'} weight={'medium'}>
          Free
        </Text>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Text size={'sm'} weight={'medium'}>
          Total:
        </Text>
        <Text size={'sm'} weight={'medium'}>
          ₦2,000
        </Text>
      </div>
      <Button className="mb-3 mt-5 w-full rounded-3xl px-4 text-xs">Proceed to checkout</Button>
      <Text size={'sm'} weight={'medium'}>
        Have a coupon code?
      </Text>
      <div className="mt-5 flex w-full items-center justify-between overflow-hidden rounded-full border border-gray-300 p-1">
        <input type="text" placeholder="Coupon code" className="border-none pl-2 text-xs outline-none focus:ring-0" />
        <Button className="rounded-3xl bg-black px-5 text-xs text-white">Apply</Button>
      </div>
    </div>
  );
};

function page() {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { width } = useWindowDimensions();
  return (
    <div style={{ paddingTop: '69px' }}>
      {width && width > 768 && <RouteDisplay route={'Shopping cart'} />}
      <Container backgroundColor="bg-gray-100">
        <main
          style={{ maxWidth: '1200px' }}
          className="mx-auto my-8 flex w-full flex-col items-center justify-center gap-1 py-4"
        >
          <Text size={'md'} weight={'semibold'}>
            My Shopping cart
          </Text>
          {width && width <= 768 && (
            <div className="my-5 w-full bg-white p-4">
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
                      <div className="my-3">
                        <div className="flex w-fit items-center gap-2 rounded-full border border-gray-300 p-2">
                          <Button
                            // onClick={handleMinus}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                          >
                            <Minus className="w-4" />
                          </Button>
                          <Text size={'sm'} weight={'medium'}>
                            1
                          </Text>
                          <Button
                            // onClick={handleAdd}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                          >
                            <Plus className="w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black">
                    <X className="w-3" />
                  </Button>
                </div>
              ))}
              <CartTotal />
            </div>
          )}
          {width && width > 768 && (
            <div className="flex w-full items-start justify-between gap-4">
              <div className="mt-6 w-full flex-[4] bg-white p-3">
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">PRODUCT</TableHead>
                      <TableHead className="text-xs">PRICE</TableHead>
                      <TableHead className="text-center text-xs">QUANTITY</TableHead>
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
                        <TableCell>₦{invoice.price.toLocaleString()}</TableCell>
                        <TableCell className="">
                          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-gray-300 p-2">
                            <Button
                              // onClick={handleMinus}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                            >
                              <Minus className="w-4" />
                            </Button>
                            <Text size={'sm'} weight={'medium'}>
                              1
                            </Text>
                            <Button
                              // onClick={handleAdd}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                            >
                              <Plus className="w-4" />
                            </Button>
                          </div>
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
                <div className="mt-5 flex w-full items-center justify-between px-4">
                  <Button className="rounded-3xl px-4 text-xs">Return to shop</Button>
                  <Button variant={'ghost'} className="rounded-3xl bg-gray-100 px-4 text-xs">
                    Update cart
                  </Button>
                </div>
              </div>
              <div className="flex flex-1">
                <CartTotal />
              </div>
            </div>
          )}
        </main>
      </Container>
    </div>
  );
}

export default page;
