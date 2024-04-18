import { Search } from 'lucide-react';

import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

export const Hero = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-6 border border-primary bg-primary px-4"
      style={{
        height: '400px',
        backgroundImage: `url(/images/home/herobg.png)`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',
      }}
    >
      <Text style={{ fontSize: '2em', textAlign: 'center' }} weight={'bold'} variant={'white'}>
        Need foodstuffs? Search here...
      </Text>
      <div className="relative w-full max-w-lg">
        <Input className="w-full rounded-full bg-white py-6" placeholder="I am looking for..." />
        <Search className="absolute right-4 top-[25%] w-4" />
      </div>
      {/* Your content here */}
    </div>
  );
};
