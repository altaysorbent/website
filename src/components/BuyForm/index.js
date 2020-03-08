import React, { useState } from 'react';
import { func } from 'prop-types';

const BuyForm = () => {

    const [product, updateProduct] = useState({
        empty: true,
        name: '',
        img: '',
        count: 0,
        amount: 0,
        totalAmount: 0
    });

    const changeCount = dlt => {
        var nextCount = product.count + dlt;
        if (nextCount < 1) { return; }
        const pnext = {
            name: product.name,
            img: product.img,
            count: nextCount,
            amount: product.amount,
            totalAmount: product.amount * nextCount
        };
        updateProduct(pnext);
    }

    const init = () => {
        if (!product.empty) { return; }
        const pnext = {
            empty: false,
            name: 'Алтайсорбент',
            img: '/images/new-design.png',
            count: 1,
            amount: 750,
            totalAmount: 750 * 1
        };
        updateProduct(pnext);
    }

    init();

    return (
        <section className="container mx-auto px-2 pt-4 text-gray-700 text-xl text-justify">
            <div>
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
                                    id="grid-customer-name"  placeholder="заполните Ф.И.О." />
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
                                    placeholder="+7 (xxx) xxx-xx-xx" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-order-email">
                                    e-mail
                                </label>
                                <input className="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight 
                                    focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-order-email" type="text" placeholder="эл. почта" />
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
                                    placeholder="Город" />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-delivery-zip">
                                    Почтовый код
                                </label>
                                <input className="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight 
                                    focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-delivery-zip" type="text" placeholder="код" />
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
                                    id="grid-delivery-address"  placeholder="улица, дом, квартира" />
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
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Наименование:</div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Количество:</div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">ФИО покупателя:</div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Тел:</div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">E-Mail:</div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Адрес:</div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Почтовый код:</div>
                                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Итоговая сумма:</div>
                            </div>
                        </div>

                        
                        <div className="w-full px-3 mb-6">
                            <p className="text-blue-800 text-xs italic">Подтвердите правильность всех парметров заказа</p>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 text-center">
                                <div className="w-full px-3 mb-6">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Оплатить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="payment-form"></div>
        </section>
    )
};

export default BuyForm;