const axios = require('axios').default;

export default class BuyFormManager {
    constructor(product, customer, delivery) {
        this.product = product;
        this.customer = customer;
        this.delivery = delivery;
    }

    loadProduct() {
        // TODO: забирать параметры товара с сервера
        this.product.name= 'Алтайсорбент';
        this.product.img= '/images/new-design.png';
        this.product.count= 0;
        this.product.amount = 750;

        this.changeCount(10);
    }

    changeCount(value) {
        
        this.product.count += value;
        this.product.totalAmount = this.product.count * this.product.amount;

        console.log('changeCount', value, this);
    }

    createOrder() {
        axios.post('/api/yakassa/token', rsp => {

        })
    }
}