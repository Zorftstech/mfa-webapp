import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';

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
      <TabsContent value="description">
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <Text className="text-gray-500" size={'xs'} weight={'medium'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a cursus nibh, sit amet lobortis metus. Fusce
            dapibus, turpis non ornare porttitor, ligula magna facilisis odio, at ultricies sapien arcu vitae turpis.
            Integer at dolor sit amet ipsum imperdiet accumsan. Aliquam vel magna vestibulum, tristique ipsum
            Pellentesque posuere ante condimentum lectus tincidunt, in volutpat felis tristique. Nam eu ornare leo. Nunc
            egestas congue ligula, vitae sagittis nunc pellentesque a. Praesent scelerisque mauris lorem, non aliquam
            odio ultricies in. Phasellus a lacinia libero. Sed eleifend quis massa eget dictum. Integer porttitor
            pulvinar volutpat. Duis eget molestie magna. Etiam vestibulum justo at justo rhoncus, a feugiat lectus
            vulputate. Suspendisse potenti. Morbi facilisis velit ut est vulputate posuere.
          </Text>
          <iframe className="h-[250px] w-full border border-gray-200" />
        </div>
      </TabsContent>
      <TabsContent value="information"></TabsContent>
      <TabsContent value="feedback"></TabsContent>
    </Tabs>
  );
}
