import React from 'react';
import Layout from 'components/layouts';
import Meta from 'components/meta';
import BuyForm from 'components/BuyForm';

const BuyPage = () => {
  return (
    <Layout>
      <Meta title="Купить" />
      <section className="bg-white border-b py-8" id="buy">
        <BuyForm />
      </section>
    </Layout>
  );
};

export default BuyPage;
