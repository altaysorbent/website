import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import { useSnackbar } from 'notistack';

import { TextField, IconButton, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import CDEKDeliveryForm from './delivery/forms/CDEKDeliveryForm';
import KazPostDeliveryForm from './delivery/forms/KazPostDeliveryForm';
import MaximumAmountNotice from './delivery/maximumAmountNotice';

import { fetchCityList } from '../services/cdekApi';
import { getDeliveryPrice, createOrder } from 'services/altayApi';

import {
  CURRENCY_SYMBOLS,
  DELIVERY_COMPANIES_IDS,
  DELIVERY_TYPES,
  defaultProductId,
  KAZPOST_DELIVERY_PRICE,
  maximumAvailableCountCDEK,
  maximumAvailableCountKazPost,
  minimumAvailableCount,
  productName,
  productPriceRub,
  productPriceKzt,
  SENDER_CITY_IDS,
  DELIVERY_COMPANIES,
} from '../constants/product';

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
  RadioGroupLabel: {
    marginBottom: '10px',
  },
  CountInput: {
    width: '30px',
    textAlign: 'center',
  },
  ResultTable: {
    '& th': {
      paddingRight: 20,
      textAlign: 'left',
    },
    '& tr:last-child': {
      '& th': {
        paddingTop: 20,
      },
      '& td': {
        paddingTop: 20,
      },
    },
  },
}));

const phoneMaskValue = '+___________';

