import axios, { AxiosResponse } from 'axios';

import { ICustomer } from 'interfaces/Customer.interface';
import { IDelivery } from 'interfaces/Delivery.interface';
import { IProduct } from 'interfaces/Product.interface';

const ALTAY_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const altayApi = axios.create({
  baseURL: ALTAY_BASE_URL,
});

interface IDeliveryPrice {
  senderCityId: string;
  receiverCityId: number;
  quantity: number;
  tariffId: string;
  deliveryCompany: string;
}

const getDeliveryPrice = ({
  senderCityId,
  receiverCityId,
  quantity,
  tariffId,
  deliveryCompany,
}: IDeliveryPrice): Promise<void | AxiosResponse> => {
  const params = new URLSearchParams();
  params.append('senderCityId', senderCityId);
  params.append('receiverCityId', `${receiverCityId}`);
  params.append('tariffId', tariffId);
  params.append('quantity', `${quantity}`);
  params.append('deliveryCompany', deliveryCompany);

  return altayApi
    .get(`/delivery/calculate?${params.toString()}`)
    .catch((err) => {
      console.log('Error during getting delivery price', err);
    });
};

const createOrder = (
  customer: ICustomer,
  delivery: IDelivery,
  product: IProduct
): Promise<void | AxiosResponse> => {
  return altayApi.post('/orders/create', {
    customer,
    delivery,
    product,
  });
};

export { getDeliveryPrice, createOrder };
