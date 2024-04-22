import React from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import { Ratings } from '@/components/ui/rating';
import { Text } from '@/components/ui/text';

function TestimonialItem({ index }: { index: number }) {
  return (
    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
        <Card className="w-full bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    className="h-full w-full rounded-[inherit] object-cover"
                    src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                    alt="Colm Tuite"
                  />

                  <AvatarFallback>{'Customer'}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="mb-1">Daniel Olatunji</CardTitle>
                  <CardDescription>Customer</CardDescription>
                </div>
              </div>
              <Ratings value={5} />
            </div>
          </CardHeader>
          <CardContent>
            <Text size={'sm'} weight={'medium'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a cursus nibh, sit amet lobortis metus.
              Fusce dapibus, turpis non ornare porttitor, ligula magna facilisis odio, at ultricies
            </Text>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}

export default TestimonialItem;
