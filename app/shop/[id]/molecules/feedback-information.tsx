import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';

import DescriptionTab from './description-tab';
import FeedbackTab from './feedback-tab';
import InformationTab from './information-tab';

export function FeedbackInformation() {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3 border-b border-gray-200">
        <TabsTrigger value="description" className="text-wrap">
          <Text size={'xs'} weight={'medium'}>
            Description
          </Text>
        </TabsTrigger>
        <TabsTrigger value="information" className="text-wrap">
          <Text size={'xs'} weight={'medium'}>
            Additional Information
          </Text>
        </TabsTrigger>
        <TabsTrigger value="feedback" className="text-wrap">
          <Text size={'xs'} weight={'medium'}>
            Customer Feedback
          </Text>
        </TabsTrigger>
      </TabsList>
      <DescriptionTab />
      <InformationTab />
      <FeedbackTab />
    </Tabs>
  );
}
