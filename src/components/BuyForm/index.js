import React, { useState, useEffect } from 'react';
import BuyFormManager from './BuyFormManager';

const BuyForm = () => {
    const mgr = new BuyFormManager();

    const [product, updateProduct] = useState(mgr.getDefaultProduct());
    const [customer, updateCustomer] = useState({});
    const [delivery, updateDelivery] = useState({});
    const [order, updateOrder] = useState({});

    useEffect(() => {
        mgr.loadProduct(rsp => {
            const product = rsp.result;
            updateProduct(product);
        });
    }, []);

    const changeCount = dlt => {
        const pnext = mgr.changeProcuctCount(product, dlt);
        updateProduct(pnext);
    }

    const updateCustomerValue = (modifier) => {
        modifier(customer);
        updateCustomer(mgr.clone(customer));
    }

    const updateDeliveryValue = (modifier) => {
        modifier(delivery);
        updateDelivery(mgr.clone(delivery));
    }

    const createOrder = () => {
        mgr.createOrder(product, customer, delivery, rsp => {
            const nextOrder = rsp.result;
            updateOrder(nextOrder);
        })
    }

    return (
        <section className="container mx-auto px-2 pt-4 text-gray-700 text-xl text-justify">
            <div id="order-form">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">Товар</h3>
                <div className="md:flex md:justify-center mb-6">
                    <div className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <img
                                    src={ product.img }
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
                                    
                                    <span className="text-xl text-orange-600">{product.totalAmount} тг.</span>
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
                                    onChange={e => updateCustomerValue(customer => customer.phone = e.target.value)}/>
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
                                    onChange={e => updateCustomerValue(customer => customer.email = e.target.value)}/>
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
                                <input className="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 
                                    leading-tight focus:outline-none focus:bg-white" 
                                    id="grid-delivery-city" 
                                    type="text" 
                                    placeholder="Город"
                                    value={delivery.city}
                                    onChange={e => updateDeliveryValue(customer => delivery.city = e.target.value)} />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-delivery-zip">
                                    Почтовый код
                                </label>
                                <input className="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight 
                                    focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-delivery-zip"
                                    type="text"
                                    placeholder="код"
                                    value={delivery.zipcode}
                                    onChange={e => updateDeliveryValue(customer => delivery.zipcode = e.target.value)} />
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
                                    onChange={e => updateDeliveryValue(customer => delivery.address = e.target.value)} />
                            </div>

                            <div className="w-full px-3 mb-6 md:mb-0">
                                <p className="text-blue-800 text-xs italic">Укажите ваш полный адрес, чтобы мы могли доставить ваш товар</p>
                            </div>
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
                                    Итоговая сумма:
                                    <i className="not-italic float-right text-blue-700 text-lg">{product.totalAmount} тг</i>
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
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Оплатить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="payment-form">

            </div>
        </section>
    )
};

export default BuyForm;