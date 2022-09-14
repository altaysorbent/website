import React from 'react';

import DeliveryCalculator from 'components/delivery/Calculator';
import MaximumAmountNotice from 'components/delivery/MaximumAmountNotice';
import Meta from 'components/Meta';
import Layout from 'layouts/Page';

import {
  CurrencySymbols,
  DeliveryCompanies,
  KazPostDeliveryPrice,
} from 'constants/Product';

const UsagePage = (): JSX.Element => {
  const title = 'Доставка и оплата';
  return (
    <Layout>
      <Meta title={title} />
      <h3 className="text-3xl font-bold leading-none mb-3 text-center">
        {title}
      </h3>
      <hr />
      <div className="container mx-auto px-2 pt-4 max-w-5xl text-xl">
        <div className="text-justify">
          <p className="mb-2">
            Доставка осуществляется <b>{DeliveryCompanies.KAZPOST}</b> (по
            Казахстану) и курьерской службой <b>{DeliveryCompanies.CDEK}</b> по
            Казахстану, России и Республике Беларусь.
          </p>
          <p className="mb-2">
            Стоимость доставки <b>{DeliveryCompanies.KAZPOST}</b> -
            фиксированная и составляет{' '}
            <b>
              {KazPostDeliveryPrice.KZT}
              {CurrencySymbols.KZT}
            </b>{' '}
            за каждые 32 штуки до почтового отделения.
          </p>
          <div className="mb-2">
            <MaximumAmountNotice />
          </div>
          <p className="mb-2">
            Возможность доставки в другие страны (через{' '}
            <b>{DeliveryCompanies.CDEK}</b>) можно узнать воспользовавшись
            калькулятором ниже.
          </p>
        </div>
        <div className="mt-6 border-2 border-green-700 p-6">
          <p className="mb-4">
            Для расчета стоимости доставки <b>{DeliveryCompanies.CDEK}</b>{' '}
            воспользуйтесь калькулятором доставки
          </p>
          <DeliveryCalculator />
        </div>
        <div className="mt-6">
          <h4 className="text-2xl font-bold mb-4">Способы оплаты</h4>
          <p>
            Заказ можно оплатить банковской картой онлайн через платежную
            систему PAYBOX
          </p>
          <p>К оплате принимаются карты VISA, MasterCard, МИР</p>
          <p className="text-red-900">
            Оплата картами российских банков доступна только с помощью платежной
            системы МИР
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default UsagePage;
