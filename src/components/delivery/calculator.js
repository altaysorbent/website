import React, { useEffect, useState } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';

import {
  CURRENCY_SYMBOLS,
  currencyCode,
  DELIVERY_TYPES,
  maximumAvailableCount,
  minimumAvailableCount,
} from '../../constants/product';
import { fetchCityList } from '../../services/cdekApi';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/styles';
import { getDeliveryPrice } from '../../services/altayApi';

const useStyles = makeStyles(theme => ({
  deliveryType: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '1rem',
  },
  label: {
    fontSize: '1.25rem',
  },
}));
const DeliveryCalculator = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [zipCodes, setZipCodes] = useState([]);
  const [zipCode, setZipCode] = useState(null);
  const [count, setCount] = useState(minimumAvailableCount);
  const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPES.DELIVERY);

  const [deliveryPriceKzt, setDeliveryPriceKzt] = useState(0);
  const [deliveryPriceRub, setDeliveryPriceRub] = useState(0);
  const [deliveryPeriodMin, setDeliveryPeriodMin] = useState(0);
  const [deliveryPeriodMax, setDeliveryPeriodMax] = useState(0);

  useEffect(() => {
    if (count && zipCode && city && deliveryType) {
      getDeliveryPrice({
        destCityId: city.uid,
        quantity: count,
        currency: currencyCode,
        tariff: deliveryType,
      })
        .then(({ data }) => {
          const { result, error } = data.result;
          if (result) {
            setDeliveryPriceKzt(result.priceByCurrency);
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
        });
    }
  }, [count, zipCode, city, deliveryType, enqueueSnackbar]);

  useEffect(() => {
    if (!city) {
      setZipCodes([]);
    }
    setZipCode(null);
  }, [city]);

  const onCitiesFetchRequested = (event, value) => {
    if (value.length >= 3) {
      fetchCityList(value)
        .then(cities => {
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
    setCount(count => (count === minimumAvailableCount ? 1 : count - 1));
  };
  const increaseCount = () => {
    setCount(count => (count < maximumAvailableCount ? count + 1 : count));
  };
  const handleSetCount = e => {
    const newCount = +e.target.value;
    if (
      newCount >= minimumAvailableCount &&
      newCount <= maximumAvailableCount
    ) {
      setCount(newCount);
    }
  };

  const handleDeliveryTypeChange = event =>
    setDeliveryType(+event.target.value);

  return (
    <div className="flex flex-wrap max-w-3xl mx-auto text-xl">
      <div className="flex w-full md:w-1/5 md:pr-3 flex-col">
        <div className="w-full">Количество</div>
        <div className="w-full flex items-center">
          <IconButton onClick={decreaseCount} size="small" color="primary">
            <RemoveIcon />
          </IconButton>

          <TextField
            onChange={handleSetCount}
            type="text"
            value={count}
            variant="outlined"
            size="small"
            inputProps={{}}
          />

          <IconButton onClick={increaseCount} size="small" color="primary">
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <div className="w-full md:w-3/5 md:pr-3 mb-6 md:mb-0">
        <label className="block text-gray-800" htmlFor="grid-delivery-city">
          Город
        </label>

        <Autocomplete
          options={cities}
          getOptionLabel={option => option.label || ''}
          value={city}
          renderInput={params => <TextField {...params} variant="outlined" />}
          onChange={handleCityChange}
          onInputChange={onCitiesFetchRequested}
          size="small"
          noOptionsText="Введите первые буквы города"
          autoHighlight
          autoSelect
          autoComplete
        />
      </div>
      <div className="w-full md:w-1/5 ">
        <label className="block text-gray-800" htmlFor="grid-delivery-zip">
          Индекс
        </label>

        <Autocomplete
          options={zipCodes}
          getOptionLabel={option => option || ''}
          value={zipCode}
          renderInput={params => <TextField {...params} variant="outlined" />}
          onChange={handleZipCodeChange}
          size="small"
          noOptionsText={
            city ? 'Выберите значение из списка' : 'Сначала укажите город'
          }
        />
      </div>
      <div className="w-full ">
        <RadioGroup
          name="deliveryType"
          value={deliveryType}
          onChange={handleDeliveryTypeChange}
          className={classes.deliveryType}
        >
          <FormControlLabel
            value={DELIVERY_TYPES.DELIVERY}
            control={<Radio color="primary" />}
            label="Доставка до квартиры"
            classes={{
              label: classes.label,
            }}
          />
          <FormControlLabel
            value={DELIVERY_TYPES.WAREHOUSE}
            control={<Radio color="primary" />}
            label="Самовывоз со склада"
            classes={{
              label: classes.label,
            }}
          />
        </RadioGroup>
      </div>
      {deliveryPriceRub > 0 && deliveryPriceKzt > 0 && (
        <div className="w-full mt-4 text-green-800">
          <p>
            Стоимость доставки составит - {deliveryPriceKzt}{' '}
            {CURRENCY_SYMBOLS.KZT} (~{deliveryPriceRub} {CURRENCY_SYMBOLS.RUB})
          </p>
          <p>
            Срок доставки от {deliveryPeriodMin} до {deliveryPeriodMax} дней/дня
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryCalculator;
