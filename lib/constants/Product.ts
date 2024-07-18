export const productName = 'Алтайсорбент 1г/20 шт. x 16';
export const minimumAvailableCount = 1;
export const maximumAvailableCount = 14;
export const productPriceKzt = 14400;
export const productPriceRub = 2550;
export const currencyCode = 'KZT';
export const defaultProductId = 20;

interface IDeliveryTypes {
  WAREHOUSE: number;
  DELIVERY: number;
}

interface IDeliveryCompanies {
  CDEK: string;
  KAZPOST: string;
}

interface IKazPostDeliveryPrice {
  RUB: number;
  KZT: number;
}

interface ISenderCityIds {
  SPB: number;
  UKG: number;
}

interface ICurrencySymbols {
  KZT: string;
  RUB: string;
}

export type ICountryIds = {
  [key in TCountryIds]: key;
};

export type TCountryIds = 'KZ' | 'RU';

export const DeliveryTypes: IDeliveryTypes = {
  WAREHOUSE: 136,
  DELIVERY: 137,
};

export const DeliveryCompanies: IDeliveryCompanies = {
  CDEK: 'CDEK',
  KAZPOST: 'АО «Казпочта»',
};

export const DeliveryCompaniesIds: IDeliveryCompanies = {
  CDEK: 'CDEK',
  KAZPOST: 'KAZPOST',
};

export const KazPostDeliveryPrice: IKazPostDeliveryPrice = {
  RUB: 176,
  KZT: 1000,
};

export const SenderCityIds: ISenderCityIds = {
  SPB: 137,
  UKG: 11903,
};

export const CurrencySymbols: ICurrencySymbols = {
  KZT: '\u20B8',
  RUB: '\u20BD',
};

export const CountryIds: ICountryIds = {
  KZ: 'KZ',
  RU: 'RU',
};
