import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormContext, Controller, FieldError } from 'react-hook-form';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { DELIVERY_TYPES, SENDER_CITY_IDS } from 'constants/Product';
import styles from './CDEKDeliveryForm.module.scss';
import { getDeliveryPrice } from 'services/altayApi';
import { AxiosResponse } from 'axios';
import { ICDEKCityItem } from 'interfaces/CdekCityItem.interface';
import { IBuyForm } from 'interfaces/BuyForm.interface';

interface Props {
  cities: CityOption[];
  count: number;
  onDeliveryPriceKztChange: Dispatch<SetStateAction<number>>;
  onDeliveryPriceRubChange: Dispatch<SetStateAction<number>>;
  onDeliveryPeriodMinChange: Dispatch<SetStateAction<number>>;
  onDeliveryPeriodMaxChange: Dispatch<SetStateAction<number>>;
  onDestinationCitiesFetch: (e: React.ChangeEvent, value: string) => void;
  onError: (message: string) => void;
}

interface CityOption {
  label: string;
}

interface ICDEKForm extends IBuyForm {
  city: ICDEKCityItem;
}

const CDEKDeliveryForm = ({
  cities,
  count,
  onDeliveryPriceKztChange,
  onDeliveryPriceRubChange,
  onDeliveryPeriodMinChange,
  onDeliveryPeriodMaxChange,
  onError,
  onDestinationCitiesFetch,
}: Props): JSX.Element => {
  const {
    register,
    errors,
    control,
    watch,
    setError,
    clearErrors,
    setValue,
  } = useFormContext<ICDEKForm>();

  const { deliveryType, senderCityId, city, zip } =
    watch(['deliveryType', 'senderCityId', 'city', 'zip']) || {};

  const uid = city?.uid || null;
  const zipcodes = city?.zipcodes || [];

  useEffect(() => {
    if (!city && zip) {
      setValue('zip', null);
    }
  }, [city, zip]);

  useEffect(() => {
    if (uid && deliveryType && senderCityId && zip) {
      clearErrors('deliveryError');
      getDeliveryPrice({
        senderCityId,
        receiverCityId: uid,
        quantity: count,
        tariffId: deliveryType,
      })
        .then(({ data }: AxiosResponse) => {
          const { result, error } = data;
          if (result) {
            onDeliveryPriceKztChange(Math.ceil(result.priceByCurrency));
            onDeliveryPriceRubChange(Math.ceil(result.price));

            onDeliveryPeriodMinChange(result.deliveryPeriodMin);
            onDeliveryPeriodMaxChange(result.deliveryPeriodMax);
          }
          if (error) {
            const text = error?.[0]?.text;
            if (text) {
              setError('deliveryError', {
                type: 'manual',
                message: text,
              });
              throw new Error(text);
            } else {
              throw new Error(
                'Ошибка при расчете доставки, пожалуйста попробуйте позже'
              );
            }
          }
        })
        .catch(({ message }) => onError(message));
    }
  }, [uid, deliveryType, senderCityId, zip, count]);

  return (
    <>
      <div className="w-full mb-4">
        <FormControl component="fieldset">
          <FormLabel className={styles.radioGroupLabel} focused={false}>
            Склад отправления (влияет на стоимость доставки)
          </FormLabel>
          <Controller
            as={
              <RadioGroup row>
                <FormControlLabel
                  className={styles.controlLabel}
                  control={<Radio className={styles.radio} color="primary" />}
                  label="Санкт-Петербург"
                  value={SENDER_CITY_IDS.SPB}
                />
                <FormControlLabel
                  className={styles.controlLabel}
                  control={<Radio className={styles.radio} color="primary" />}
                  label="Усть-Каменогорск"
                  value={SENDER_CITY_IDS.UKG}
                />
              </RadioGroup>
            }
            control={control}
            defaultValue={SENDER_CITY_IDS.SPB}
            name="senderCityId"
            rules={{ required: true }}
          />
        </FormControl>
      </div>

      <div className="flex flex-wrap mb-6">
        <div className="w-full md:w-2/3 md:pr-3 mb-6 md:mb-0">
          <label className="block text-gray-800" htmlFor="grid-delivery-city">
            Населённый пункт
          </label>

          <Controller
            control={control}
            name="city"
            render={({ onChange }) => (
              <Autocomplete
                getOptionLabel={(option) => option.label || ''}
                noOptionsText="Введите первые буквы города"
                options={cities}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={styles.textField}
                    error={!!errors?.city}
                    helperText={(errors?.city as FieldError)?.message}
                    variant="outlined"
                  />
                )}
                size="small"
                autoComplete
                autoHighlight
                autoSelect
                onChange={(event, data) => onChange(data)}
                onInputChange={onDestinationCitiesFetch}
              />
            )}
            rules={{
              required: 'Укажите город',
            }}
          />
        </div>
        <div className="w-full md:w-1/3 ">
          <label className="block text-gray-800" htmlFor="grid-delivery-zip">
            Почтовый индекс
          </label>
          <Controller
            control={control}
            name="zip"
            render={({ onChange }) => (
              <Autocomplete
                getOptionLabel={(option) => option || ''}
                noOptionsText={
                  zipcodes?.length > 0
                    ? 'Выберите значение из списка'
                    : 'Сначала укажите город'
                }
                options={zipcodes}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={styles.textField}
                    error={!!errors?.zip}
                    helperText={errors?.zip?.message}
                    variant="outlined"
                  />
                )}
                size="small"
                value={zip || null}
                onChange={(event, data) => onChange(data)}
              />
            )}
            rules={{
              required: 'Выберите индекс',
            }}
          />
        </div>
      </div>
      <div className="w-full mb-6">
        <label className="block text-gray-800" htmlFor="grid-delivery-address">
          Адрес получателя
        </label>
        <TextField
          className={styles.textField}
          error={!!errors?.address}
          helperText={errors?.address?.message}
          inputRef={register({
            required: 'Обязательно укажите адрес',
          })}
          name="address"
          placeholder="Московский проспект д.5, кв 90"
          size="small"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="w-full">
        <FormControl component="fieldset">
          <FormLabel className={styles.radioGroupLabel} focused={false}>
            Способ доставки
          </FormLabel>
          <Controller
            as={
              <RadioGroup row>
                <FormControlLabel
                  className={styles.controlLabel}
                  control={<Radio className={styles.radio} color="primary" />}
                  label="Доставка до квартиры"
                  value={DELIVERY_TYPES.DELIVERY}
                />
                <FormControlLabel
                  className={styles.controlLabel}
                  control={<Radio className={styles.radio} color="primary" />}
                  label="Самовывоз со склада"
                  value={DELIVERY_TYPES.WAREHOUSE}
                />
              </RadioGroup>
            }
            control={control}
            defaultValue={DELIVERY_TYPES.DELIVERY}
            name="deliveryType"
            rules={{ required: true }}
          />
        </FormControl>
      </div>
    </>
  );
};

export default CDEKDeliveryForm;
