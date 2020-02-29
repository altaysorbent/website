import React from 'react';

const BuyForm = () => {
    const title = 'Оформление заказа';
    return (
        <section className="container mx-auto px-2 pt-4 text-gray-700 text-xl text-justify">
            <div>
                <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">Товар</h3>
                <div class="md:flex md:justify-center mb-6">
                    <form class="w-full max-w-lg">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <img
                                    src="/images/new-design.png"
                                    className="mx-auto"
                                    style={{
                                        height: '200px',
                                        width: 'auto',
                                    }}
                                    alt=""
                                />
                            </div>

                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <div class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Наименование:</div>
                                <div class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Количество:</div>
                                <div class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Сумма:</div>
                            </div>

                            <p class="text-blue-800 text-xs italic">Правильно заполните все параметры для покупки товара</p>
                        </div>
                    </form>
                </div>

                <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">Покупатель</h3>
                <div class="md:flex md:justify-center mb-6">
                    <form class="w-full max-w-lg">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-customer-name">
                                    Ф.И.О. покупателя
                                </label>
                                <input class="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 
                                    leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-customer-name"  placeholder="заполните Ф.И.О." />
                                <p class="text-blue-800 text-xs italic">На данное имя будет оформлена доставка заказа по почте</p>
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-order-phone">
                                    Номер телефона
                                </label>
                                <input class="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 
                                    leading-tight focus:outline-none focus:bg-white" 
                                    id="grid-order-phone" 
                                    type="text" 
                                    placeholder="+7 (xxx) xxx-xx-xx" />
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-order-email">
                                    e-mail
                                </label>
                                <input class="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight 
                                    focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-order-email" type="text" placeholder="эл. почта" />
                            </div>
                            <div class="w-full px-3 mb-6 md:mb-0">
                                <p class="text-blue-800 text-xs italic">Контактные данные нужны для связи с покупателем в случае необходимости</p>
                            </div>
                        </div>
                    </form>
                </div>

                <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">Доставка</h3>
                <div class="md:flex md:justify-center mb-6">
                    <form class="w-full max-w-lg">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-delivery-city">
                                    Город
                                </label>
                                <input class="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 
                                    leading-tight focus:outline-none focus:bg-white" 
                                    id="grid-delivery-city" 
                                    type="text" 
                                    placeholder="Город" />
                            </div>
                            <div class="w-full md:w-1/3 px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-delivery-zip">
                                    Почтовый код
                                </label>
                                <input class="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight 
                                    focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-delivery-zip" type="text" placeholder="код" />
                            </div>
                            
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-delivery-address">
                                    Адрес получателя
                                </label>
                                <input class="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 
                                    leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-delivery-address"  placeholder="улица, дом, квартира" />
                            </div>

                            <div class="w-full px-3 mb-6 md:mb-0">
                                <p class="text-blue-800 text-xs italic">Укажите ваш полный адрес, чтобы мы могли доставить ваш товар</p>
                            </div>
                        </div>
                    </form>
                </div>

                <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">Подтверждение заказа</h3>
                <div class="md:flex md:justify-center mb-6">
                    <form class="w-full max-w-lg">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3 mb-6 md:mb-0">
                                <div class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Наименование:</div>
                                <div class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Количество:</div>
                                <div class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">ФИО покупателя:</div>
                                <div class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Тел:</div>
                                <div class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">E-Mail:</div>
                                <div class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Адрес:</div>
                                <div class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Почтовый код:</div>
                                <div class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Итоговая сумма:</div>
                            </div>
                        </div>

                        
                        <div class="w-full px-3 mb-6">
                            <p class="text-blue-800 text-xs italic">Подтвердите правильность всех парметров заказа</p>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3 mb-6 text-center">
                                <div class="w-full px-3 mb-6">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Оплатить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <div id="payment-form"></div>
        </section>
    )
};

export default BuyForm;