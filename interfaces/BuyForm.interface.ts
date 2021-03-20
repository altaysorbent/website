import { ICustomer } from './Customer.interface';
import { ICDEKCityItem } from './CdekCityItem.interface';

export interface IBuyForm extends ICustomer {
  city: ICDEKCityItem | string;
  deliveryCompany: string;
  zip: string;
  address: string;
  count: number;

  deliveryType: string;
  senderCityId: string;

  deliveryError?: string;
}
