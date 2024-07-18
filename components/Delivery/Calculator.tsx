'use client';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useCDEKDeliveryPrice } from '@/lib/hooks/useCDEKDeliveryPrice';

import {
  CountryIds,
  CurrencySymbols,
  DeliveryTypes,
  maximumAvailableCount,
  minimumAvailableCount,
  SenderCityIds,
} from '@/lib/constants/Product';
import { getCities, getCityPostCodes } from '@/lib/services/altayApi';
import ListboxComponent from '@/components/VirtualizedAutocomplete/Listbox';

const DeliveryCalculator = (): React.JSX.Element => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [zipCodes, setZipCodes] = useState([]);
  const [zipCode, setZipCode] = useState(null);
  const [count, setCount] = useState(minimumAvailableCount);
  const [deliveryType, setDeliveryType] = useState(DeliveryTypes.DELIVERY);
  const [senderCity, setSenderCity] = useState(SenderCityIds.UKG);
  const [country, setCountry] = useState(CountryIds.KZ);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [isZipLoading, setIsZipLoading] = useState(false);
  const {
    deliveryPriceKzt,
    deliveryPeriodMin,
    deliveryPeriodMax,
    deliveryErrorText,
    loading,
  } = useCDEKDeliveryPrice({
    cityCode: city?.code,
    deliveryType,
    senderCityId: senderCity,
    zip: zipCode,
    count,
  });

  useEffect(() => {
    setCities([]);
    setCity(null);
    setZipCode(null);
    setZipCodes([]);
    setIsCitiesLoading(true);
    getCities(country)
      .then(({ data }) => {
        setCities(data);
      })
      .finally(() => {
        setIsCitiesLoading(false);
      });
  }, [country]);

  useEffect(() => {
    if (deliveryErrorText) {
      enqueueSnackbar(deliveryErrorText, {
        variant: 'error',
        persist: false,
      });
    }
  }, [deliveryErrorText]);

  useEffect(() => {
    setZipCodes([]);
    setZipCode(null);
    if (city) {
      setIsZipLoading(true);
      getCityPostCodes(city.code)
        .then(({ data }) => {
          setZipCodes(data.postal_codes);
        })
        .finally(() => {
          setIsZipLoading(false);
        });
    }
  }, [city]);

  const handleCityChange = (event, newCity) => {
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
    setDeliveryType(+event.target.value);

  const handleSenderCityChange = (e) => setSenderCity(+e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);

  return (
    <div className="mx-auto flex flex-wrap text-xl">
      <div className="w-full">
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
      <div className="mb-6 flex w-full flex-col md:mb-0 md:flex-row">
        <div className="flex w-full flex-col md:w-2/12 md:pr-3">
          <div className="w-full md:text-center">
            <FormLabel focused={false}>Количество</FormLabel>
          </div>
          <div className="flex w-full items-center">
            <IconButton color="primary" size="small" onClick={decreaseCount}>
              <RemoveIcon />
            </IconButton>

            <TextField
              size="small"
              className="flex-grow"
              inputProps={{
                className:
                  '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
              }}
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
        <div className="flex w-full flex-col md:w-3/12 md:pr-3">
          <div className="w-full">
            <FormLabel focused={false}>Страна</FormLabel>
          </div>
          <div className="flex w-full items-center">
            <Select
              value={country}
              onChange={handleCountryChange}
              size="small"
              classes={{
                root: 'w-full',
              }}
            >
              <MenuItem value={CountryIds.KZ}>Казахстан</MenuItem>
              <MenuItem value={CountryIds.RU}>Россия</MenuItem>
            </Select>
          </div>
        </div>
        <div className="w-full md:w-4/12 md:pr-3">
          <FormLabel focused={false}>Город назначения</FormLabel>
          <Autocomplete
            loading={isCitiesLoading}
            loadingText="Загружаем данные"
            getOptionLabel={(option) => option.city || ''}
            getOptionKey={(option) => option.code}
            noOptionsText="Введите первые буквы города"
            options={cities}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
            disableListWrap
            ListboxComponent={
              ListboxComponent as React.ComponentType<
                React.HTMLAttributes<HTMLElement>
              >
            }
            size="small"
            value={city}
            autoComplete
            autoHighlight
            autoSelect
            onChange={handleCityChange}
            isOptionEqualToValue={(option, value) => {
              return option.code === value.code;
            }}
          />
        </div>
        <div className="w-full md:w-3/12">
          <FormLabel focused={false}>Индекс</FormLabel>

          <Autocomplete
            loading={isZipLoading}
            loadingText="Загружаем данные"
            getOptionLabel={(option) => option || ''}
            noOptionsText={
              city ? 'Выберите значение из списка' : 'Сначала укажите город'
            }
            options={zipCodes}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
            disableListWrap
            ListboxComponent={
              ListboxComponent as React.ComponentType<
                React.HTMLAttributes<HTMLElement>
              >
            }
            size="small"
            value={zipCode}
            onChange={handleZipCodeChange}
          />
        </div>
      </div>

      <div className="w-full">
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
      <div className="flex w-full justify-center py-4">
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <>
            {deliveryPriceKzt > 0 && (
              <div className="mt-4 w-full text-green-800">
                <p>
                  Стоимость доставки составит - {deliveryPriceKzt}{' '}
                  {CurrencySymbols.KZT}
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
