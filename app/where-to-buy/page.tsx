import React from 'react';
import type { Metadata } from 'next';

import PharmacyMap, { TPharmacy } from '@/components/PharmacyMap';
import { getMeta } from '@/lib/meta';
import { getClient } from '@/lib/services/contentful';

export const metadata: Metadata = getMeta({ title: 'Где купить?' });

export default async function WhereToBuyPage() {
  const client = getClient();

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
