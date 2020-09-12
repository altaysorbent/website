import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import { useSnackbar } from 'notistack';

import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import { cdekApi } from '../services/cdekApi';
import { altayApi } from '../services/altayApi';
import { uuidv4 } from '../utils/uuid';

const useStyles = makeStyles(theme => ({
  TextField: {
    backgroundColor: '#fff',
  },
  Radio: {
    padding: '5px',
  },
  ControlLabel: {
    marginLeft: '-7px',
  },
  DeliveryTypeLabel: {
    marginBottom: '10px',
  },
  CountInput: {
    width: '30px',
    textAlign: 'center',
  },
}));

let timerId = 0;
const productName = 'Алтайсорбент 1г №20';
const productPriceKzt = 630;
const productPriceRub = 111;
const minimumAvailableCount = 1;
const maximumAvailableCount = 32;

const currencyCode = 'KZT';

const DELIVERY_TYPES = {
  WAREHOUSE: 136,
  DELIVERY: 137,
};
const CURRENCY_SYMBOLS = {
  KZT: '\u20B8',
  RUB: '\u20BD',
};

const phoneMaskValue = '+___________';

const BuyForm = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [count, setCount] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [address, setAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPES.DELIVERY);
  const [deliveryPriceKzt, setDeliveryPriceKzt] = useState(0);
  const [deliveryPriceRub, setDeliveryPriceRub] = useState(0);
  const [deliveryPeriodMin, setDeliveryPeriodMin] = useState(0);
  const [deliveryPeriodMax, setDeliveryPeriodMax] = useState(0);
  const [deliveryErrorText, setDeliveryErrorText] = useState(null);

  const [cities, setCities] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);

  const isReadyToOrder =
    name?.length &&
    phone?.length &&
    phone !== phoneMaskValue &&
    zipCode?.length &&
    deliveryPriceKzt > 0;

  const productSumKzt = productPriceKzt * count;
  const productSumRub = productPriceRub * count;

  const totalSumKzt = productSumKzt + deliveryPriceKzt;
  const totalSumRub = productSumRub + deliveryPriceRub;

  useEffect(() => {
    if (city && deliveryType && zipCode) {
      altayApi
        .post('cdek/calculate_price', {
          destCityId: city.uid,
          quantity: count,
          currency: currencyCode,
          tariff: deliveryType,
        })
        .then(({ data }) => {
          const { result, error } = data.result;
          if (result) {
            setDeliveryPriceKzt(result.priceByCurrency);
            setDeliveryPriceRub(Math.round(result.price));

            setDeliveryPeriodMin(result.deliveryPeriodMin);
            setDeliveryPeriodMax(result.deliveryPeriodMax);
          }
          if (error) {
            const text = error?.[0]?.text;
            if (text) {
              setDeliveryErrorText(text);
            } else {
              setDeliveryErrorText(
                'Ошибка при расчете доставки, пожалуйста попробуйте позже'
              );
            }
          }
        })
        .catch(err => {
          enqueueSnackbar(
            'Ошибка при расчете доставки, пожалуйста попробуйте позже'
          );
          console.log('err', err);
        });
    }
  }, [city, deliveryType, zipCode, count]);

  useEffect(() => {
    if (!city) {
      setZipCodes([]);
    }
    setZipCode(null);
    setDeliveryErrorText(null);
  }, [city]);

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

  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);
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
    setDeliveryErrorText(null);
    setZipCode(newPostCode);
  };
  const handleAddressChange = event => setAddress(event.target.value);
  const handleDeliveryTypeChange = event =>
    setDeliveryType(+event.target.value);

  const onCitiesFetchRequested = (event, value) => {
    if (value.length >= 3) {
      timerId && clearTimeout(timerId);

      timerId = setTimeout(() => {
        cdekApi(
          `city/getListByTerm/jsonp.php?q=${value}`,
          null,
          (err, response) => {
            if (err) {
              console.log('Error during fetch cities from CDEK', err);
              setDeliveryErrorText(
                'Ошибка при загрузке списка городов, пожалуйста попробуйте позже'
              );
            }
            const geonames = response?.geonames;

            if (geonames) {
              const cities = geonames.map(item => {
                return {
                  uid: item.id,
                  name: item.cityName,
                  region: item.regionName,
                  label: item.name,
                  zipcodes: item.postCodeArray,
                };
              });

              setCities(cities);
            }
          }
        );
      }, 500);
    }
  };

  const createOrder = () => {
    altayApi
      .post('paybox/init', {
        customer: {
          name,
          phone,
          email,
        },
        delivery: {
          address,
          city: city.name,
          cityFull: city.label,
          cityId: city.uid,
          zipcode: zipCode,
          price: deliveryPriceKzt,
          tariffId: deliveryType,
        },
        product: {
          deliveryPrice: deliveryPriceKzt,
          count,
          totalAmount: totalSumKzt,
          amount: productSumKzt,
          price: productPriceKzt,
          name: productName,
          currency: currencyCode,
          descr: `Заказ ${productName}`,
          uid: uuidv4(),
        },
      })
      .then(response => {
        const { redirectUrl } = response.data;

        window.location.href = redirectUrl;
      })
      .catch(err => {
        enqueueSnackbar(
          'Ошибка при создании заказа, пожалуйста, попробуйте позже'
        );
        console.log('Error during order creation', err);
      });
  };

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="flex w-full  flex-wrap flex-col lg:flex-row lg:w-1/2 pl-4 mt-4 lg:mt-0">
          <div className="flex w-full lg:w-1/2 justify-center items-center">
            <div className="w-1/2 text-xl font-bold text-gray-800">
              Количество
            </div>
            <div className="w-1/2 flex items-center">
              <IconButton onClick={decreaseCount} size="small" color="primary">
                <RemoveIcon />
              </IconButton>

              <TextField
                onChange={handleSetCount}
                className={classes.TextField}
                type="text"
                value={count}
                variant="outlined"
                size="small"
                inputProps={{
                  className: classes.CountInput,
                }}
              />

              <IconButton onClick={increaseCount} size="small" color="primary">
                <AddIcon />
              </IconButton>
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 lg:justify-around items-center mt-4 lg:mt-0">
            <div className="w-1/2 lg:w-auto text-xl font-bold text-gray-800">
              Сумма
            </div>
            <div className="w-1/2 lg:w-auto font-bold text-green-700 text-xl">
              <b>
                {productSumKzt} {CURRENCY_SYMBOLS.KZT} (~ {productSumRub}{' '}
                {CURRENCY_SYMBOLS.RUB})
              </b>
            </div>
          </div>
          <div className="w-full mt-2 text-red-700">
            Максимально возможное количество упаковок для заказа -{' '}
            <b>{maximumAvailableCount}</b>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-4 flex lg:justify-center">
          <div className="text-gray-800 font-bold">
            <p className="mb-2">Мы принимаем платежи с карт:</p>
            <img
              src="/images/cards.png"
              style={{ width: '300px' }}
              alt="Visa, Mastercard, Сбербан Онлайн, American Express"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 mb-4">
          <div className="note">
            <h3 className="text-xl text-gray-800 font-bold leading-none mb-4">
              1. Покупатель
            </h3>

            <div className="w-full max-w-lg mx-auto">
              <div className="w-full mb-6">
                <label
                  className="block text-gray-800"
                  htmlFor="grid-customer-name"
                >
                  Ф.И.О.
                </label>
                <TextField
                  onChange={handleNameChange}
                  className={classes.TextField}
                  placeholder="Например: Иванов Иван Иванович"
                  value={name}
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{
                    className: classes.Input,
                  }}
                />
              </div>
              <div className="w-full mb-6">
                <label
                  className="block text-gray-800"
                  htmlFor="grid-order-phone"
                >
                  Номер телефона
                </label>
                <InputMask
                  mask="+99999999999"
                  value={phone}
                  onChange={handlePhoneChange}
                  maskPlaceholder="+799912345678"
                  required
                >
                  {() => (
                    <TextField
                      variant="outlined"
                      className={classes.TextField}
                      placeholder="+799912345678"
                      type="text"
                      fullWidth
                      size="small"
                      required
                    />
                  )}
                </InputMask>
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-800"
                  htmlFor="grid-order-email"
                >
                  E-mail
                </label>
                <TextField
                  onChange={handleEmailChange}
                  className={classes.TextField}
                  pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
                  placeholder="E-mail"
                  type="email"
                  value={email}
                  variant="outlined"
                  fullWidth
                  size="small"
                  inputProps={{
                    type: 'email',
                    required: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mb-4">
          <div className="note">
            <h3 className="text-xl text-gray-800 font-bold leading-none mb-4">
              2. Доставка
            </h3>

            <div className="w-full max-w-lg mx-auto">
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-2/3 md:pr-3 mb-6 md:mb-0">
                  <label
                    className="block text-gray-800"
                    htmlFor="grid-delivery-city"
                  >
                    Город
                  </label>

                  <Autocomplete
                    options={cities}
                    getOptionLabel={option => option.label || ''}
                    value={city}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="outlined"
                        className={classes.TextField}
                      />
                    )}
                    onChange={handleCityChange}
                    onInputChange={onCitiesFetchRequested}
                    size="small"
                    noOptionsText="Введите первые буквы города"
                    autoHighlight
                    autoSelect
                    autoComplete
                  />
                </div>
                <div className="w-full md:w-1/3 ">
                  <label
                    className="block text-gray-800"
                    htmlFor="grid-delivery-zip"
                  >
                    Почтовый код
                  </label>

                  <Autocomplete
                    options={zipCodes}
                    getOptionLabel={option => option || ''}
                    value={zipCode}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="outlined"
                        className={classes.TextField}
                      />
                    )}
                    onChange={handleZipCodeChange}
                    size="small"
                    noOptionsText={
                      city
                        ? 'Выберите значение из списка'
                        : 'Сначала укажите город'
                    }
                  />
                </div>
              </div>
              <div className="w-full mb-6">
                <label
                  className="block text-gray-800"
                  htmlFor="grid-delivery-address"
                >
                  Адрес получателя
                </label>
                <TextField
                  onChange={handleAddressChange}
                  placeholder="Московский проспект д.5, кв 90"
                  className={classes.TextField}
                  value={address}
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </div>

              <div className="w-full">
                <FormControl component="fieldset">
                  <FormLabel
                    focused={false}
                    className={classes.DeliveryTypeLabel}
                  >
                    Способ доставки
                  </FormLabel>
                  <RadioGroup
                    name="deliveryType"
                    value={deliveryType}
                    onChange={handleDeliveryTypeChange}
                  >
                    <FormControlLabel
                      value={DELIVERY_TYPES.DELIVERY}
                      className={classes.ControlLabel}
                      control={
                        <Radio color="primary" className={classes.Radio} />
                      }
                      label="Доставка до квартиры"
                    />
                    <FormControlLabel
                      value={DELIVERY_TYPES.WAREHOUSE}
                      className={classes.ControlLabel}
                      control={
                        <Radio color="primary" className={classes.Radio} />
                      }
                      label="Самовывоз со склада"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              {deliveryErrorText && (
                <div className="block mt-6 text-red-600">
                  {deliveryErrorText}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full mb-12">
          <div className="note">
            <h3 className="text-xl text-gray-800 font-bold mb-6 text-center">
              Подтвердите информацию
            </h3>

            <div className="w-full max-w-4xl mx-auto text-gray-800">
              <div className="flex flex-col sm:flex-row mb-6 sm:mb-0">
                <div className="w-full sm:w-1/3 font-bold">Получатель:</div>
                <div>
                  <p>{name}</p>
                  <p>{phone}</p>
                  <p>{email}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row mb-6 sm:mb-0">
                <div className="w-full sm:w-1/3 font-bold">Товар:</div>
                <div>{productName}</div>
              </div>

              <div className="flex flex-col sm:flex-row mb-6 sm:mb-0">
                <div className="w-full sm:w-1/3 font-bold">Количество:</div>
                <div>{count} уп.</div>
              </div>

              <div className="flex flex-col sm:flex-row mb-6 sm:mb-0">
                <div className="w-full sm:w-1/3 font-bold">
                  Стоимость товара:
                </div>
                <div>
                  {productSumKzt} {CURRENCY_SYMBOLS.KZT} (~ {productSumRub}{' '}
                  {CURRENCY_SYMBOLS.RUB})
                </div>
              </div>

              <div className="flex flex-col sm:flex-row mb-6 sm:mb-0">
                <div className="w-full sm:w-1/3 font-bold">
                  Стоимость доставки:
                </div>
                {zipCode && deliveryPriceKzt > 0 && (
                  <div>
                    <p>
                      до {zipCode}, г.{city?.name}, {address} -{' '}
                      {deliveryPriceKzt}
                      {CURRENCY_SYMBOLS.KZT} (~{deliveryPriceRub}
                      {CURRENCY_SYMBOLS.RUB})
                    </p>
                    <p>
                      (приблизительное время в пути от {deliveryPeriodMin} - до{' '}
                      {deliveryPeriodMax} дня/дней)
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/3 font-bold">Всего к оплате:</div>
                <div>
                  {totalSumKzt} {CURRENCY_SYMBOLS.KZT} (~ {totalSumRub}{' '}
                  {CURRENCY_SYMBOLS.RUB})
                </div>
              </div>

              <p className="text-red-900 my-4">
                Сумма оплачивается в валюте KZT (Казахстанский тенге).
              </p>

              <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md text-base my-6">
                <div className="flex">
                  <div className="py-1">
                    <svg
                      className="fill-current h-6 w-6 text-teal-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p>
                      Нажимая кнопку "Оплатить", Вы соглашаетесь с{' '}
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="/files/privacy-policy.pdf"
                      >
                        <u>Политикой конфиденциальности</u>
                      </a>{' '}
                      и условиями{' '}
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="/files/public-offer-agreement.pdf"
                      >
                        <u>Публичного договора</u>
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={createOrder}
                className={classNames({
                  'text-white font-bold py-2 px-4 rounded ': true,
                  'bg-gray-500 hover:bg-blue-gray cursor-not-allowed': !isReadyToOrder,
                  'bg-green-600 hover:bg-green-700': isReadyToOrder,
                })}
                disabled={!isReadyToOrder}
              >
                Оплатить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyForm;
