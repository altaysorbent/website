const productName = 'Алтайсорбент 1г/20 шт.';
const minimumAvailableCount = 1;
const maximumAvailableCountCDEK = 64;
const maximumAvailableCountKazPost = 32;
const productPriceKzt = 700;
const productPriceRub = 125;
const currencyCode = 'KZT';
const defaultProductId = 20;

interface DeliveryTypes {
  WAREHOUSE: string;
  DELIVERY: string;
}

interface DeliveryCompanies {
  CDEK: string;
  KAZPOST: string;
}

interface KazPostDeliveryPrice {
  RUB: number;
  KZT: number;
}

interface SenderCityIds {
  SPB: string;
  UKG: string;
}

interface CurrencySymbols {
  KZT: string;
  RUB: string;
}

const DELIVERY_TYPES: DeliveryTypes = {
  WAREHOUSE: '136',
  DELIVERY: '137',
};

const DELIVERY_COMPANIES: DeliveryCompanies = {
  CDEK: 'CDEK',
  KAZPOST: 'АО «Казпочта»',
};

const DELIVERY_COMPANIES_IDS: DeliveryCompanies = {
  CDEK: 'CDEK',
  KAZPOST: 'KAZPOST',
};

const KAZPOST_DELIVERY_PRICE: KazPostDeliveryPrice = {
  RUB: 176,
  KZT: 1000,
};

const SENDER_CITY_IDS: SenderCityIds = {
  SPB: '137',
  UKG: '11903',
};

const CURRENCY_SYMBOLS: CurrencySymbols = {
  KZT: '\u20B8',
  RUB: '\u20BD',
};

export {
  productName,
  maximumAvailableCountCDEK,
  maximumAvailableCountKazPost,
  minimumAvailableCount,
  productPriceKzt,
  productPriceRub,
  currencyCode,
  DELIVERY_TYPES,
  DELIVERY_COMPANIES,
  DELIVERY_COMPANIES_IDS,
  KAZPOST_DELIVERY_PRICE,
  CURRENCY_SYMBOLS,
  SENDER_CITY_IDS,
  defaultProductId,
};
