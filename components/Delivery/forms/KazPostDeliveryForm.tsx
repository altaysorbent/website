import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

function KazPostDeliveryForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="mb-6 flex flex-wrap">
        <div className="mb-6 w-full md:mb-0 md:w-2/3 md:pr-3">
          <FormLabel focused={false} required>
            Населённый пункт
          </FormLabel>
          <TextField
            error={!!errors?.city}
            helperText={errors?.city?.message as string}
            {...register('city', {
              required: 'Обязательно укажите населенный пункт',
            })}
            name="city"
            placeholder="г. Усть-Каменогорск"
            size="small"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="w-full md:w-1/3">
          <FormLabel focused={false} required>
            Почтовый индекс
          </FormLabel>
          <TextField
            error={!!errors?.zip}
            helperText={errors?.zip?.message as string}
            {...register('zip', {
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
          helperText={errors?.address?.message as string}
          {...register('address', {
            required: 'Обязательно укажите адрес',
          })}
          name="address"
          placeholder="пр. Назарбаева 28, кв 90"
          size="small"
          variant="outlined"
          fullWidth
        />
        <p className="mt-4 text-red-900">
          Доставка осуществляется в районное почтовое отделение
        </p>
      </div>
    </>
  );
}

export default KazPostDeliveryForm;
