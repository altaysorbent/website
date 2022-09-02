export const productName = 'Алтайсорбент 1г/20 шт.';
export const minimumAvailableCount = 1;
export const maximumAvailableCount = 64;
export const productPriceKzt = 950;
export const productPriceRub = 125;
export const currencyCode = 'KZT';
export const defaultProductId = 20;

interface IDeliveryTypes {
  WAREHOUSE: string;
  DELIVERY: string;
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
  SPB: string;
  UKG: string;
}

interface ICurrencySymbols {
  KZT: string;
  RUB: string;
}

export const DeliveryTypes: IDeliveryTypes = {
  WAREHOUSE: '136',
  DELIVERY: '137',
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
  SPB: '137',
  UKG: '11903',
};

export const CurrencySymbols: ICurrencySymbols = {
  KZT: '\u20B8',
  RUB: '\u20BD',
};
