import React, { useEffect, useState } from 'react';
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

import { useCDEKDeliveryPrice } from 'hooks/useCDEKDeliveryPrice';

import { fetchCityList } from 'services/cdekApi';

import {
  CurrencySymbols,
  DeliveryTypes,
  maximumAvailableCount,
  minimumAvailableCount,
  SenderCityIds,
} from 'constants/Product';

const DeliveryCalculator = (): JSX.Element => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [zipCodes, setZipCodes] = useState([]);
  const [zipCode, setZipCode] = useState(null);
  const [count, setCount] = useState(minimumAvailableCount);
  const [deliveryType, setDeliveryType] = useState(DeliveryTypes.DELIVERY);
  const [senderCity, setSenderCity] = useState(SenderCityIds.UKG);

  const {
    deliveryPriceKzt,
    deliveryPriceRub,
    deliveryPeriodMin,
    deliveryPeriodMax,
    deliveryErrorText,
    loading,
  } = useCDEKDeliveryPrice({
    cityUid: city?.uid,
    deliveryType,
    senderCityId: senderCity,
    zip: zipCode,
    count,
  });

  useEffect(() => {
    if (deliveryErrorText) {
      const id = enqueueSnackbar(deliveryErrorText, {
        variant: 'error',
        persist: true,
        onClick: () => closeSnackbar(id),
      });
    }
  }, [deliveryErrorText]);

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
            label="Усть-Каменогорск (Казахстан)"
            value={SenderCityIds.UKG}
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
            value={DeliveryTypes.DELIVERY}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            label="Самовывоз со склада"
            value={DeliveryTypes.WAREHOUSE}
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
                  {CurrencySymbols.KZT} (~{deliveryPriceRub}{' '}
                  {CurrencySymbols.RUB})
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
