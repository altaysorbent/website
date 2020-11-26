import React from 'react';
import Layout from '../components/layouts/page';
import Meta from '../components/meta';
import { maximumAvailableCount } from '../constants/product';
import DeliveryCalculator from '../components/delivery/calculator';

const UsagePage = () => {
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
            Доставка осуществляется курьерской службой CDEK по Казахстану,
            России и Республике Беларусь.
          </p>
          <p className="mb-2">
            Возможность доставки в другие страны можно узнать воспользовавшись
            калькулятором ниже.
          </p>
          <p className="mb-2">
            Максимальное количество упаковок для заказа составляет{' '}
            {maximumAvailableCount}, в случае если Вас интересует большее
            количество, свяжитесь с отделом продаж по телефону в шапке сайта.
          </p>
        </div>
        <div className="mt-6 border-2 border-green-700 p-6">
          <p className="mb-4">
            Для расчета стоимости доставки воспользуйтесь калькулятором доставки
          </p>
          <DeliveryCalculator />
        </div>
        <div className="mt-6">
          <h4 className="text-2xl font-bold">Оплата</h4>
          <p>Для оплаты заказа у нас подключена система платежей PAYBOX</p>
          <p>К оплате принимаются карты VISA, MasterCard, American Express</p>
        </div>
      </div>
    </Layout>
  );
};

export default UsagePage;
