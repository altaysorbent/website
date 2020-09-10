import axios from 'axios';

const ALTAY_BASE_URL = process.env.GATSBY_API_URL;

const altayApi = axios.create({
  baseURL: ALTAY_BASE_URL,
});

export { altayApi };
