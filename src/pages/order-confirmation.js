import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/page';
import Meta from '../components/meta';
import { navigate } from 'gatsby';

const UsagePage = () => {
  const title = 'Подтверждение заказа';
  const [, setOrderId] = useState(0);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const orderIdValue = parseInt(currentUrl.searchParams.get('m'));

    if (orderIdValue > 0) {
      setOrderId(orderIdValue);
    } else {
      navigate('/');
    }
  }, []);

  return (
    <Layout>
      <Meta title={title} />

      <h3 className="text-3xl font-bold leading-none mb-3 text-center">{title}</h3>
      <hr />
      <div className="container mx-auto px-2 pt-4 text-gray-800 text-xl text-justify">
        <h4 className="text-xl leading-none mb-3 text-center font-bold">
          Благодарим за приобретение продукции Алтайсорбент!
        </h4>
        <h4 className="text-xl leading-none mb-3 text-center font-bold">
          Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа!
        </h4>
      </div>
    </Layout>
  );
};

export default UsagePage;
