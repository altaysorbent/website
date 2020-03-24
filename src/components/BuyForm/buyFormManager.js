const axios = require('axios').default;

class Product {
    constructor(origin) {
        origin = origin || {};
        this.name = origin.name || '';
        this.img = origin.img || '';
        this.count = origin.count || 0;
        this.currency = origin.currency || 'KZT';
        this.descr = origin.descr || 'Заказ';
        this.uid = origin.uid || '';
        this.amounts = origin.amounts || {
            'KZT': { name: 'KZT', short: 'тг.', price: 0 },
        };

        this.amount = this.amounts[this.currency].price;
        this.totalAmount = this.count * this.amount;
    }
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export default class BuyFormManager {
    constructor() {
    }

    getDefaultProduct() {
        return new Product();
    }

    loadProduct(callback) {
        const rsp = {
            result: new Product({
                name: 'Алтайсорбент',
                img: '/images/new-design.png',
                count: 1,
                amounts: {
                    'KZT': { name: 'KZT', short: 'тг.', price: 600 },
                    'RUB': { name: 'RUB', short: 'руб.', price: 100 },
                },
                currency: 'KZT',
                amount: 0,
                descr: 'Заказ Алтайсорбент',
                uid: uuidv4()
            })
        };

        callback(rsp);
    }

    changeProcuctCount(produt, dlt) {
        produt.count += dlt;
        produt.count = Math.max(1, produt.count);
        const rslt = new Product(produt);
        return rslt;
    }

    clone(origin) {
        const rslt = JSON.parse(JSON.stringify(origin));
        return rslt;
    }

    createOrder(product, customer, delivery, callback) {
        const rq = { product, customer, delivery };
        axios.post('/api/paybox/init', rq)
            .then(rsp => {
                callback({
                    result: rsp.data
                })
            }).catch(err => {
                callback({
                    error: err
                })
            });
    }
}