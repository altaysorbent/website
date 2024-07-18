'use client';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { SnackbarKey, useSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

import {
  CountryIds,
  CurrencySymbols,
  defaultProductId,
  DeliveryCompanies,
  DeliveryCompaniesIds,
  DeliveryTypes,
  maximumAvailableCount,
  minimumAvailableCount,
  productName,
  SenderCityIds,
} from '@/lib/constants/Product';

import MaximumAmountNotice from '@/components/Delivery/MaximumAmountNotice';
import CDEKDeliveryForm from '@/components/Delivery/forms/CDEKDeliveryForm';
import KazPostDeliveryForm from '@/components/Delivery/forms/KazPostDeliveryForm';
import { useDeliveryPrice } from '@/lib/hooks/useDeliveryPrice';
import { useProductPrice } from '@/lib/hooks/useProductPrice';

import { ICDEKCityItem } from '@/lib/interfaces/CdekCityItem.interface';
import { IOrderForm } from '@/lib/interfaces/OrderForm.interface';

import { createOrder } from '@/lib/services/altayApi';
import { Simulate } from 'react-dom/test-utils';
import reset = Simulate.reset;

const CheckoutPage = (): React.JSX.Element => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const methods = useForm<IOrderForm>({
    defaultValues: {
      count: 1,
      deliveryCompany: DeliveryCompaniesIds.CDEK,
      zip: null,
      address: '',
      deliveryType: DeliveryTypes.DELIVERY,
      city: null,
      promoCode: null,
      country: CountryIds.RU,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
    setError,
    clearErrors,
    resetField,
  } = methods;

  const count = Number(watch('count'));

  const [deliveryCompany, deliveryType, zipCode, address, city, promoCode] =
    watch([
      'deliveryCompany',
      'deliveryType',
      'zip',
      'address',
      'city',
      'promoCode',
    ]);

  const [name, email, phone] = watch(['name', 'email', 'phone']);

  const customerData = {
    name,
    email,
    phone,
  };
  const isCDEKCompanySelected = deliveryCompany === DeliveryCompaniesIds.CDEK;

  const [loading, setLoading] = useState(false);

  const {
    deliveryPriceKzt,
    deliveryPeriodMin,
    deliveryPeriodMax,
    deliveryErrorText,
    loading: deliveryPriceLoading,
  } = useDeliveryPrice({
    cityCode: (city as ICDEKCityItem)?.code,
    deliveryType,
    senderCityId: SenderCityIds.UKG,
    zip: zipCode,
    count,
    isCDEKCompanySelected,
  });

  useEffect(() => {
    if (deliveryErrorText) {
      let key: SnackbarKey = enqueueSnackbar(deliveryErrorText, {
        variant: 'error',
        persist: true,
        SnackbarProps: {
          onClick: () => closeSnackbar(key),
        },
      });

      setError('deliveryError', {
        type: 'manual',
        message: deliveryErrorText,
      });
    } else {
      clearErrors('deliveryError');
    }
  }, [deliveryErrorText]);

  const canRenderDeliveryInfo = deliveryPriceKzt > 0 && zipCode && city;

  const { productPriceKzt, productSumKzt } = useProductPrice(count, promoCode);

  const totalSumKzt = productSumKzt + deliveryPriceKzt;

  const onSubmit = (data) => {
    const { city, deliveryType, address, zip } = data;
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
      senderCityId: SenderCityIds.UKG,
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

  function handleDeliveryCompanyChange(_event, value) {
    setValue('deliveryCompany', value);
    resetField('address');
    resetField('zip');
    resetField('city');
  }

  const TotalText = canRenderDeliveryInfo ? (
    <>
      {totalSumKzt} {CurrencySymbols.KZT}
    </>
  ) : (
    '-'
  );

  return (
    <FormProvider {...methods}>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Paper className="mb-10 w-full px-2 py-10 sm:px-6" elevation={3}>
          <div className="flex flex-col sm:flex-row">
            <div className="mb-0 w-full pr-0 sm:mb-4 sm:w-1/4 sm:pr-4">
              <img
                alt="Алтайсорбент"
                className="mx-auto border sm:mx-0"
                src="/images/altaysorbent.jpg"
                style={{
                  maxHeight: '155px',
                  width: 'auto',
                }}
              />
            </div>
            <div className="w-full sm:w-3/4">
              <div className="mb-4 flex flex-wrap justify-between sm:flex-nowrap">
                <div className="my-4 w-full text-center text-xl font-semibold sm:my-0 sm:w-auto">
                  {productName}
                </div>

                <div className="flex items-center">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={decreaseCount}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Box width="70px">
                    <Controller
                      control={control}
                      defaultValue={1}
                      name="count"
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          size="small"
                          type="number"
                          value={value}
                          variant="outlined"
                          onChange={(e) =>
                            onChange(handleCountChange(+e.target.value, value))
                          }
                        />
                      )}
                    />
                  </Box>

                  <IconButton
                    color="primary"
                    size="small"
                    onClick={increaseCount}
                  >
                    <AddIcon />
                  </IconButton>
                </div>

                <div className="flex items-center">
                  {productPriceKzt} {CurrencySymbols.KZT}
                </div>
              </div>

              <div className="flex items-end justify-between border-t pt-4">
                <div className="w-full">
                  <div className="flex flex-row">
                    <div className="flex w-full items-center justify-end">
                      {count} × {productPriceKzt} {CurrencySymbols.KZT} ={' '}
                      {productSumKzt}
                      {CurrencySymbols.KZT}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col text-left text-xl sm:flex-row sm:justify-end sm:text-right">
                    Итого (без учета доставки)
                    <span className="w-1/2 font-semibold sm:ml-4 sm:w-1/3">
                      {productSumKzt} {CurrencySymbols.KZT}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full">
            <MaximumAmountNotice className="text-lg" />
          </div>
        </Paper>
        <Paper className="mb-10 w-full p-4" elevation={3}>
          <h3 className="mb-4 text-2xl leading-none">Ваши данные</h3>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:pr-4">
              <FormLabel focused={false} required>
                Ф.И.О.
              </FormLabel>
              <TextField
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name', {
                  required: 'ФИО обязательно для заполнения',
                })}
                name="name"
                placeholder="Иванов Иван Иванович"
                size="small"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="w-full sm:px-2">
              <FormLabel focused={false} required>
                Номер телефона
              </FormLabel>
              <TextField
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register('phone', {
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
            <div className="w-full sm:pl-4">
              <FormLabel focused={false} required>
                E-mail
              </FormLabel>
              <TextField
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email', {
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
        </Paper>

        <Paper className="mb-10 w-full p-4" elevation={3}>
          <h3 className="mb-4 text-2xl leading-none">
            Способ получения заказа
          </h3>

          <FormControl component="fieldset">
            <FormLabel focused={false} required>
              Почтовая компания
            </FormLabel>
            <Controller
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  onChange={handleDeliveryCompanyChange}
                >
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label={`${DeliveryCompanies.CDEK}`}
                    value={DeliveryCompaniesIds.CDEK}
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label={`${DeliveryCompanies.KAZPOST} (Казахстан)`}
                    value={DeliveryCompaniesIds.KAZPOST}
                  />
                </RadioGroup>
              )}
              control={control}
              name="deliveryCompany"
              defaultValue={DeliveryCompaniesIds.CDEK}
              rules={{ required: true }}
            />
          </FormControl>

          <div className="py-4">
            {isCDEKCompanySelected ? (
              <CDEKDeliveryForm />
            ) : (
              <KazPostDeliveryForm />
            )}
            {deliveryErrorText && (
              <div className="text-lg text-red-600">{deliveryErrorText}</div>
            )}
          </div>

          {deliveryPriceLoading ? (
            <div className="flex w-full justify-center py-4 sm:w-1/2">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <>
              {canRenderDeliveryInfo && (
                <div className="py-4">
                  <p>
                    <>
                      до {zipCode}, г. {(city as ICDEKCityItem)?.city},{' '}
                      {address} - {deliveryPriceKzt} {CurrencySymbols.KZT}
                    </>
                  </p>
                  {isCDEKCompanySelected && (
                    <p>
                      (приблизительное время в пути от {deliveryPeriodMin} - до{' '}
                      {deliveryPeriodMax} дня/дней)
                    </p>
                  )}
                </div>
              )}
              {canRenderDeliveryInfo && (
                <div className="py-4 text-xl font-semibold">
                  Итого с учетом доставки: {TotalText}
                </div>
              )}
            </>
          )}
        </Paper>

        <Paper className="mb-10 w-full p-4" elevation={3}>
          <h3 className="mb-4 text-2xl leading-none">Оплата</h3>
          <div className="flex w-full flex-col justify-between sm:flex-row">
            <FormControl component="fieldset">
              <FormLabel focused={false} required>
                Способ оплаты
              </FormLabel>
              <FormControlLabel
                control={<Radio color="primary" checked />}
                label="Онлайн на сайте"
              />
            </FormControl>

            <div className="flex w-full flex-col items-center leading-none sm:w-1/2">
              <p className="mb-2">Мы принимаем платежи с карт:</p>
              <img
                alt="Visa, Mastercard, МИР"
                src="/images/cards.png"
                style={{ width: '300px' }}
              />
              <p className="text-center leading-5 text-red-900">
                Оплата картами российских банков доступна только с помощью
                платежной системы МИР
              </p>
            </div>
          </div>
        </Paper>

        <div className="w-full">
          <div className="w-full">
            <p className="my-4 text-lg text-red-900">
              Сумма оплачивается в валюте KZT (Казахстанский тенге).
            </p>

            <div className="my-6 rounded-b border-t-4 border-green-500 bg-green-100 px-4 py-3 text-lg text-green-900 shadow-md">
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="mr-4 h-6 w-6 fill-current text-teal-500"
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
          </div>
          <div className="flex justify-center py-4">
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
              >
                Оплатить
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
export default CheckoutPage;
