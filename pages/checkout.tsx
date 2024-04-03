import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';

import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';

import {
  CurrencySymbols,
  defaultProductId,
  DeliveryCompanies,
  DeliveryCompaniesIds,
  DeliveryTypes,
  maximumAvailableCount,
  minimumAvailableCount,
  productName,
  SenderCityIds,
} from 'constants/Product';

import MaximumAmountNotice from 'components/delivery/MaximumAmountNotice';
import CDEKDeliveryForm from 'components/delivery/forms/CDEKDeliveryForm';
import KazPostDeliveryForm from 'components/delivery/forms/KazPostDeliveryForm';
import { useDeliveryPrice } from 'hooks/useDeliveryPrice';
import { useProductPrice } from 'hooks/useProductPrice';
import OrderLayout from 'layouts/Order';

import { ICDEKCityItem } from 'interfaces/CdekCityItem.interface';
import { IOrderForm } from 'interfaces/OrderForm.interface';

import { createOrder } from 'services/altayApi';

const CheckoutPage = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<IOrderForm>({
    defaultValues: {
      count: 1,
      deliveryCompany: DeliveryCompaniesIds.CDEK,
      zip: null,
      address: null,
      deliveryType: DeliveryTypes.DELIVERY,
      senderCityId: SenderCityIds.SPB,
      city: null,
      promoCode: null,
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

  const count = Number(watch('count'));

  const {
    deliveryCompany,
    deliveryType,
    senderCityId,
    zip: zipCode,
    address,
    city,
    promoCode,
  } = watch([
    'deliveryCompany',
    'deliveryType',
    'senderCityId',
    'zip',
    'address',
    'city',
    'promoCode',
  ]);

  const customerData = watch(['name', 'email', 'phone']);

  const isCDEKCompanySelected = deliveryCompany === DeliveryCompaniesIds.CDEK;

  const [loading, setLoading] = useState(false);

  const {
    deliveryPriceKzt,
    deliveryPeriodMin,
    deliveryPeriodMax,
    deliveryErrorText,
    loading: deliveryPriceLoading,
  } = useDeliveryPrice({
    cityUid: (city as ICDEKCityItem)?.uid,
    deliveryType,
    senderCityId,
    zip: zipCode,
    count,
    isCDEKCompanySelected,
  });

  useEffect(() => {
    if (deliveryErrorText) {
      enqueueSnackbar(deliveryErrorText, {
        variant: 'error',
        persist: true,
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

  const TotalText = canRenderDeliveryInfo ? (
    <>
      {totalSumKzt} {CurrencySymbols.KZT}
    </>
  ) : (
    '-'
  );

  return (
    <OrderLayout title="Оформление заказа">
      <FormProvider {...methods}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Paper className="w-full mb-10 py-10 px-2 sm:px-6" elevation={3}>
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/4 mb-0 sm:mb-4 pr-0 sm:pr-4">
                <img
                  alt="Алтайсорбент"
                  className="mx-auto sm:mx-0 border"
                  src="/images/altaysorbent.jpg"
                  style={{
                    maxHeight: '155px',
                    width: 'auto',
                  }}
                />
              </div>
              <div className="w-full sm:w-3/4">
                <div className="flex flex-wrap sm:flex-nowrap justify-between mb-4">
                  <div className="w-full sm:w-auto text-xl font-semibold text-center my-4 sm:my-0">
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
                        render={({ value, onChange }) => (
                          <TextField
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

                <div className="pt-4 flex justify-between border-t items-end">
                  <div className="w-full">
                    <div className="flex flex-row">
                      <div className="flex w-full justify-end items-center">
                        {count} × {productPriceKzt} {CurrencySymbols.KZT} ={' '}
                        {productSumKzt}
                        {CurrencySymbols.KZT}
                      </div>
                    </div>

                    <div className="text-xl mt-4 flex flex-col text-left sm:text-right sm:flex-row sm:justify-end">
                      Итого (без учета доставки)
                      <span className="sm:ml-4 font-semibold w-1/2 sm:w-1/3">
                        {productSumKzt} {CurrencySymbols.KZT}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-4">
              <MaximumAmountNotice className="text-lg" />
            </div>
          </Paper>
          <Paper className="w-full mb-10 p-4" elevation={3}>
            <h3 className="text-2xl leading-none mb-4">Ваши данные</h3>
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:pr-4">
                <FormLabel focused={false} required>
                  Ф.И.О.
                </FormLabel>
                <TextField
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  inputRef={register({
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
              <div className="w-full sm:pl-4">
                <FormLabel focused={false} required>
                  E-mail
                </FormLabel>
                <TextField
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
          </Paper>

          <Paper className="w-full mb-10 p-4" elevation={3}>
            <h3 className="text-2xl leading-none mb-4">
              Способ получения заказа
            </h3>

            <FormControl component="fieldset">
              <FormLabel focused={false} required>
                Почтовая компания
              </FormLabel>
              <Controller
                as={
                  <RadioGroup row>
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label={`${DeliveryCompanies.CDEK} (Россия и страны СНГ)`}
                      value={DeliveryCompaniesIds.CDEK}
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label={`${DeliveryCompanies.KAZPOST} (Казахстан)`}
                      value={DeliveryCompaniesIds.KAZPOST}
                    />
                  </RadioGroup>
                }
                control={control}
                name="deliveryCompany"
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
                <div className="text-red-600 text-lg">{deliveryErrorText}</div>
              )}
            </div>

            {deliveryPriceLoading ? (
              <div className="w-full sm:w-1/2 py-4 flex justify-center">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <>
                {canRenderDeliveryInfo && (
                  <div className="py-4">
                    <p>
                      до {zipCode}, г.
                      {(city as ICDEKCityItem)?.name || city}, {address} -{' '}
                      {deliveryPriceKzt}
                      {CurrencySymbols.KZT}
                    </p>
                    {isCDEKCompanySelected && (
                      <p>
                        (приблизительное время в пути от {deliveryPeriodMin} -
                        до {deliveryPeriodMax} дня/дней)
                      </p>
                    )}
                  </div>
                )}
                {canRenderDeliveryInfo && (
                  <div className="py-4 font-semibold text-xl">
                    Итого с учетом доставки: {TotalText}
                  </div>
                )}
              </>
            )}
          </Paper>

          <Paper className="w-full mb-10 p-4" elevation={3}>
            <h3 className="text-2xl leading-none mb-4">Оплата</h3>
            <div className="w-full flex flex-col sm:flex-row justify-between">
              <FormControl component="fieldset">
                <FormLabel focused={false} required>
                  Способ оплаты
                </FormLabel>
                <FormControlLabel
                  control={<Radio color="primary" checked />}
                  label="Онлайн на сайте"
                />
              </FormControl>

              <div className="leading-none w-full sm:w-1/2 flex flex-col items-center">
                <p className="mb-2">Мы принимаем платежи с карт:</p>
                <img
                  alt="Visa, Mastercard, МИР"
                  src="/images/cards.png"
                  style={{ width: '300px' }}
                />
                <p className="text-red-900 leading-5 text-center">
                  Оплата картами российских банков доступна только с помощью
                  платежной системы МИР
                </p>
              </div>
            </div>
          </Paper>

          <div className="w-full">
            <div className="w-full">
              <p className="text-red-900 my-4 text-lg">
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
            </div>
            <div className="py-4 flex justify-center">
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
    </OrderLayout>
  );
};
export default CheckoutPage;
