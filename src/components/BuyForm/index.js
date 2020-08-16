import React, { useState, useEffect } from 'react';
import BuyFormManager from './buyFormManager';
import classNames from 'classnames';
import Autocomplete from 'react-autocomplete';
import InputMask from 'react-input-mask';
import Description from '../description';

const BuyForm = () => {
  const mgr = new BuyFormManager();
  const isBrowser = typeof window !== `undefined`;
  let currentUrl = '';
  let orderIdValue = '';
  let hasOrder = false;
  if (isBrowser) {
    currentUrl = new URL(
      typeof window !== 'undefined' ? window.location.href : ''
    );
    orderIdValue = currentUrl.searchParams.get('m');
    const orderId = parseInt(orderIdValue);
    hasOrder = orderId > 0;
  }

  const [product, updateProduct] = useState(mgr.getDefaultProduct());
  const [customer, updateCustomer] = useState({});
  const [delivery, updateDelivery] = useState({ tariffId: 137 });
  const [order, updateOrder] = useState({ finished: false });
  const [cities, updateCities] = useState([]);
  const [zipcodes, updateZipcodes] = useState([]);

  useEffect(() => {
    mgr.loadProduct(rsp => {
      const product = rsp.result;
      const pnext = mgr.changeProcuctCount(product, 0);
      updateProduct(pnext);
    });
  }, []);

  const changeCount = dlt => {
    const pnext = mgr.changeProcuctCount(product, dlt);
    updateProduct(pnext);
  };

  const decreaseCount = () => changeCount(-1);
  const increaseCount = () => changeCount(1);

  const recalculateOrder = (cust, dlvr) => {
    order.finished =
      cust.name &&
      cust.phone &&
      cust.email &&
      dlvr.city &&
      dlvr.address &&
      dlvr.zipcode;
    updateOrder(mgr.clone(order));
  };

  const updateProductValue = modifier => {
    modifier(product);
    const pnext = mgr.changeProcuctCount(product, 0);
    updateProduct(pnext);
  };

  const updateProductWithRecalcDelivery = modifier => {
    updateProductValue(modifier);
    execLoadDeliveryPrice();
  };

  const updateCustomerValue = modifier => {
    modifier(customer);
    updateCustomer(mgr.clone(customer));

    recalculateOrder(customer, delivery);
  };

  const execLoadDeliveryPrice = () => {
    delivery.error = null;
    mgr.loadDeliveryPrice(delivery, product, rsp => {
      ///console.log('loadDeliveryPrice', rsp);
      if (rsp.error) {
        delivery.error = Array.isArray(rsp.error)
          ? rsp.error.map(e => e.text)
          : rsp.error;
        delivery.price = null;
      } else if (product.currency == 'KZT') {
        delivery.price = rsp.result.priceByCurrency;
      } else {
        delivery.price = Math.ceil(parseFloat(rsp.result.price));
      }

      updateDelivery(mgr.clone(delivery));

      const pnext = mgr.changeDeliveryPrice(product, delivery.price);
      updateProduct(pnext);
      recalculateOrder(customer, delivery);
    });
  };

  const updateDeliveryValue = (modifier, noRecalcDelivery) => {
    modifier(delivery);

    //console.log('updateDeliveryValue', delivery)
    const cdecCity = cities.filter(itm => itm.label === delivery.cityFull)[0];
    if (cdecCity) {
      updateZipcodes(
        cdecCity.zipcodes.map(src => {
          return { uid: src, label: src };
        })
      );

      delivery.city = cdecCity.name;
      delivery.cityId = cdecCity.uid;
    }

    if (noRecalcDelivery) {
      updateDelivery(mgr.clone(delivery));
      recalculateOrder(customer, delivery);
      //console.log('noRecalcDelivery');
      return;
    }

    execLoadDeliveryPrice();
  };

  const loadCities = modifier => {
    modifier(delivery);
    updateDelivery(mgr.clone(delivery));

    mgr.loadCities(delivery.cityFull, rsp => {
      updateCities(rsp.result);
    });
  };

  const createOrder = () => {
    if (!order.finished) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    mgr.createOrder(product, customer, delivery, async rsp => {
      const rspOrder = await rsp;
      if (rspOrder.err || !rspOrder.result) {
        return;
      }

      const nextOrder = rspOrder.result.result;
      updateOrder(nextOrder);

      const form = document.getElementById('frm-payment');
      form.submit();
    });
  };

  return (
    <section className="container mx-auto px-2 pt-4 text-gray-700 text-xl">
      {hasOrder && (
        <div id="product-form">
          <div className="md:flex md:justify-center mb-6">
            <div className="w-full max-w-lg">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">
                Покупка успешно завершена!
              </h3>
            </div>
          </div>
        </div>
      )}

      <div class="max-w-sm w-full lg:max-w-full lg:flex">
        <div
          class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          title="Woman holding a mug"
        >
          <h3> {product.name} 1г №20</h3>
          <img src="https://altaysorbent.org/images/new-design.png"></img>
          <p className="buyDescription">
            {' '}
            <b>ТОО "Арника"</b>
            <br></br>
            Срок хранения: 3 года
          </p>
        </div>
        <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="mb-8">
            <p class="text-sm text-gray-900 flex items-center"></p>

            <Description></Description>
          </div>
          <hr></hr>
          <div class="flex flex-wrap">
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 ">
              Валюта:
              <select
                className="appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 currencysize"
                value={product.currency}
                onChange={e =>
                  updateProductWithRecalcDelivery(
                    product => (product.currency = e.target.value)
                  )
                }
                id="grid-state"
              >
                {Object.keys(product.amounts).map(item => (
                  <option key={product.amounts[item].name} value={item}>
                    {product.amounts[item].name}
                  </option>
                ))}
              </select>
            </div>
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4  justify-center">
              Количество<br></br>
              <button
                onClick={decreaseCount}
                className="focus:outline-none leading-none bg-green-600 hover:bg-green-700 text-white font-bold  py-1 px-2 rounded"
              >
                &minus;
              </button>
              <span className="w-10 px-4 text-center">{product.count}</span>
              <button
                onClick={increaseCount}
                className="focus:outline-none leading-none bg-green-600 hover:bg-green-700 text-white font-bold  py-1 px-2 rounded"
              >
                +
              </button>
            </div>
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 ">
              Сумма<br></br>
              {product.price} {product.amounts[product.currency].short}
            </div>

            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-3/6 mb-4 ">
              Мы принимаем платежи с карт:
              <img src="https://i.ibb.co/8DpSfNH/cards.png" width="300px"></img>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/2 mb-4">
          <div className="note">
            <h3 className="text-1xl text-gray-800 font-bold leading-none mb-4">
              1. Покупатель
            </h3>
            <div className="md:flex md:justify-center mb-6">
              <div className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 mb-2"
                      htmlFor="grid-customer-name"
                    >
                      Ф.И.О.
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-customer-name"
                        placeholder="Например: Иванов Иван Иванович"
                        value={customer.name}
                        onChange={e =>
                          updateCustomerValue(
                            customer => (customer.name = e.target.value)
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                    <label
                      className="block text-gray-800"
                      htmlFor="grid-order-phone"
                    >
                      Номер телефона
                    </label>

                    <InputMask
                      mask="+99999999999"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-order-phone"
                      type="text"
                      placeholder="Номер Вашего телефона"
                      value={customer.phone}
                      onChange={e =>
                        updateCustomerValue(
                          customer => (customer.phone = e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="w-full md:w-1/1 px-3">
                    <label
                      className="block text-gray-800"
                      htmlFor="grid-order-email"
                    >
                      E-mail
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-order-email"
                      type="email"
                      pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
                      placeholder="E-mail"
                      value={customer.email}
                      onChange={e =>
                        updateCustomerValue(
                          customer => (customer.email = e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="w-full px-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/2 mb-4">
          <div className="note">
            <h3 className="text-1xl text-gray-800 font-bold leading-none mb-4">
              2. Доставка
            </h3>

            <div className="md:flex md:justify-center mb-6">
              <div className="w-full max-w-lg">
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block text-gray-800"
                      htmlFor="grid-delivery-city"
                    >
                      Город
                    </label>

                    <Autocomplete
                      inputProps={{
                        className:
                          'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white',
                        type: 'text',
                        placeholder: 'Город',
                      }}
                      wrapperStyle={{ display: 'block' }}
                      items={cities}
                      getItemValue={item => item.label}
                      renderItem={(item, isHighlighted) => (
                        <div
                          key={item.uid}
                          style={{
                            background: isHighlighted ? 'lightgray' : 'white',
                          }}
                        >
                          {item.label}
                        </div>
                      )}
                      value={delivery.cityFull}
                      onChange={e =>
                        loadCities(
                          customer => (delivery.cityFull = e.target.value)
                        )
                      }
                      onSelect={val =>
                        updateDeliveryValue(
                          customer => (delivery.cityFull = val)
                        )
                      }
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3">
                    <label
                      className="block text-gray-800"
                      htmlFor="grid-delivery-zip"
                    >
                      Почтовый код
                    </label>

                    <Autocomplete
                      inputProps={{
                        className:
                          'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
                        type: 'text',
                        placeholder: 'Индекс',
                      }}
                      wrapperStyle={{ display: 'block' }}
                      items={zipcodes}
                      getItemValue={item => item.label}
                      renderItem={(item, isHighlighted) => (
                        <div
                          key={item.uid}
                          style={{
                            background: isHighlighted ? 'lightgray' : 'white',
                          }}
                        >
                          {item.label}
                        </div>
                      )}
                      value={delivery.zipcode}
                      onChange={e => {}}
                      onSelect={val =>
                        updateDeliveryValue(
                          customer => (delivery.zipcode = val)
                        )
                      }
                    />
                  </div>
                </div>
                <div className="w-full px-3"></div>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800"
                      htmlFor="grid-delivery-address"
                    >
                      Адрес получателя
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-delivery-address"
                      placeholder="Улица, дом, квартира"
                      value={delivery.address}
                      onChange={e =>
                        updateDeliveryValue(
                          customer => (delivery.address = e.target.value),
                          true
                        )
                      }
                    />
                  </div>

                  <div className="w-full px-3 mb-6 md:mb-0"></div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 mb-2"
                      htmlFor="grid-delivery-city"
                    >
                      Способ доставки
                    </label>

                    <div>
                      <label>
                        <input
                          id="grid-delivery-type-10"
                          className="py-3 px-4 mb-3 mr-5 text-green-500"
                          type="radio"
                          name="deliveryType"
                          placeholder="доставка до квартиры"
                          checked={delivery.tariffId === 137}
                          value={delivery.tariffId}
                          onChange={e =>
                            updateDeliveryValue(
                              customer => (delivery.tariffId = 137)
                            )
                          }
                        />
                        <span
                          className={classNames({
                            'text-green-700': delivery.tariffId === 137,
                          })}
                        >
                          доставка до квартиры
                        </span>
                      </label>
                    </div>

                    <div>
                      <label>
                        <input
                          id="grid-delivery-type-11"
                          className="py-3 px-4 mb-3 mr-5"
                          type="radio"
                          name="deliveryType"
                          placeholder="заберу со склада"
                          checked={delivery.tariffId === 136}
                          value={delivery.tariffId}
                          onChange={e =>
                            updateDeliveryValue(
                              customer => (delivery.tariffId = 136)
                            )
                          }
                        />
                        <span
                          className={classNames({
                            'text-green-700': delivery.tariffId === 136,
                          })}
                        >
                          заберу со склада
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {delivery?.error && (
                  <div className="block mb-6 text-red-600">
                    {delivery.error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-full sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1 mb-12">
          <div className="note">
            <h3 className="text-1xl text-gray-800 font-bold leading-none mb-6 text-center">
              Подтвердите информацию
            </h3>

            <div className="w-full max-w-lg mx-auto text-white-800">
              <div className="flex">
                <div className="w-1/2">Получатель:</div>
                <div className="text-grey-300">
                  <b>
                    {customer.name}
                    <br></br> {customer.phone}
                    <br></br> {customer.email}
                  </b>
                </div>
              </div>

              <hr></hr>
              <div className="flex">
                <div className="w-1/2">Товар:</div>
                <div className="text-black-600">{product.name}</div>
              </div>
              <hr></hr>
              <div className="flex">
                <div className="w-1/2">Количество:</div>
                <div className="text-black-600">x{product.count}</div>
              </div>

              <hr></hr>
              <div className="flex">
                <div className="w-1/2">Стоимость товара:</div>
                <div className="text-black-600">
                  {product.price} {product.currency}
                </div>
              </div>
              <hr></hr>
              <div className="flex">
                <div className="w-1/2">
                  Доставка до г.{delivery.city}, {delivery.zipcode}:
                </div>
                <div className="text-black-600">
                  {product.deliveryPrice} {product.currency}
                </div>
              </div>
              <hr></hr>
              <div className="flex">
                <div className="w-1/2">Всего к оплате:</div>
                <div className="text-black-600">
                  {product.totalAmount} {product.currency}
                </div>
              </div>

              <div className="flex">
                <div className="receipttext">
                  <br></br>

                  <div
                    class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                    role=""
                  >
                    <div class="flex">
                      <div class="py-1">
                        <svg
                          class="fill-current h-6 w-6 text-teal-500 mr-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="">
                          {' '}
                          Нажимая кнопку "Оплатить", Вы соглашаетесь с{' '}
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="/files/privacy-policy.pdf"
                          >
                            <u>Политикой конфиденциальности</u>
                          </a>{' '}
                          и условиями{' '}
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="/files/public-offer-agreement.pdf"
                          >
                            <u>Публичного договора</u>
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <button
                onClick={createOrder}
                className={classNames({
                  'text-white font-bold py-2 px-4 rounded ': true,
                  'bg-gray-500 hover:bg-blue-gray cursor-not-allowed': !order.finished,
                  'bg-green-600 hover:bg-green-700': order.finished,
                })}
                disabled={!order.finished}
              >
                Оплатить
              </button>
              <p className="text-yellow-900 text-sm">
                * Сумма оплачивается в валюте KZT (Казахстанский тенге).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="order-form">
        <form
          id="frm-payment"
          method="POST"
          action="https://api.paybox.money/payment.php"
        >
          <input
            type="hidden"
            name="pg_merchant_id"
            value={order.pg_merchant_id}
          />
          <input type="hidden" name="pg_order_id" value={order.pg_order_id} />
          <input type="hidden" name="pg_amount" value={order.pg_amount} />
          <input type="hidden" name="pg_currency" value={order.pg_currency} />
          <input type="hidden" name="pg_lifetime" value={order.pg_lifetime} />
          <input
            type="hidden"
            name="pg_description"
            value={order.pg_description}
          />
          <input
            type="hidden"
            name="pg_testing_mode"
            value={order.pg_testing_mode}
          />
          <input
            type="hidden"
            name="pg_success_url"
            value={order.pg_success_url}
          />
          <input type="hidden" name="pg_salt" value={order.pg_salt} />
          <input type="hidden" name="pg_sig" value={order.pg_sig} />

          <input
            type="hidden"
            name="pg_user_phone"
            value={order.pg_user_phone}
          />
          <input
            type="hidden"
            name="pg_user_contact_email"
            value={order.pg_user_contact_email}
          />
          <input
            type="hidden"
            name="pg_request_method"
            value={order.pg_request_method}
          />
        </form>
      </div>
    </section>
  );
};

export default BuyForm;
