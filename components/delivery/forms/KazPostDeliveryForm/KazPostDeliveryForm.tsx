import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@material-ui/core';

import styles from './KazPostDeliveryForm.module.scss';

const kazPostDeliveryForm = (): JSX.Element => {
  const { register, errors } = useFormContext();

  return (
    <>
      <div className="flex flex-wrap mb-6">
        <div className="w-full md:w-2/3 md:pr-3 mb-6 md:mb-0">
          <label className="block text-gray-800" htmlFor="grid-delivery-city">
            Населённый пункт
          </label>
          <TextField
            className={styles.textField}
            error={!!errors?.city}
            helperText={errors?.city?.message}
            inputRef={register({
              required: 'Обязательно укажите населенный пункт',
            })}
            name="city"
            placeholder="г. Усть-Каменогорск"
            size="small"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="w-full md:w-1/3 ">
          <label className="block text-gray-800" htmlFor="grid-delivery-zip">
            Почтовый индекс
          </label>
          <TextField
            className={styles.textField}
            error={!!errors?.zip}
            helperText={errors?.zip?.message}
            inputRef={register({
              required: 'Обязательно укажите индекс',
            })}
            name="zip"
            placeholder="F02D8D5 или 070004"
            size="small"
            variant="outlined"
            fullWidth
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
          placeholder="пр. Назарбаева 28, кв 90"
          size="small"
          variant="outlined"
          fullWidth
        />
        <p className="text-red-900 mt-4">
          Доставка осуществляется в районное почтовое отделение
        </p>
      </div>
    </>
  );
};

export default kazPostDeliveryForm;
