import React from 'react';
import type { Metadata } from 'next';

import PharmacyMap, { TPharmacy } from '@/components/PharmacyMap';
import { getMeta } from '@/lib/meta';
import * as contentful from 'contentful';

export const metadata: Metadata = getMeta({ title: 'Где купить?' });

export default async function WhereToBuyPage() {
  const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: process.env.NEXT_CONTENTFUL_SPACE_ID!,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN!,
  });

  let pharmacies: TPharmacy[] = [];
  try {
    const entries = await client.getEntries({ content_type: 'pharmacy' });
    pharmacies = entries.items as never as TPharmacy[];
  } catch (err) {
    console.log(err);
  }

  return (
    <section className="border-b bg-white py-8" id="wheretobuy">
      <PharmacyMap pharmacies={pharmacies} />
    </section>
  );
}
