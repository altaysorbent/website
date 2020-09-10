import axios from 'axios';

const PAYBOX_BASE_URL = 'https://api.paybox.money/';

const payboxApi = axios.create({
  baseURL: PAYBOX_BASE_URL,
});

export { payboxApi };
