import React from 'react';
import IndexLayout from 'components/layouts';
import Meta from 'components/Meta';
import PharmacyMap from 'components/PharmacyMap';

const WhereToBuyPage = (): JSX.Element => {
  return (
    <IndexLayout>
      <Meta title="Где купить?" />
      <section className="bg-white border-b py-8" id="wheretobuy">
        <PharmacyMap />
      </section>
    </IndexLayout>
  );
};

export default WhereToBuyPage;
