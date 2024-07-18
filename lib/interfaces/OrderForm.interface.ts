import { ICustomer } from './Customer.interface';
import { ICDEKCityItem } from './CdekCityItem.interface';
import { CountryIds, ICountryIds } from '@/lib/constants/Product';

export interface IOrderForm extends ICustomer {
  city: object | null; // @todo update type
  deliveryCompany: string;
  zip: string | null;
  address: string;
  count: number;
  country: keyof ICountryIds;

  deliveryType: number;
  senderCityId: number;

  deliveryError?: string;

  promoCode: string | null;
}
