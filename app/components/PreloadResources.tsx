/**
 * PreloadResources Component
 * Optimizes resource loading with preconnect, dns-prefetch, and preload hints
 *
 * PERFORMANCE: Critical for reducing connection latency to external resources
 */

'use client';

import ReactDOM from 'react-dom';

export function PreloadResources() {
  // Preconnect to Google Fonts (used by next/font internally)
  ReactDOM.preconnect('https://fonts.googleapis.com', { crossOrigin: 'anonymous' });
  ReactDOM.preconnect('https://fonts.gstatic.com', { crossOrigin: 'anonymous' });

  // DNS prefetch for analytics (loaded later but good to resolve DNS early)
  ReactDOM.prefetchDNS('https://va.vercel-scripts.com');

  // Preconnect to Vercel analytics
  ReactDOM.preconnect('https://va.vercel-scripts.com', { crossOrigin: 'anonymous' });

  return null;
}
