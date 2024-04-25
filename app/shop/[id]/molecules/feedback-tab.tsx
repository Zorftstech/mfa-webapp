import React from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Ratings } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';

function FeedbackTab() {
  return (
    <TabsContent value="feedback">
      <div className="mx-auto w-full max-w-[500px] py-3">
        <div className="border-b border-gray-300 p-3">
          <div className="mb-3 flex items-center justify-between ">
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
                <Text className="mb-1" weight={'medium'} size={'sm'}>
                  Daniel Olatunji
                </Text>

                <Ratings value={5} />
              </div>
            </div>
            <Text weight={'medium'} size={'xs'}>
              Customer
            </Text>
          </div>
          <Text size={'xs'}>A delightful choice for those seeking sweetness and tanginess in every bite</Text>
        </div>
        <div className="border-b border-gray-300 p-3">
          <div className="mb-3 flex items-center justify-between ">
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
                <Text className="mb-1" weight={'medium'} size={'sm'}>
                  Daniel Olatunji
                </Text>

                <Ratings value={5} />
              </div>
            </div>
            <Text weight={'medium'} size={'xs'}>
              Customer
            </Text>
          </div>
          <Text size={'xs'}>A delightful choice for those seeking sweetness and tanginess in every bite</Text>
        </div>
      </div>
    </TabsContent>
  );
}

export default FeedbackTab;
