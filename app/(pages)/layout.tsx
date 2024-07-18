import React from 'react';
import type { ReactNode } from 'react';

export default function PagesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex-grow bg-white py-8">
      <div className="container mx-auto h-full max-w-6xl">{children}</div>
    </div>
  );
}
