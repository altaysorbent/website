const productName = 'Алтайсорбент 1г/20 шт.';
const minimumAvailableCount = 1;
const maximumAvailableCount = 64;
const productPriceKzt = 630;
const productPriceRub = 113;
const currencyCode = 'KZT';
const defaultProductId = 20;

const DELIVERY_TYPES = {
  WAREHOUSE: 136,
  DELIVERY: 137,
};

const SENDER_CITY_IDS = {
  SPB: 137,
  UKG: 11903,
};

const CURRENCY_SYMBOLS = {
  KZT: '\u20B8',
  RUB: '\u20BD',
};

export {
  productName,
  maximumAvailableCount,
  minimumAvailableCount,
  productPriceKzt,
  productPriceRub,
  currencyCode,
  DELIVERY_TYPES,
  CURRENCY_SYMBOLS,
  SENDER_CITY_IDS,
  defaultProductId,
};
