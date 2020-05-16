import React, { useState, useEffect } from 'react';
import BuyFormManager from './buyFormManager';
import classNames from 'classnames';
import Autocomplete from 'react-autocomplete';

const BuyForm = () => {
    const mgr = new BuyFormManager();
    const isBrowser = typeof window !== `undefined`;
    let currentUrl = '';
    let orderIdValue = '';
    let hasOrder = false;
    if (isBrowser) {
        currentUrl = new URL(typeof window !== 'undefined' ? window.location.href : '');
        orderIdValue = currentUrl.searchParams.get("m");
        const orderId = parseInt(orderIdValue);
        hasOrder = orderId > 0;
    }

    const [product, updateProduct] = useState(mgr.getDefaultProduct());
    const [customer, updateCustomer] = useState({});
    const [delivery, updateDelivery] = useState({});
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
    }

    const recalculateOrder = (cust, dlvr) => {
        order.finished =
            cust.name && cust.phone && cust.email
            && dlvr.city && dlvr.address && dlvr.zipcode
            ;
        updateOrder(mgr.clone(order))
    }

    const updateProductValue = (modifier) => {
        modifier(product);
        const pnext = mgr.changeProcuctCount(product, 0);
        updateProduct(pnext);
    }

    const updateCustomerValue = (modifier) => {
        modifier(customer);
        updateCustomer(mgr.clone(customer));

        recalculateOrder(customer, delivery);
    }

    const updateDeliveryValue = (modifier, noRecalcDelivery) => {
        modifier(delivery);

        //console.log('updateDeliveryValue', delivery)
        const cdecCity = cities.filter(itm => itm.label === delivery.cityFull)[0];
        if (cdecCity) {
            updateZipcodes(cdecCity.zipcodes.map(src => { return { uid: src, label: src } }));

            delivery.city = cdecCity.name;
            delivery.cityId = cdecCity.uid;
        }
        
        if (noRecalcDelivery) {
            updateDelivery(mgr.clone(delivery));
            recalculateOrder(customer, delivery);
            //console.log('noRecalcDelivery');
            return;
        }

        delivery.error = null;
        mgr.loadDeliveryPrice(delivery, product, rsp => {
            ///console.log('loadDeliveryPrice', rsp);
            if (rsp.error) {
                delivery.error = Array.isArray(rsp.error) ? rsp.error.map(e => e.text) : rsp.error;
                delivery.price = null;
            } else if (product.currency == 'KZT') {
                delivery.price = rsp.result.priceByCurrency;
            } else {
                delivery.price = Math.ceil( parseFloat(rsp.result.price) );
            }

            updateDelivery(mgr.clone(delivery));

            const pnext = mgr.changeDeliveryPrice(product, delivery.price);
            updateProduct(pnext);
            recalculateOrder(customer, delivery);
        })

    }

    const loadCities = (modifier) => {
        modifier(delivery);
        updateDelivery(mgr.clone(delivery));

        mgr.loadCities(delivery.cityFull, rsp => {
            updateCities(rsp.result);
        })
    }

    const createOrder = () => {
        mgr.createOrder(product, customer, delivery, async rsp => {

            const rspOrder = await rsp;
            if (rspOrder.err || !rspOrder.result) { return; }

            const nextOrder = rspOrder.result.result;
            updateOrder(nextOrder);

            const form = document.getElementById('frm-payment');
            form.submit();
        })
    }

    return (
        <section className="container mx-auto px-2 pt-4 text-gray-700 text-xl text-justify">

            {hasOrder ? (
                <div id="product-form">
                    <div className="md:flex md:justify-center mb-6">
                        <div className="w-full max-w-lg">
                            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">Покупка успешно завершена!</h3>
                        </div>
                    </div>
                </div>
            ) : (
                    <div></div>
                )}

            <div id="order-form">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">Товар</h3>
                <div className="md:flex md:justify-center mb-6">
                    <div className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <img
                                    src={product.img}
                                    className="mx-auto"
                                    style={{
                                        height: '200px',
                                        width: 'auto',
                                    }}
                                    alt=""
                                />
                            </div>

                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    <span className="mr-3">Наименование:</span>
                                    <span className="text-xl">{product.name}</span>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-2">
                                    <div className="w-full md:w-1/2 px-3 py-3 mb-6 md:mb-0">
                                        Валюта
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <div className="relative">
                                            <select
                                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                value={product.currency}
                                                onChange={e => updateProductValue(product => product.currency = e.target.value)}
                                                id="grid-state">
                                                {Object.keys(product.amounts).map(
                                                    item =>
                                                        <option key={product.amounts[item].name} value={item}>{product.amounts[item].name}</option>
                                                )
                                                }
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    <span className="mr-3">Количество:</span>
                                    <button
                                        onClick={() => changeCount(-1)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" >-</button>

                                    <span className="w-10 px-4 text-center">{product.count}</span>
                                    <button
                                        onClick={() => changeCount(1)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">+</button>
                                </div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    <span className="mr-3">Сумма:</span>

                                    <span className="text-xl text-orange-600">{product.price} {product.amounts[product.currency].short}</span>
                                </div>
                            </div>

                            <p className="text-blue-800 text-xs italic">Правильно заполните все параметры для покупки товара</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">Покупатель</h3>
                <div className="md:flex md:justify-center mb-6">
                    <div className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-customer-name">
                                    Ф.И.О. покупателя

                                    <input className="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 
                                    leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-customer-name"
                                        placeholder="заполните Ф.И.О."
                                        value={customer.name}
                                        onChange={e => updateCustomerValue(customer => customer.name = e.target.value)} />
                                </label>

                                <p className="text-blue-800 text-xs italic">На данное имя будет оформлена доставка заказа по почте</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-order-phone">
                                    Номер телефона
                                </label>
                                <input className="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 
                                    leading-tight focus:outline-none focus:bg-white"
                                    id="grid-order-phone"
                                    type="text"
                                    placeholder="+7 (xxx) xxx-xx-xx"
                                    value={customer.phone}
                                    onChange={e => updateCustomerValue(customer => customer.phone = e.target.value)} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-order-email">
                                    e-mail
                                </label>
                                <input className="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight 
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-order-email"
                                    type="text"
                                    placeholder="эл. почта"
                                    value={customer.email}
                                    onChange={e => updateCustomerValue(customer => customer.email = e.target.value)} />
                            </div>
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <p className="text-blue-800 text-xs italic">Контактные данные нужны для связи с покупателем в случае необходимости</p>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">Доставка</h3>
                <div className="md:flex md:justify-center mb-6">
                    <div className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-delivery-city">
                                    Город
                                </label>

                                <Autocomplete
                                    inputProps={
                                        {
                                            className: `
                                                appearance-none block w-full bg-gray-200 text-gray-700 
                                                border border-gray-500 rounded py-3 px-4 
                                                leading-tight focus:outline-none focus:bg-white`,
                                            type: 'text',
                                            placeholder: 'Город'
                                        }
                                    }
                                    wrapperStyle={{ display: 'block'} }
                                    items={ cities }
                                    getItemValue={(item) => item.label}
                                    renderItem={(item, isHighlighted) =>
                                        <div key={ item.uid } style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                            {item.label}
                                        </div>
                                    }
                                    value={delivery.cityFull}
                                    onChange={e => loadCities(customer => delivery.cityFull = e.target.value)}
                                    onSelect={(val) => updateDeliveryValue(customer => delivery.cityFull = val)}
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-delivery-zip">
                                    Почтовый код
                                </label>

                                <Autocomplete
                                    inputProps={
                                        {
                                            className: `
                                                appearance-none block w-full bg-gray-200 text-gray-700 
                                                border border-gray-200 rounded py-3 px-4 leading-tight 
                                                focus:outline-none focus:bg-white focus:border-gray-500`,
                                            type: 'text',
                                            placeholder: 'код'
                                        }
                                    }
                                    wrapperStyle={{ display: 'block' }}
                                    items={ zipcodes }
                                    getItemValue={(item) => item.label}
                                    renderItem={(item, isHighlighted) =>
                                        <div key={item.uid} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                            {item.label}
                                        </div>
                                    }
                                    value={delivery.zipcode}
                                    onChange={e => { }}
                                    onSelect={(val) => updateDeliveryValue(customer => delivery.zipcode = val)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-delivery-address">
                                    Адрес получателя
                                </label>
                                <input className="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 
                                    leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-delivery-address"
                                    placeholder="улица, дом, квартира"
                                    value={delivery.address}
                                    onChange={e => updateDeliveryValue(customer => delivery.address = e.target.value, true)} />
                            </div>

                            <div className="w-full px-3 mb-6 md:mb-0">
                                <p className="text-blue-800 text-xs italic">Укажите ваш полный адрес, чтобы мы могли доставить ваш товар</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6 text-red-600">
                            {delivery.error}
                        </div>
                    </div>
                </div>

                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">Подтверждение заказа</h3>
                <div className="md:flex md:justify-center mb-6">
                    <div className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Наименование:
                                    <i className="not-italic float-right text-green-700 text-base">{product.name}</i>
                                </div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Количество:
                                    <i className="not-italic float-right text-green-700 text-base">{product.count}</i>
                                </div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    ФИО покупателя:
                                    <i className="not-italic float-right text-green-700 text-base">{customer.name}</i>
                                </div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Телефон:
                                    <i className="not-italic float-right text-green-700 text-base">{customer.phone}</i>
                                </div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    E-Mail:
                                    <i className="not-italic float-right text-green-700 text-base">{customer.email}</i>
                                </div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Адрес:
                                    <i className="not-italic float-right text-green-700">{delivery.city} {delivery.address}</i>
                                </div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Почтовый код:
                                    <i className="not-italic float-right text-green-700 text-base">{delivery.zipcode}</i>
                                </div>

                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Цена товара:
                                    <i className="not-italic float-right text-red-700 text-base">{product.price} {product.currency}</i>
                                </div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Стоимость доставки товара:
                                    <i className="not-italic float-right text-red-700 text-base">{product.deliveryPrice} {product.currency}</i>
                                </div>
                                
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Итоговая сумма:
                                    <i className="not-italic float-right text-blue-700 text-lg">{product.totalAmount} {product.currency}</i>
                                </div>
                            </div>
                        </div>


                        <div className="w-full px-3 mb-6">
                            <p className="text-blue-800 text-xs italic">Подтвердите правильность всех парметров заказа</p>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 text-center">
                                <div className="w-full px-3 mb-6">
                                    <button
                                        onClick={createOrder}
                                        className={classNames({
                                            'text-white font-bold py-2 px-4 rounded': true,
                                            'bg-gray-500 hover:bg-blue-gray cursor-not-allowed': !order.finished,
                                            'bg-blue-500 hover:bg-blue-700': order.finished,
                                        })}>
                                        Оплатить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form id="frm-payment" method="POST" action="https://api.paybox.money/payment.php">
                    <input type="text" name="pg_merchant_id" value={order.pg_merchant_id} />
                    <input type="text" name="pg_order_id" value={order.pg_order_id} />
                    <input type="text" name="pg_amount" value={order.pg_amount} />
                    <input type="text" name="pg_currency" value={order.pg_currency} />
                    <input type="text" name="pg_lifetime" value={order.pg_lifetime} />
                    <input type="text" name="pg_description" value={order.pg_description} />
                    <input type="text" name="pg_testing_mode" value={order.pg_testing_mode} />
                    <input type="text" name="pg_success_url" value={order.pg_success_url} />
                    <input type="text" name="pg_salt" value={order.pg_salt} />
                    <input type="text" name="pg_sig" value={order.pg_sig} />

                    <input type="text" name="pg_user_phone" value={order.pg_user_phone} />
                    <input type="text" name="pg_user_contact_email" value={order.pg_user_contact_email} />
                    <input type="text" name="pg_request_method" value={order.pg_request_method} />
                </form>
            </div>
        </section>
    )
};

export default BuyForm;