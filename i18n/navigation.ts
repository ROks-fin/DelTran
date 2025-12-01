import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Create navigation components that work with the locale
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
