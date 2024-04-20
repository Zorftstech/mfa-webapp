import React from 'react';

function Container({ children, backgroundColor }: { children: any; backgroundColor?: string }) {
  return (
    <main className={`flex flex-col items-center ${backgroundColor || null} justify-center gap-1 py-4`}>
      {children}
    </main>
  );
}

export default Container;
