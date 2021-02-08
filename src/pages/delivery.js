import React from 'react';

import DeliveryCalculator from '../components/delivery/calculator';
import MaximumAmountNotice from '../components/delivery/maximumAmountNotice';
import Layout from '../components/layouts/page';
import Meta from '../components/meta';

import { CURRENCY_SYMBOLS, DELIVERY_COMPANIES, KAZPOST_DELIVERY_PRICE } from '../constants/product';

const UsagePage = () => {
  const title = 'Доставка и оплата';
  return (
    <Layout>
      <Meta title={title} />

      <h3 className="text-3xl font-bold leading-none mb-3 text-center">{title}</h3>
      <hr />
      <div className="container mx-auto px-2 pt-4 max-w-5xl text-xl">
        <div className="text-justify">
          <p className="mb-2">
            Доставка осуществляется <b>{DELIVERY_COMPANIES.KAZPOST}</b> (по Казахстану) и курьерской службой{' '}
            <b>{DELIVERY_COMPANIES.CDEK}</b> по Казахстану, России и Республике Беларусь.
          </p>
          <p className="mb-2">
            Стоимость доставки <b>{DELIVERY_COMPANIES.KAZPOST}</b> - фиксированная и составляет{' '}
            <b>
              {KAZPOST_DELIVERY_PRICE.KZT}
              {CURRENCY_SYMBOLS.KZT}
            </b>{' '}
            до почтового отделения.
          </p>
          <div className="mb-2">
            <MaximumAmountNotice />
          </div>
          <p className="mb-2">
            Возможность доставки в другие страны (через <b>{DELIVERY_COMPANIES.CDEK}</b>) можно узнать воспользовавшись
            калькулятором ниже.
          </p>
        </div>
        <div className="mt-6 border-2 border-green-700 p-6">
          <p className="mb-4">
            Для расчета стоимости доставки <b>{DELIVERY_COMPANIES.CDEK}</b> воспользуйтесь калькулятором доставки
          </p>
          <DeliveryCalculator />
        </div>
        <div className="mt-6">
          <h4 className="text-2xl font-bold mb-4">Способы оплаты</h4>
          <p>Заказ можно оплатить банковской картой онлайн через платежную систему PAYBOX</p>
          <p>К оплате принимаются карты VISA, MasterCard, American Express</p>
        </div>
      </div>
    </Layout>
  );
};

export default UsagePage;
