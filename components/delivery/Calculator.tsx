import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';

import {
  CircularProgress,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { fetchCityList } from 'services/cdekApi';
import { getDeliveryPrice } from 'services/altayApi';

import {
  CURRENCY_SYMBOLS,
  DELIVERY_TYPES,
  maximumAvailableCount,
  minimumAvailableCount,
  SENDER_CITY_IDS,
} from 'constants/Product';

import { IDestinationCity } from 'interfaces/DestinationCity.interface';

const DeliveryCalculator = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [zipCodes, setZipCodes] = useState([]);
  const [zipCode, setZipCode] = useState(null);
  const [count, setCount] = useState(minimumAvailableCount);
  const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPES.DELIVERY);
  const [senderCity, setSenderCity] = useState(SENDER_CITY_IDS.SPB);
  const [loading, setLoading] = useState(false);

  const [deliveryPriceKzt, setDeliveryPriceKzt] = useState(0);
  const [deliveryPriceRub, setDeliveryPriceRub] = useState(0);
  const [deliveryPeriodMin, setDeliveryPeriodMin] = useState(0);
  const [deliveryPeriodMax, setDeliveryPeriodMax] = useState(0);

  useEffect(() => {
    if (count && zipCode && city && deliveryType && senderCity) {
      setLoading(true);
      getDeliveryPrice({
        senderCityId: senderCity,
        receiverCityId: city.uid,
        quantity: count,
        tariffId: deliveryType,
      })
        .then(({ data }: AxiosResponse) => {
          const { result, error } = data;
          if (result as IDestinationCity) {
            setDeliveryPriceKzt(Math.ceil(result.priceByCurrency));
            setDeliveryPriceRub(Math.ceil(result.price));

            setDeliveryPeriodMin(result.deliveryPeriodMin);
            setDeliveryPeriodMax(result.deliveryPeriodMax);
          }
          if (error) {
            const text = error?.[0]?.text;
            if (text) {
              enqueueSnackbar(text, {
                variant: 'error',
              });
            } else {
              enqueueSnackbar(
                'Ошибка при расчете доставки, пожалуйста попробуйте позже',
                {
                  variant: 'error',
                }
              );
            }
          }
        })
        .catch(() => {
          enqueueSnackbar(
            'Ошибка при расчете доставки, пожалуйста попробуйте позже',
            {
              variant: 'error',
            }
          );
        })
        .finally(() => setLoading(false));
    }
  }, [count, zipCode, city, deliveryType, senderCity, enqueueSnackbar]);

  useEffect(() => {
    if (!city) {
      setZipCodes([]);
    }
    setZipCode(null);
  }, [city]);

  const onCitiesFetchRequested = (event, value) => {
    if (value.length >= 3) {
      fetchCityList(value)
        .then((cities) => {
          setCities(cities);
        })
        .catch(() => {
          enqueueSnackbar(
            'Ошибка при загрузке списка городов, пожалуйста попробуйте позже',
            {
              variant: 'error',
            }
          );
        });
    }
  };

  const handleCityChange = (event, newCity) => {
    const zipCodes = newCity?.zipcodes;
    if (zipCodes) {
      setZipCodes(zipCodes);
    } else {
      setZipCodes([]);
    }

    setCity(newCity);
  };
  const handleZipCodeChange = (event, newPostCode) => {
    setZipCode(newPostCode);
  };

  const decreaseCount = () => {
    setCount((count) => (count === minimumAvailableCount ? 1 : count - 1));
  };
  const increaseCount = () => {
    setCount((count) => (count < maximumAvailableCount ? count + 1 : count));
  };
  const handleSetCount = (e) => {
    const newCount = +e.target.value;
    if (
      newCount >= minimumAvailableCount &&
      newCount <= maximumAvailableCount
    ) {
      setCount(newCount);
    }
  };

  const handleDeliveryTypeChange = (event) =>
    setDeliveryType(event.target.value);

  const handleSenderCityChange = (e) => setSenderCity(e.target.value);

  return (
    <div className="flex flex-wrap max-w-3xl mx-auto text-xl">
      <div className="w-full ">
        <h4 className="text-xl">Город отправления</h4>
        <RadioGroup
          name="senderCityId"
          value={senderCity}
          row
          onChange={handleSenderCityChange}
        >
          <FormControlLabel
            control={<Radio color="primary" />}
            label="Санкт-Петербург (Россия)"
            value={SENDER_CITY_IDS.SPB}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            label="Усть-Каменогорск (Казахстан)"
            value={SENDER_CITY_IDS.UKG}
          />
        </RadioGroup>
      </div>
      <div className="flex w-full md:w-1/5 md:pr-3 flex-col">
        <div className="w-full text-center">
          <FormLabel focused={false}>Количество</FormLabel>
        </div>
        <div className="w-full flex items-center">
          <IconButton color="primary" size="small" onClick={decreaseCount}>
            <RemoveIcon />
          </IconButton>

          <TextField
            size="small"
            type="number"
            value={count}
            variant="outlined"
            onChange={handleSetCount}
          />

          <IconButton color="primary" size="small" onClick={increaseCount}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <div className="w-full md:w-3/5 md:pr-3 mb-6 md:mb-0">
        <FormLabel focused={false}>Город назначения</FormLabel>

        <Autocomplete
          getOptionLabel={(option) => option.label || ''}
          noOptionsText="Введите первые буквы города"
          options={cities}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          size="small"
          value={city}
          autoComplete
          autoHighlight
          autoSelect
          onChange={handleCityChange}
          onInputChange={onCitiesFetchRequested}
        />
      </div>
      <div className="w-full md:w-1/5 ">
        <FormLabel focused={false}>Индекс</FormLabel>

        <Autocomplete
          getOptionLabel={(option) => option || ''}
          noOptionsText={
            city ? 'Выберите значение из списка' : 'Сначала укажите город'
          }
          options={zipCodes}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          size="small"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
      </div>
      <div className="w-full ">
        <RadioGroup
          name="deliveryType"
          value={deliveryType}
          row
          onChange={handleDeliveryTypeChange}
        >
          <FormControlLabel
            control={<Radio color="primary" />}
            label="Доставка до квартиры"
            value={DELIVERY_TYPES.DELIVERY}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            label="Самовывоз со склада"
            value={DELIVERY_TYPES.WAREHOUSE}
          />
        </RadioGroup>
      </div>
      <div className="w-full py-4 flex justify-center">
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <>
            {deliveryPriceRub > 0 && deliveryPriceKzt > 0 && (
              <div className="w-full mt-4 text-green-800">
                <p>
                  Стоимость доставки составит - {deliveryPriceKzt}{' '}
                  {CURRENCY_SYMBOLS.KZT} (~{deliveryPriceRub}{' '}
                  {CURRENCY_SYMBOLS.RUB})
                </p>
                <p>
                  Срок доставки от {deliveryPeriodMin} до {deliveryPeriodMax}{' '}
                  дней/дня
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeliveryCalculator;
