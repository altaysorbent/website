import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';

import CDEKDeliveryForm from 'components/delivery/forms/CDEKDeliveryForm/CDEKDeliveryForm';
import KazPostDeliveryForm from 'components/delivery/forms/KazPostDeliveryForm/KazPostDeliveryForm';
import MaximumAmountNotice from 'components/delivery/MaximumAmountNotice';

import { fetchCityList } from 'services/cdekApi';
import { createOrder } from 'services/altayApi';

import {
  CURRENCY_SYMBOLS,
  defaultProductId,
  DELIVERY_COMPANIES,
  DELIVERY_COMPANIES_IDS,
  KAZPOST_DELIVERY_PRICE,
  maximumAvailableCountCDEK,
  maximumAvailableCountKazPost,
  minimumAvailableCount,
  productName,
  productPriceKzt,
  productPriceRub,
} from 'constants/Product';

import { ICDEKCityItem } from 'interfaces/CdekCityItem.interface';
import { IBuyForm } from 'interfaces/BuyForm.interface';

import classes from './BuyForm.module.scss';

const BuyForm = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IBuyForm>({
    defaultValues: {
      count: 1,
      deliveryCompany: DELIVERY_COMPANIES_IDS.CDEK,
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    setValue,
    setError,
    clearErrors,
  } = methods;
  const { deliveryCompany, zip: zipCode, address, city } = watch([
    'deliveryCompany',
    'zip',
    'address',
    'city',
  ]);
  const customerData = watch(['name', 'email', 'phone']);
  const count = Number(watch('count'));

  const isCDEKCompanySelected = deliveryCompany === DELIVERY_COMPANIES_IDS.CDEK;

  const [deliveryPriceKzt, setDeliveryPriceKzt] = useState(0);
  const [deliveryPriceRub, setDeliveryPriceRub] = useState(0);
  const [deliveryPeriodMin, setDeliveryPeriodMin] = useState(0);
  const [deliveryPeriodMax, setDeliveryPeriodMax] = useState(0);

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const productSumKzt = productPriceKzt * count;
  const productSumRub = productPriceRub * count;

  const totalSumKzt = productSumKzt + deliveryPriceKzt;
  const totalSumRub = productSumRub + deliveryPriceRub;

  const maximumAvailableCount = isCDEKCompanySelected
    ? maximumAvailableCountCDEK
    : maximumAvailableCountKazPost;

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
        setValue('count', maximumAvailableCountKazPost);
      }
    }
  }, [isCDEKCompanySelected, count]);

  const decreaseCount = () => {
    setValue('count', count === minimumAvailableCount ? 1 : count - 1);
  };
  const increaseCount = () => {
    setValue('count', count < maximumAvailableCount ? count + 1 : count);
  };

  const handleCountChange = (value, oldCount) => {
    const newCount = +value;

    if (newCount < minimumAvailableCount) {
      return minimumAvailableCount;
    } else if (newCount <= maximumAvailableCount) {
      return newCount;
    } else {
      return oldCount;
    }
  };

  const onCDEKDestinationCitiesFetch = (event, value) => {
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
  const onSubmit = (data) => {
    const { city, deliveryType, address, zip, senderCityId } = data;
    setLoading(true);
    clearErrors('phone');
    let optionalFields;
    if (isCDEKCompanySelected) {
      optionalFields = {
        city: city.name,
        cityFull: city.label,
        cityId: city.uid,
        tariffId: deliveryType,
      };
    } else {
      optionalFields = {
        city,
      };
    }

    const delivery = {
      company: deliveryCompany,
      address,
      zip,
      price: deliveryPriceKzt,
      senderCityId,
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

    createOrder(customerData, delivery, product)
      .then((response: AxiosResponse) => {
        const { redirectUrl } = response.data;

        window.location.href = redirectUrl;
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          const messages = err.response.data.message;
          const phoneError = messages.some((message) =>
            message.includes('phone')
          );
          if (phoneError) {
            setError('phone', {
              type: 'manual',
              message: 'Пожалуйста, укажите телефон в формате +79991234567',
            });
          }
        } else {
          enqueueSnackbar(
            'Ошибка при создании заказа, пожалуйста, попробуйте позже'
          );
        }
        setLoading(false);
        console.log('Error during order creation', err);
      });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center text-xl">
            <div className="w-full lg:w-2/3 mb-4">
              <div className="note">
                <div className="w-full flex flex-wrap flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 mb-6">
                    <h3 className="font-bold leading-none mb-4">Товар</h3>
                    <div className="w-full">
                      <h4 className="leading-none mb-4">
                        Алтайсорбент 1г/20 шт.
                      </h4>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 flex flex-col sm:items-center">
                    <div className="font-bold">Количество</div>
                    <div className="flex items-center">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={decreaseCount}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <Controller
                        control={control}
                        defaultValue={1}
                        name="count"
                        render={({ value, onChange }) => (
                          <TextField
                            className={classes.textField}
                            inputProps={{
                              className: classes.countInput,
                            }}
                            size="small"
                            type="number"
                            value={value}
                            variant="outlined"
                            onChange={(e) =>
                              onChange(
                                handleCountChange(+e.target.value, value)
                              )
                            }
                          />
                        )}
                      />

                      <IconButton
                        color="primary"
                        size="small"
                        onClick={increaseCount}
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  </div>
                  <div className="w-full my-6">
                    <MaximumAmountNotice />
                  </div>
                  <div className="w-full sm:w-1/2 mb-6">
                    <div className="font-bold mb-4">
                      Стоимость товара (без учета доставки)
                    </div>
                    <div className="font-bold text-green-700">
                      <b>
                        {productSumKzt} {CURRENCY_SYMBOLS.KZT} (~{' '}
                        {productSumRub} {CURRENCY_SYMBOLS.RUB})
                      </b>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 mb-6 flex lg:justify-center">
                    <div className="font-bold">
                      <p className="mb-2">Мы принимаем платежи с карт:</p>
                      <img
                        alt="Visa, Mastercard, Сбербан Онлайн, American Express"
                        src="/images/cards.png"
                        style={{ width: '300px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 mb-4">
              <div className="note">
                <div className="w-full mx-auto">
                  <h3 className="font-bold leading-none mb-4">Покупатель</h3>
                  <div className="w-full mb-6">
                    <label
                      className="block text-gray-700"
                      htmlFor="grid-customer-name"
                    >
                      Ф.И.О.
                    </label>
                    <TextField
                      className={classes.textField}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      inputRef={register({
                        required: 'ФИО обязательно для заполнения',
                      })}
                      name="name"
                      placeholder="Например: Иванов Иван Иванович"
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div className="w-full mb-6">
                    <label
                      className="block text-gray-700"
                      htmlFor="grid-order-phone"
                    >
                      Номер телефона
                    </label>
                    <TextField
                      className={classes.textField}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      inputRef={register({
                        required: 'Номер телефона обязателен для заполнения',
                        pattern: {
                          value: /(\+)[0-9]{11}$/,
                          message: 'Введите значение в формате: +79991234567',
                        },
                      })}
                      name="phone"
                      placeholder="+79991234567"
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-gray-700"
                      htmlFor="grid-order-email"
                    >
                      E-mail
                    </label>
                    <TextField
                      className={classes.textField}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      inputRef={register({
                        required: 'Поле E-mail обязательно для заполнения',
                        pattern: {
                          value: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
                          message:
                            'Введите значение в формате: sales@altaysorbent.org',
                        },
                      })}
                      name="email"
                      placeholder="E-mail"
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 mb-4">
              <div className="note">
                <div className="w-full mx-auto">
                  <h3 className="font-bold leading-none mb-4">Доставка</h3>
                  <div className="w-full mb-4">
                    <FormControl component="fieldset">
                      <FormLabel
                        className={classes.radioGroupLabel}
                        focused={false}
                      >
                        Почтовая компания
                      </FormLabel>
                      <Controller
                        as={
                          <RadioGroup row>
                            <FormControlLabel
                              classes={{
                                root: classes.controlLabelRoot,
                                label: classes.controlLabel,
                              }}
                              control={
                                <Radio
                                  className={classes.radio}
                                  color="primary"
                                />
                              }
                              label={`${DELIVERY_COMPANIES.CDEK} (Россия и страны СНГ)`}
                              value={DELIVERY_COMPANIES_IDS.CDEK}
                            />
                            <FormControlLabel
                              classes={{
                                root: classes.controlLabelRoot,
                                label: classes.controlLabel,
                              }}
                              control={
                                <Radio
                                  className={classes.radio}
                                  color="primary"
                                />
                              }
                              label={`${DELIVERY_COMPANIES.KAZPOST} (Казахстан)`}
                              value={DELIVERY_COMPANIES_IDS.KAZPOST}
                            />
                          </RadioGroup>
                        }
                        control={control}
                        defaultValue={DELIVERY_COMPANIES_IDS.CDEK}
                        name="deliveryCompany"
                        rules={{ required: true }}
                      />
                    </FormControl>
                  </div>
                  {isCDEKCompanySelected ? (
                    <CDEKDeliveryForm
                      cities={cities}
                      count={count}
                      onDeliveryPeriodMaxChange={setDeliveryPeriodMax}
                      onDeliveryPeriodMinChange={setDeliveryPeriodMin}
                      onDeliveryPriceKztChange={setDeliveryPriceKzt}
                      onDeliveryPriceRubChange={setDeliveryPriceRub}
                      onDestinationCitiesFetch={onCDEKDestinationCitiesFetch}
                      onError={(message) => {
                        enqueueSnackbar(message, {
                          variant: 'error',
                        });
                      }}
                    />
                  ) : (
                    <KazPostDeliveryForm />
                  )}

                  {!!errors.deliveryError && (
                    <div className="block mt-6 text-red-500">
                      {errors.deliveryError?.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 mb-12">
              <div className="note">
                <h3 className="font-bold mb-6 text-center">
                  Подтвердите информацию
                </h3>

                <div className="w-full max-w-3xl mx-auto">
                  <table className={classes.resultTable}>
                    <tbody>
                      <tr>
                        <th>Получатель:</th>
                        <td>
                          <p>{customerData.name}</p>
                          <p>{customerData.phone}</p>
                          <p>{customerData.email}</p>
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
                          {productSumKzt} {CURRENCY_SYMBOLS.KZT} (~{' '}
                          {productSumRub} {CURRENCY_SYMBOLS.RUB})
                        </td>
                      </tr>
                      <tr>
                        <th>Стоимость доставки:</th>
                        <td>
                          {zipCode && deliveryPriceKzt >= 0 && (
                            <>
                              <p>
                                до {zipCode}, г.
                                {(city as ICDEKCityItem)?.name || city},{' '}
                                {address} - {deliveryPriceKzt}
                                {CURRENCY_SYMBOLS.KZT} (~{deliveryPriceRub}
                                {CURRENCY_SYMBOLS.RUB})
                              </p>
                              {isCDEKCompanySelected && (
                                <p>
                                  (приблизительное время в пути от{' '}
                                  {deliveryPeriodMin} - до {deliveryPeriodMax}{' '}
                                  дня/дней)
                                </p>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>Всего к оплате:</th>
                        <td className="font-bold">
                          {totalSumKzt} {CURRENCY_SYMBOLS.KZT} (~ {totalSumRub}{' '}
                          {CURRENCY_SYMBOLS.RUB})
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="text-red-900 my-4">
                    Сумма оплачивается в валюте KZT (Казахстанский тенге).
                  </p>

                  <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md text-lg my-6">
                    <div className="flex">
                      <div className="py-1">
                        <svg
                          className="fill-current h-6 w-6 text-teal-500 mr-4"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                        </svg>
                      </div>
                      <div>
                        <p>
                          Нажимая кнопку «Оплатить», Вы соглашаетесь с{' '}
                          <a
                            href="/files/privacy-policy.pdf"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <u>Политикой конфиденциальности</u>
                          </a>{' '}
                          и условиями{' '}
                          <a
                            href="/files/public-offer-agreement.pdf"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <u>Публичного договора</u>
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={classes.submit}>
                    {loading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      <Button
                        className={classes.submitButton}
                        type="submit"
                        variant="contained"
                      >
                        Оплатить
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default BuyForm;
