import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Layout from 'components/layouts/page';
import Meta from 'components/Meta';

const UsagePage = (): JSX.Element => {
  const router = useRouter();
  const title = 'Подтверждение заказа';

  useEffect(() => {
    const { m } = router.query;
    const orderIdValue = parseInt(m as string, 10);

    if (!(orderIdValue > 0)) {
      router.replace('/');
    }
  }, []);

  return (
    <Layout>
      <Meta title={title} />

      <h3 className="text-3xl font-bold leading-none mb-3 text-center">
        {title}
      </h3>
      <hr />
      <div className="container mx-auto px-2 pt-4 text-gray-700 text-xl text-justify">
        <h4 className="text-xl leading-none mb-3 text-center font-bold">
          Благодарим за приобретение продукции Алтайсорбент!
        </h4>
        <h4 className="text-xl leading-none mb-3 text-center font-bold">
          Наш менеджер свяжется с вами в ближайшее время для подтверждения
          заказа!
        </h4>
      </div>
    </Layout>
  );
};

export default UsagePage;
