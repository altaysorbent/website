import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormLabel, TextField } from '@material-ui/core';

const kazPostDeliveryForm = (): JSX.Element => {
  const { register, errors } = useFormContext();

  return (
    <>
      <div className="flex flex-wrap mb-6">
        <div className="w-full md:w-2/3 md:pr-3 mb-6 md:mb-0">
          <FormLabel focused={false} required>
            Населённый пункт
          </FormLabel>
          <TextField
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
          <FormLabel focused={false} required>
            Почтовый индекс
          </FormLabel>
          <TextField
            error={!!errors?.zip}
            helperText={errors?.zip?.message}
            inputRef={register({
              required: 'Обязательно укажите индекс',
            })}
            name="zip"
            placeholder="F02D8D5 или 070018"
            size="small"
            variant="outlined"
            fullWidth
          />
        </div>
      </div>
      <div className="w-full">
        <FormLabel focused={false} required>
          Адрес получателя
        </FormLabel>
        <TextField
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
