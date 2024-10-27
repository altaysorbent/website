import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/lib/theme';
import ContactPhones from '@/components/ContactPhones';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { ReactNode } from 'react';
import NotistackProvider from '@/components/NotistackProvider';
import YandexMetrika from '@/components/YandexMetrika';

import { Exo_2 } from 'next/font/google';
import Chatra from '@/components/Chatra';
import HeaderCloseNotification from '@/components/HeaderCloseNotification';

const exo2 = Exo_2({
  weight: ['400', '500', '600', '700'],
  subsets: ['cyrillic'],
  display: 'block',
  variable: '--font-exo2',
});

export const metadata: Metadata = {
  title: 'Алтайсорбент',
  description:
    'Алтайсорбент - 100% натуральный кремнесодержащий энтеросорбент с широким спектром действия',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" className={exo2.variable}>
      <body className="gradient leading-normal tracking-normal text-white">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <NotistackProvider>
              <div className="flex flex-col text-gray-700">
                <Header />
                <HeaderCloseNotification  />
                <ContactPhones />
                {children}
                <Footer />
              </div>
              <YandexMetrika />
              <Chatra />
            </NotistackProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
