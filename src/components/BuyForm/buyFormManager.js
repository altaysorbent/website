const axios = require('axios').default;

export default class BuyFormManager {
    constructor(product, customer, delivery) {
        this.product = product;
        this.customer = customer;
        this.delivery = delivery;
    }

    loadProduct() {
        // TODO: забирать параметры товара с сервера
        

        this.changeCount(10);
    }

    changeCount(value) {
        
        this.product.count += value;
        this.product.totalAmount = this.product.count * this.product.amount;

        console.log('changeCount', value, this);
    }

    decCount() {
        this.changeCount(-1);
    }

    createOrder() {
        //axios.post('/api/yakassa/token', rsp => {

        //})
        alert('createOrder');
    }
}