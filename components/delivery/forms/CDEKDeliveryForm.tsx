import React, { useEffect, useState } from 'react';
import { useFormContext, Controller, FieldError } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { DeliveryTypes, SenderCityIds } from 'constants/Product';
import { ICDEKCityItem } from 'interfaces/CdekCityItem.interface';
import { IOrderForm } from 'interfaces/OrderForm.interface';

import { fetchCityList } from 'services/cdekApi';

interface CityOption {
  label: string;
}

interface ICDEKForm extends IOrderForm {
  city: ICDEKCityItem;
}

const CDEKDeliveryForm = (): JSX.Element => {
  const {
    register,
    errors,
    control,
    watch,
    setValue,
  } = useFormContext<ICDEKForm>();

  const { enqueueSnackbar } = useSnackbar();

  const { city, zip } = watch(['city', 'zip']) || {};

  const zipcodes = city?.zipcodes || [];

  const [cities, setCities] = useState<CityOption[]>([]);

  const onDestinationCitiesFetch = (event, value) => {
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

  useEffect(() => {
    if (zip && zipcodes.some((zipcode) => zipcode === zip) === false) {
      setValue('zip', null);
    }
  }, [zipcodes, zip]);

  return (
    <>
      <div className="w-full mb-4">
        <FormControl component="fieldset">
          <FormLabel focused={false} required>
            Склад отправления (влияет на стоимость доставки)
          </FormLabel>
          <Controller
            as={
              <RadioGroup row>
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Санкт-Петербург"
                  value={SenderCityIds.SPB}
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Усть-Каменогорск"
                  value={SenderCityIds.UKG}
                />
              </RadioGroup>
            }
            control={control}
            defaultValue={SenderCityIds.SPB}
            name="senderCityId"
            rules={{ required: true }}
          />
        </FormControl>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-2/3 md:pr-3 mb-6 md:mb-0">
          <FormLabel focused={false} required>
            Населённый пункт
          </FormLabel>
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
                    error={!!errors?.city}
                    helperText={(errors?.city as FieldError)?.message}
                    variant="outlined"
                  />
                )}
                size="small"
                value={city || null}
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
          <FormLabel focused={false} required>
            Почтовый индекс
          </FormLabel>
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
      <div className="w-full mb-4">
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
          placeholder="Московский проспект д.5, кв 90"
          size="small"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="w-full">
        <FormControl component="fieldset">
          <FormLabel focused={false} required>
            Способ доставки
          </FormLabel>
          <Controller
            as={
              <RadioGroup row>
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Доставка до квартиры"
                  value={DeliveryTypes.DELIVERY}
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Самовывоз со склада"
                  value={DeliveryTypes.WAREHOUSE}
                />
              </RadioGroup>
            }
            control={control}
            defaultValue={DeliveryTypes.DELIVERY}
            name="deliveryType"
            rules={{ required: true }}
          />
        </FormControl>
      </div>
    </>
  );
};

export default CDEKDeliveryForm;
