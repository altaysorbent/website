import axios from 'axios';

const ALTAY_BASE_URL = process.env.GATSBY_API_URL;

const altayApi = axios.create({
  baseURL: ALTAY_BASE_URL,
});

const getDeliveryPrice = ({ senderCityId, receiverCityId, quantity, tariffId }) => {
  const params = new URLSearchParams();
  params.append('senderCityId', senderCityId);
  params.append('receiverCityId', receiverCityId);
  params.append('tariffId', tariffId);
  params.append('quantity', quantity);

  return altayApi.get(`delivery/calculate?${params.toString()}`).catch(err => {
    console.log('Error during getting delivery price', err);
  });
};

const createOrder = (customer, delivery, product) => {
  return altayApi.post('orders/create', {
    customer,
    delivery,
    product,
  });
};

export { altayApi, getDeliveryPrice, createOrder };
