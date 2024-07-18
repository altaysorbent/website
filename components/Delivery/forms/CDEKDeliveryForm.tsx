import React, { useEffect, useState } from 'react';
import { useFormContext, Controller, FieldError } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { CountryIds, DeliveryTypes } from '@/lib/constants/Product';
import { ICDEKCityItem } from '@/lib/interfaces/CdekCityItem.interface';
import { IOrderForm } from '@/lib/interfaces/OrderForm.interface';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getCities, getCityPostCodes } from '@/lib/services/altayApi';
import ListboxComponent from '@/components/VirtualizedAutocomplete/Listbox';

interface CityOption {
  label: string;
}

interface ICDEKForm extends IOrderForm {
  city: ICDEKCityItem;
}

const CDEKDeliveryForm = (): React.JSX.Element => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useFormContext<ICDEKForm>();

  const { enqueueSnackbar } = useSnackbar();

  const [city, zip, country] = watch(['city', 'zip', 'country']);

  const [zipcodes, setZipCodes] = useState([]);

  const [cities, setCities] = useState<CityOption[]>([]);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [isZipLoading, setIsZipLoading] = useState(false);

  function handleCityChange(_, city) {
    setValue('city', city);
  }
  function handleZipChange(_, zip) {
    setValue('zip', zip);
  }

  function handleDeliveryTypeChange(_, deliveryType) {
    setValue('deliveryType', +deliveryType);
  }
  // @todo code duplication
  useEffect(() => {
    setCities([]);
    setValue('city', null);
    setValue('zip', null);
    setZipCodes([]);
    setIsCitiesLoading(true);
    getCities(country)
      .then(({ data }) => {
        setCities(data);
      })
      .finally(() => {
        setIsCitiesLoading(false);
      });
  }, [country]);

  // @todo code duplication
  useEffect(() => {
    setZipCodes([]);
    setValue('zip', null);
    if (city) {
      setIsZipLoading(true);
      getCityPostCodes(city.code)
        .then(({ data }) => {
          setZipCodes(data.postal_codes);
        })
        .finally(() => {
          setIsZipLoading(false);
        });
    }
  }, [city]);

  useEffect(() => {
    if (zip && !zipcodes.some((zipcode) => zipcode === zip)) {
      setValue('zip', null);
    }
  }, [zipcodes, zip]);

  return (
    <>
      <div className="mb-4 w-full">
        <FormControl component="fieldset" fullWidth>
          <FormLabel focused={false} required>
            Страна
          </FormLabel>
          <div className="flex w-full items-center">
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  value={country}
                  size="small"
                  classes={{
                    root: 'w-full',
                  }}
                >
                  <MenuItem value={CountryIds.KZ}>Казахстан</MenuItem>
                  <MenuItem value={CountryIds.RU}>Россия</MenuItem>
                </Select>
              )}
              control={control}
              defaultValue={CountryIds.RU}
              name="country"
              rules={{ required: true }}
            />
          </div>
        </FormControl>
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="mb-6 w-full md:mb-0 md:w-2/3 md:pr-3">
          <FormLabel focused={false} required>
            Населённый пункт
          </FormLabel>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Autocomplete
                loading={isCitiesLoading}
                loadingText="Загружаем данные"
                getOptionLabel={(option) => option.city || ''}
                getOptionKey={(option) => option.code}
                noOptionsText="Введите первые буквы города"
                options={cities}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    error={!!errors?.city}
                    helperText={(errors?.city as FieldError)?.message}
                  />
                )}
                disableListWrap
                ListboxComponent={
                  ListboxComponent as React.ComponentType<
                    React.HTMLAttributes<HTMLElement>
                  >
                }
                isOptionEqualToValue={(option, value) => {
                  return option.code === value.code;
                }}
                size="small"
                autoComplete
                autoHighlight
                autoSelect
                value={city}
                onChange={handleCityChange}
              />
            )}
            rules={{
              required: 'Укажите город',
            }}
          />
        </div>
        <div className="w-full md:w-1/3">
          <FormLabel focused={false} required>
            Почтовый индекс
          </FormLabel>
          <Controller
            control={control}
            name="zip"
            render={({ field }) => (
              <Autocomplete
                {...field}
                loading={isZipLoading}
                loadingText="Загружаем данные"
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
                disableListWrap
                ListboxComponent={
                  ListboxComponent as React.ComponentType<
                    React.HTMLAttributes<HTMLElement>
                  >
                }
                size="small"
                value={zip || null}
                onChange={handleZipChange}
              />
            )}
            rules={{
              required: 'Выберите индекс',
            }}
          />
        </div>
      </div>
      <div className="mb-4 w-full">
        <FormLabel focused={false} required>
          Адрес получателя
        </FormLabel>
        <TextField
          error={!!errors?.address}
          helperText={errors?.address?.message}
          {...register('address', {
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
            render={({ field }) => (
              <RadioGroup
                row
                defaultValue={DeliveryTypes.DELIVERY}
                onChange={handleDeliveryTypeChange}
                value={field.value}
              >
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
            )}
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
