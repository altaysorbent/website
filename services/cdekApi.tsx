import jsonp from 'jsonp';
import { ICDEKCityItem } from 'interfaces/cdekCityItem.interface';
import { ICDEKGeoname } from '../interfaces/cdekGeoname.interface';

const CDEK_BASE_URL = 'https://api.cdek.ru/';

interface CityList {
  geonames: ICDEKGeoname[];
}

const cdekApi = (
  url: string,
  config = {},
  handler: (err, response) => void
) => {
  return jsonp(CDEK_BASE_URL + url, config, handler);
};

const getCityList = (query: string): Promise<CityList> => {
  return new Promise((resolve, reject) => {
    cdekApi(
      `city/getListByTerm/jsonp.php?q=${query}`,
      null,
      (err, response) => {
        if (err) {
          console.log('Error during fetch cities from CDEK', err);
          reject(err);
        }

        resolve(response);
      }
    );
  });
};

let timerId;
const fetchCityList = (query: string): Promise<ICDEKCityItem[]> => {
  return new Promise((resolve, reject) => {
    timerId && clearTimeout(timerId);
    timerId = setTimeout(() => {
      getCityList(query)
        .then((response) => {
          let cities = [];
          const geonames = response?.geonames;
          if (geonames) {
            cities = geonames.map((item) => {
              return {
                uid: item.id,
                name: item.cityName,
                region: item.regionName,
                label: item.name,
                zipcodes: item.postCodeArray,
              };
            });
          }
          resolve(cities);
        })
        .catch((err) => {
          reject(err);
        });
    }, 500);
  });
};

export { cdekApi, getCityList, fetchCityList };
