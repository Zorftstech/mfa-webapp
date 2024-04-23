import { Search } from 'lucide-react';

import Each from '@/components/helpers/each';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

import dummyimg from '../../images/dummy-category.png';

import './categories.css';
import CategoryItem from './category-item';

interface category {
  id: number;
  img: any;
  title: string;
}

const herocategories: category[] = [
  { id: 1, img: dummyimg, title: 'Fresh Fruit' },
  { id: 2, img: dummyimg, title: 'Fresh Fruit' },
  { id: 3, img: dummyimg, title: 'Fresh Fruit' },
  { id: 4, img: dummyimg, title: 'Fresh Fruit' },
];

export default function Hero() {
  return (
    <div
      className="relative flex h-[400px] flex-col items-center justify-center gap-6 border border-primary bg-primary px-4"
      style={{
        backgroundImage: `url(/images/home/herobg.png)`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',
      }}
    >
      <Text style={{ fontSize: '2em', textAlign: 'center' }} weight={'semibold'} variant={'white'}>
        Need foodstuffs? Search here...
      </Text>
      <div className="relative w-full max-w-lg">
        <Input className="w-full rounded-full bg-white py-6" placeholder="I am looking for..." />
        <Search className="absolute right-4 top-[25%] w-4" />
      </div>
      <div className="category w-full max-w-lg p-2">
        <Each
          of={herocategories}
          render={(category: category, index: number) => <CategoryItem key={index} category={category} />}
        />
      </div>
    </div>
  );
}
