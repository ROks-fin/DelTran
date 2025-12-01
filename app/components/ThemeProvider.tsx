'use client';

/**
 * ThemeProvider Component
 * Optimized wrapper for next-themes with performance settings
 *
 * PERFORMANCE:
 * - disableTransitionOnChange: prevents flash/repaint on theme change
 * - forcedTheme="dark": since this is a dark-only site, skip theme detection entirely
 */

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
