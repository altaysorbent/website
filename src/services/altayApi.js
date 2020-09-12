import axios from 'axios';

const ALTAY_BASE_URL = process.env.GATSBY_API_URL;

const altayApi = axios.create({
  baseURL: ALTAY_BASE_URL,
});

const getDeliveryPrice = ({ destCityId, quantity, currency, tariff }) => {
  return altayApi
    .post('cdek/calculate_price', {
      destCityId,
      quantity,
      currency,
      tariff,
    })
    .catch(err => {
      console.log('Error during getting delivery price', err);
    });
};

const createOrder = (customer, delivery, product) => {
  return altayApi
    .post('paybox/init', {
      customer,
      delivery,
      product,
    })
    .catch(err => {
      console.log('Error during order creation', err);
    });
};

export { altayApi, getDeliveryPrice, createOrder };
