'use client';

import { useEffect } from 'react';

/**
 * Tawk.to Live Chat Widget
 *
 * To configure:
 * 1. Create a free account at https://www.tawk.to/
 * 2. Add your website property in the Tawk.to dashboard
 * 3. Copy your Property ID from the dashboard (found under Administration > Property)
 *    - It looks like: "abc12345" or a similar hash
 * 4. Replace 'YOUR_TAWK_TO_PROPERTY_ID' below with your actual Property ID
 *
 * The widget loads asynchronously and will not block page rendering.
 */
export default function LiveChat() {
  useEffect(() => {
    // Prevent duplicate script injection in development (React Strict Mode)
    if (document.getElementById('tawk-to-script')) return;

    const propertyId = 'YOUR_TAWK_TO_PROPERTY_ID';

    // Define the Tawk.to API stub before loading the script
    if (typeof window !== 'undefined' && !window.Tawk_API) {
      // @ts-expect-error — Tawk.to global stubs
      window.Tawk_API = window.Tawk_API || {};
      // @ts-expect-error — Tawk.to global stubs
      window.Tawk_LoadStart = new Date();
    }

    const script = document.createElement('script');
    script.id = 'tawk-to-script';
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/default`;
    script.setAttribute('charset', 'UTF-8');
    script.setAttribute('crossorigin', '*');

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove the script and any Tawk.to widget elements on unmount
      const existingScript = document.getElementById('tawk-to-script');
      if (existingScript) {
        existingScript.remove();
      }
      // Remove Tawk.to iframe if present
      const tawkIframe = document.querySelector('iframe[title*="chat"]') as HTMLElement | null;
      if (tawkIframe) {
        tawkIframe.remove();
      }
    };
  }, []);

  return null;
}
