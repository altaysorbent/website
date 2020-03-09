const axios = require('axios').default;


class Product {
    constructor(origin) {
        origin = origin || {};
        this.name = origin.name || '';
        this.img = origin.img || '';
        this.count = origin.count || 0;
        this.amount = origin.amount || 0;
        this.totalAmount = this.count * this.amount;
    }
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
                amount: 1000
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
}