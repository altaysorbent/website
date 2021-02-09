const productName = 'Алтайсорбент 1г/20 шт.';
const minimumAvailableCount = 1;
const maximumAvailableCountCDEK = 64;
const maximumAvailableCountKazPost = 32;
const productPriceKzt = 642;
const productPriceRub = 113;
const currencyCode = 'KZT';
const defaultProductId = 20;

const DELIVERY_TYPES = {
  WAREHOUSE: 136,
  DELIVERY: 137,
};

const DELIVERY_COMPANIES = {
  CDEK: 'CDEK',
  KAZPOST: 'АО «Казпочта»',
};

const DELIVERY_COMPANIES_IDS = {
  CDEK: 'CDEK',
  KAZPOST: 'KAZPOST',
};

const KAZPOST_DELIVERY_PRICE = {
  RUB: 176,
  KZT: 1000,
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
