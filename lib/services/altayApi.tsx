import axios, { AxiosResponse } from 'axios';

import { ICustomer } from '@/lib/interfaces/Customer.interface';
import { IDelivery } from '@/lib/interfaces/Delivery.interface';
import { IProduct } from '@/lib/interfaces/Product.interface';

const altayApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createOrder = (
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

export function getCities(countryCode: string) {
  return altayApi.get(`/delivery/cities?country=${countryCode}`);
}

export function getCityPostCodes(cityCode: string) {
  return altayApi.get(`/delivery/postcodes?code=${cityCode}`);
}

type CalculateDeliveryPriceArgs = {
  senderCityId: number;
  receiverCityId: string;
  quantity: number;
  tariffId: number;
  deliveryCompany: string;
  zip: string | number;
  address?: string;
};

export function calculateDeliveryPrice({
  senderCityId,
  receiverCityId,
  quantity,
  tariffId,
  deliveryCompany,
  zip,
  address,
}: CalculateDeliveryPriceArgs) {
  const data: CalculateDeliveryPriceArgs = {
    senderCityId,
    receiverCityId,
    quantity,
    tariffId,
    deliveryCompany,
    zip,
  };
  if (address) {
    data.address = address;
  }
  return altayApi.post(`/delivery/calculate`, data);
}
