'use client';
import { useEffect } from 'react';

export default function Chatra() {
  useEffect(() => {
    (window as any).ChatraID = 'frymbj2afQB6g72sb';
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://call.chatra.io/chatra.js';
    document.body.appendChild(script);
  }, []);

  return <div />;
}
