import React from 'react';

import Meta from 'components/Meta';
import PharmacyMap from 'components/PharmacyMap';
import MainLayout from 'layouts/Main';

const WhereToBuyPage = (): JSX.Element => {
  return (
    <MainLayout>
      <Meta title="Где купить?" />
      <section className="bg-white border-b py-8" id="wheretobuy">
        <PharmacyMap />
      </section>
    </MainLayout>
  );
};

export default WhereToBuyPage;
