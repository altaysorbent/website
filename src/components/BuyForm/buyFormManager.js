const axiosClass = require('axios');
const axios = axiosClass.default;
axios.defaults.baseURL = 'https://next.api.altaysorbent.org/';
let jsonpAdapter = require('axios-jsonp');

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
        this.deliveryPrice = origin.deliveryPrice || 0;

        this.amount = this.amounts[this.currency].price;
        this.price = this.count * this.amount;

        const succ = !isNaN(this.price) && !isNaN(this.deliveryPrice);
        this.totalAmount = succ ? this.price + this.deliveryPrice : null;
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

    changeDeliveryPrice(produt, deliveryPrice) {
        produt.deliveryPrice = parseInt(deliveryPrice);

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

    loadCities(searchStr, callback) {
        if (searchStr.length < 4) { return; }

        axiosClass({
            url: 'http://api.cdek.ru/city/getListByTerm/jsonp.php?q=' + searchStr,
            adapter: jsonpAdapter,
            callbackParamName: 'callback'
        }).then(rsp => {
            const geonames = rsp.data.geonames;
            if (!geonames) { return }
            var rslt = geonames.map(itm => {
                return {
                    uid: itm.id,
                    name: itm.cityName,
                    region: itm.regionName,
                    label: itm.name,
                    zipcodes: itm.postCodeArray
                }
            });

            callback({
                result: rslt
            })
        })
    }

    loadDeliveryPrice(delivery, product, callback) {
        //console.log('loadDeliveryPrice', delivery, product);
        const rq = {
            destCityId: delivery.cityId,
            quantity: product.count,
            currency: product.currency
        };

        axios.post('/api/cdek/calculate_price', rq)
            .then(rsp => {
                callback(rsp.data.result)
            }).catch(err => {
                callback({
                    error: err
                })
            });
    }
}