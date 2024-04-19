import { X } from 'lucide-react';
import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

import logo from '../../images/logo.png';

export function MobileNav({ handleVisibility }: { handleVisibility: any }) {
  return (
    <div
      className="boder-white z-10000 fixed left-0 top-0 z-50 flex h-[99.8vh] w-[60%] flex-col items-center justify-start gap-[20px] border bg-white shadow-sm"
      style={{ width: '80%', height: '99.8vh' }}
    >
      <div className="flex w-full items-center justify-start p-4">
        <Button variant={'ghost'} size={'none'} onClick={() => handleVisibility()}>
          <X className="w-4" />
        </Button>
      </div>
      <div style={{ height: '60%' }} className="flex w-full flex-col items-center justify-center gap-7">
        {/* {links.map((link) => (
      <ActiveLink key={link.id} title={link.title} href={link.path} />
    ))} */}
      </div>
      <div className="flex w-full flex-1 items-center justify-center">
        <Image src={logo} alt="mfa_logo" />
      </div>
    </div>
  );
}
