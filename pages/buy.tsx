import React from 'react';

import Meta from 'components/Meta';
import Description from 'components/Description';
import PageLayout from 'layouts/Page';

import {
  CurrencySymbols,
  productName,
  productPriceKzt,
  productPriceRub,
} from 'constants/Product';

const BuyPage = (): JSX.Element => {
  return (
    <PageLayout>
      <Meta title={productName} />
      <div className="flex flex-wrap mx-auto px-2">
        <div className="w-full">
          <h3 className="text-3xl font-bold leading-none mb-4 text-center sm:text-left">
            {productName}
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row w-full mb-12">
          <div className="w-full sm:w-1/3 my-4 sm:my-0 pr-0 sm:pr-4">
            <img
              alt="Алтайсорбент"
              className="border mx-auto sm:mx-0"
              src="/images/altaysorbent.jpg"
              style={{
                maxHeight: '265px',
                width: 'auto',
              }}
            />
          </div>
          <div className="w-full sm:w-2/3 text-xl text-center sm:text-left">
            <div className="mb-4">
              <div className="font-semibold mb-2">
                Стоимость товара (без учета доставки)
              </div>
              <div className="font-bold text-green-700">
                <b>
                  {productPriceKzt} {CurrencySymbols.KZT} (~ {productPriceRub}{' '}
                  {CurrencySymbols.RUB})
                </b>
              </div>
            </div>
            <div className="font-semibold text-red-900">
              По техническим причинам покупка на сайте временно приостановлена!
            </div>
            <div>
              По всем вопросам, в том числе по вопросам приобритения, пишите в
              <br />
              Whatsapp{' '}
              <a className="text-green-700" href="https://wa.me/77779898998">
                +7 (777) 989-89-98
              </a>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Description />
        </div>
      </div>
    </PageLayout>
  );
};

export default BuyPage;
