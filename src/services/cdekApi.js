import jsonp from 'jsonp';

const CDEK_BASE_URL = 'https://api.cdek.ru/';

const cdekApi = (url, config = {}, handler) => {
  return jsonp(CDEK_BASE_URL + url, config, handler);
};
export { cdekApi };
