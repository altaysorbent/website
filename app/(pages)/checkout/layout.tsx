import type { ReactNode } from 'react';

const title = 'Оформление заказа';

export default function CheckoutLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="mx-auto min-h-full max-w-4xl px-2 sm:px-0">
      <h4 className="mb-10 text-center text-3xl sm:text-left sm:text-4xl">
        {title}
      </h4>
      {children}
    </div>
  );
}
