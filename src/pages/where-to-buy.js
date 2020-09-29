import React from 'react';
import Layout from 'components/layouts';
import Meta from 'components/meta';
import PharmacyMap from 'components/PharmacyMap';

const WhereToBuyPage = () => {
  return (
    <Layout>
      <Meta title="Где купить?" />
      <section className="bg-white border-b py-8" id="wheretobuy">
        <PharmacyMap />
      </section>
    </Layout>
  );
};

export default WhereToBuyPage;
