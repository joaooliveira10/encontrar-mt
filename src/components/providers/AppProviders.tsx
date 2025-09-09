'use client';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from './QueryProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <Toaster position="top-right" />
    </QueryProvider>
  );
}