const BuyForm = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [count, setCount] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [destinationZipCode, setDestinationZipCode] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPES.DELIVERY);
  const [senderCity, setSenderCity] = useState(SENDER_CITY_IDS.SPB);

  const [deliveryCompany, setDeliveryCompany] = useState(DELIVERY_COMPANIES_IDS.CDEK);

  const [deliveryPriceKzt, setDeliveryPriceKzt] = useState(0);
  const [deliveryPriceRub, setDeliveryPriceRub] = useState(0);
  const [deliveryPeriodMin, setDeliveryPeriodMin] = useState(0);
  const [deliveryPeriodMax, setDeliveryPeriodMax] = useState(0);
  const [deliveryErrorText, setDeliveryErrorText] = useState(null);

  const [cities, setCities] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);

  const isCDEKCompanySelected = deliveryCompany === DELIVERY_COMPANIES_IDS.CDEK;

  const isReadyToOrder =
    name?.length &&
    phone?.length &&
    phone !== phoneMaskValue &&
    destinationZipCode?.length &&
    (isCDEKCompanySelected ? deliveryPriceKzt > 0 : destinationAddress?.length && destinationCity?.length);

  const productSumKzt = productPriceKzt * count;
  const productSumRub = productPriceRub * count;

  const totalSumKzt = productSumKzt + deliveryPriceKzt;
  const totalSumRub = productSumRub + deliveryPriceRub;

  const maximumAvailableCount = isCDEKCompanySelected ? maximumAvailableCountCDEK : maximumAvailableCountKazPost;

  useEffect(() => {
    if (isCDEKCompanySelected && destinationCity && deliveryType && destinationZipCode && senderCity) {
      getDeliveryPrice({
        senderCityId: senderCity,
        receiverCityId: destinationCity.uid,
        quantity: count,
        tariffId: deliveryType,
      })
        .then(({ data }) => {
          const { result, error } = data;
          if (result) {
            setDeliveryPriceKzt(Math.ceil(result.priceByCurrency));
            setDeliveryPriceRub(Math.ceil(result.price));

            setDeliveryPeriodMin(result.deliveryPeriodMin);
            setDeliveryPeriodMax(result.deliveryPeriodMax);
          }
          if (error) {
            const text = error?.[0]?.text;
            if (text) {
              setDeliveryErrorText(text);
            } else {
              setDeliveryErrorText('Ошибка при расчете доставки, пожалуйста попробуйте позже');
            }
          }
        })
        .catch(() => {
          enqueueSnackbar('Ошибка при расчете доставки, пожалуйста попробуйте позже');
        });
    }
  }, [destinationCity, deliveryType, destinationZipCode, count, senderCity, enqueueSnackbar, isCDEKCompanySelected]);

  useEffect(() => {
    if (isCDEKCompanySelected === false) {
      if (count >= 16) {
        setDeliveryPriceKzt(0);
        setDeliveryPriceRub(0);
      } else {
        setDeliveryPriceKzt(KAZPOST_DELIVERY_PRICE.KZT);
        setDeliveryPriceRub(KAZPOST_DELIVERY_PRICE.RUB);
      }
      if (count > maximumAvailableCountKazPost) {
        setCount(maximumAvailableCountKazPost);
      }
    }
  }, [isCDEKCompanySelected, count]);

  useEffect(() => {
    if (isCDEKCompanySelected) {
      if (!destinationCity) {
        setZipCodes([]);
      }
      setDestinationZipCode('');
      setDeliveryErrorText(null);
    }
  }, [destinationCity, isCDEKCompanySelected]);

  const decreaseCount = () => {
    setCount(count => (count === minimumAvailableCount ? 1 : count - 1));
  };
  const increaseCount = () => {
    setCount(count => (count < maximumAvailableCount ? count + 1 : count));
  };

  const handleSetCount = e => {
    const newCount = +e.target.value;
    if (newCount >= minimumAvailableCount && newCount <= maximumAvailableCount) {
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

  const onDeliveryCompanyChange = event => {
    setDestinationZipCode('');
    setDestinationCity('');
    setDestinationAddress('');
    setDeliveryCompany(event.target.value);
  };

  const onCDEKDestinationCityChange = (event, newCity) => {
    const zipCodes = newCity?.zipcodes;
    if (zipCodes) {
      setZipCodes(zipCodes);
    } else {
      setZipCodes([]);
    }

    setDestinationCity(newCity);
  };

  const onKazPostDestinationCityChange = event => {
    setDestinationCity(event.target.value);
  };
  const onKazPostDestinationAddressChange = event => {
    setDestinationAddress(event.target.value);
  };
  const onKazPostDestinationZipCodeChange = event => {
    setDestinationZipCode(event.target.value);
  };

  const handleZipCodeChange = (event, newPostCode) => {
    setDeliveryErrorText(null);
    setDestinationZipCode(newPostCode);
  };
  const handleAddressChange = event => setDestinationAddress(event.target.value);
  const handleDeliveryTypeChange = event => setDeliveryType(+event.target.value);

  const onCDEKSenderCityChange = e => setSenderCity(+e.target.value);

  const onCDEKDestinationCitiesFetch = (event, value) => {
    if (value.length >= 3) {
      fetchCityList(value)
        .then(cities => {
          setCities(cities);
        })
        .catch(() => {
          setDeliveryErrorText('Ошибка при загрузке списка городов, пожалуйста попробуйте позже');
        });
    }
  };

  const onCreateOrderButtonClick = () => {
    const customer = { name, phone, email };

    let optionalFields;
    if (isCDEKCompanySelected) {
      optionalFields = {
        city: destinationCity.name,
        cityFull: destinationCity.label,
        cityId: destinationCity.uid,
        tariffId: deliveryType,
      };
    } else {
      optionalFields = {
        city: destinationCity,
      };
    }

    const delivery = {
      company: deliveryCompany,
      address: destinationAddress,
      zip: destinationZipCode,
      price: deliveryPriceKzt,
      senderCityId: senderCity,
      ...optionalFields,
    };

    const product = {
      deliveryPrice: deliveryPriceKzt,
      count,
      total: totalSumKzt,
      amount: productSumKzt,
      price: productPriceKzt,
      name: productName,
      id: defaultProductId,
    };

    createOrder(customer, delivery, product)
      .then(response => {
        const { redirectUrl } = response.data;

        window.location.href = redirectUrl;
      })
      .catch(err => {
        if (err?.response?.status === 400) {
          const messages = err.response.data.message;
          const phoneError = messages.some(message => message.includes('phone'));
          if (phoneError) {
            enqueueSnackbar('Неправильно заполнен телефон, пожалуйста, укажите телефон в формате +79991234567', {
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
            });
          }
        } else {
          enqueueSnackbar('Ошибка при создании заказа, пожалуйста, попробуйте позже');
        }

        console.log('Error during order creation', err);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full lg:w-2/3 mb-4">
          <div className="note">
            <div className="w-full flex flex-wrap flex-col sm:flex-row">
              <div className="w-full sm:w-1/2 mb-6">
                <h3 className="text-xl font-bold leading-none mb-4">Товар</h3>
                <div className="w-full">
                  <h4 className="text-lg leading-none mb-4">Алтайсорбент 1г/20 шт.</h4>
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex flex-col sm:items-center">
                <div className="text-xl font-bold">Количество</div>
                <div className="flex items-center">
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
              <div className="w-full my-6">
                <MaximumAmountNotice />
              </div>
              <div className="w-full sm:w-1/2 mb-6">
                <div className="text-xl font-bold leading-none mb-4">Стоимость (без учета доставки)</div>
                <div className="font-bold text-green-700 text-xl">
                  <b>
                    {productSumKzt} {CURRENCY_SYMBOLS.KZT} (~ {productSumRub} {CURRENCY_SYMBOLS.RUB})
                  </b>
                </div>
              </div>
              <div className="w-full sm:w-1/2 mb-6 flex lg:justify-center">
                <div className="font-bold">
                  <p className="mb-2">Мы принимаем платежи с карт:</p>
                  <img
                    src="/images/cards.png"
                    style={{ width: '300px' }}
                    alt="Visa, Mastercard, Сбербан Онлайн, American Express"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 mb-4">
          <div className="note">
            <div className="w-full mx-auto">
              <h3 className="text-xl font-bold leading-none mb-4">Покупатель</h3>
              <div className="w-full mb-6">
                <label className="block text-gray-800" htmlFor="grid-customer-name">
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
                <label className="block text-gray-800" htmlFor="grid-order-phone">
                  Номер телефона
                </label>
                <InputMask
                  mask="+99999999999"
                  value={phone}
                  onChange={handlePhoneChange}
                  maskPlaceholder="+79991234567"
                  required
                >
                  {() => (
                    <TextField
                      variant="outlined"
                      className={classes.TextField}
                      placeholder="+79991234567"
                      type="text"
                      fullWidth
                      size="small"
                      required
                    />
                  )}
                </InputMask>
              </div>
              <div className="w-full">
                <label className="block text-gray-800" htmlFor="grid-order-email">
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
        <div className="w-full lg:w-2/3 mb-4">
          <div className="note">
            <div className="w-full mx-auto">
              <h3 className="text-xl font-bold leading-none mb-4">Доставка</h3>
              <div className="w-full mb-4">
                <FormControl component="fieldset">
                  <FormLabel focused={false} className={classes.RadioGroupLabel}>
                    Почтовая компания
                  </FormLabel>
                  <RadioGroup row name="senderCityId" value={deliveryCompany} onChange={onDeliveryCompanyChange}>
                    <FormControlLabel
                      value={DELIVERY_COMPANIES_IDS.CDEK}
                      className={classes.ControlLabel}
                      control={<Radio color="primary" className={classes.Radio} />}
                      label={`${DELIVERY_COMPANIES.CDEK} (Россия и страны СНГ)`}
                    />
                    <FormControlLabel
                      value={DELIVERY_COMPANIES_IDS.KAZPOST}
                      className={classes.ControlLabel}
                      control={<Radio color="primary" className={classes.Radio} />}
                      label={`${DELIVERY_COMPANIES.KAZPOST} (Казахстан)`}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {isCDEKCompanySelected ? (
                <CDEKDeliveryForm
                  senderCity={senderCity}
                  onSenderCityChange={onCDEKSenderCityChange}
                  cities={cities}
                  deliveryType={deliveryType}
                  destinationAddress={destinationAddress}
                  destinationCity={destinationCity}
                  onDestinationCityChange={onCDEKDestinationCityChange}
                  onDestinationCitiesFetch={onCDEKDestinationCitiesFetch}
                  destinationZipCode={destinationZipCode}
                  zipCodes={zipCodes}
                  onDestinationZipCodeChange={handleZipCodeChange}
                  onDestinationAddressChange={handleAddressChange}
                  onDeliveryTypeChange={handleDeliveryTypeChange}
                />
              ) : (
                <KazPostDeliveryForm
                  destinationCity={destinationCity}
                  onDestinationCityChange={onKazPostDestinationCityChange}
                  destinationAddress={destinationAddress}
                  onDestinationAddressChange={onKazPostDestinationAddressChange}
                  destinationZipCode={destinationZipCode}
                  onDestinationZipCodeChange={onKazPostDestinationZipCodeChange}
                />
              )}

              {deliveryErrorText && <div className="block mt-6 text-red-600">{deliveryErrorText}</div>}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 mb-12">
          <div className="note">
            <h3 className="text-xl font-bold mb-6 text-center">Подтвердите информацию</h3>

            <div className="w-full max-w-3xl mx-auto">
              <table className={classes.ResultTable}>
                <tbody>
                  <tr>
                    <th>Получатель:</th>
                    <td>
                      <p>{name}</p>
                      <p>{phone}</p>
                      <p>{email}</p>
                    </td>
                  </tr>
                  <tr>
                    <th>Товар:</th>
                    <td>{productName}</td>
                  </tr>
                  <tr>
                    <th>Количество:</th>
                    <td>{count} уп.</td>
                  </tr>
                  <tr>
                    <th>Стоимость товара:</th>
                    <td>
                      {productSumKzt} {CURRENCY_SYMBOLS.KZT} (~ {productSumRub} {CURRENCY_SYMBOLS.RUB})
                    </td>
                  </tr>
                  <tr>
                    <th>Стоимость доставки:</th>
                    <td>
                      {destinationZipCode && deliveryPriceKzt >= 0 && (
                        <>
                          <p>
                            до {destinationZipCode}, г.{destinationCity?.name}, {destinationAddress} -{' '}
                            {deliveryPriceKzt}
                            {CURRENCY_SYMBOLS.KZT} (~{deliveryPriceRub}
                            {CURRENCY_SYMBOLS.RUB})
                          </p>
                          {isCDEKCompanySelected && (
                            <p>
                              (приблизительное время в пути от {deliveryPeriodMin} - до {deliveryPeriodMax} дня/дней)
                            </p>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Всего к оплате:</th>
                    <td className="font-bold">
                      {totalSumKzt} {CURRENCY_SYMBOLS.KZT} (~ {totalSumRub} {CURRENCY_SYMBOLS.RUB})
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="text-red-900 my-4">Сумма оплачивается в валюте KZT (Казахстанский тенге).</p>

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
                      <a rel="noopener noreferrer" target="_blank" href="/files/privacy-policy.pdf">
                        <u>Политикой конфиденциальности</u>
                      </a>{' '}
                      и условиями{' '}
                      <a rel="noopener noreferrer" target="_blank" href="/files/public-offer-agreement.pdf">
                        <u>Публичного договора</u>
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={onCreateOrderButtonClick}
                className={classNames({
                  'text-white font-bold py-2 px-4 rounded block mx-auto': true,
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
