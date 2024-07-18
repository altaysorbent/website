'use client';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import type { ReactNode } from 'react';

export default function NotistackProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={5000}
      maxSnack={3}
    >
      {children}
    </SnackbarProvider>
  );
}
