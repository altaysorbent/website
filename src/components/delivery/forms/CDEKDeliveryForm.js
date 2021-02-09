import React from 'react';

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { DELIVERY_TYPES, SENDER_CITY_IDS } from '../../../constants/product';

const useStyles = makeStyles(theme => ({
  Radio: {
    padding: '5px',
  },
  ControlLabel: {
    marginLeft: '-7px',
  },
  RadioGroupLabel: {
    marginBottom: '10px',
  },
  TextField: {
    backgroundColor: '#fff',
  },
}));

const CDEKDeliveryForm = ({
  senderCity,
  onSenderCityChange,
  cities,
  onDestinationCityChange,
  destinationCity,
  onDestinationCitiesFetch,
  destinationZipCode,
  zipCodes,
  onDestinationZipCodeChange,
  destinationAddress,
  onDestinationAddressChange,
  deliveryType,
  onDeliveryTypeChange,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className="w-full mb-4">
        <FormControl component="fieldset">
          <FormLabel focused={false} className={classes.RadioGroupLabel}>
            Склад отправления (влияет на стоимость доставки)
          </FormLabel>
          <RadioGroup row name="senderCityId" value={senderCity} onChange={onSenderCityChange}>
            <FormControlLabel
              value={SENDER_CITY_IDS.SPB}
              className={classes.ControlLabel}
              control={<Radio color="primary" className={classes.Radio} />}
              label="Санкт-Петербург"
            />
            <FormControlLabel
              value={SENDER_CITY_IDS.UKG}
              className={classes.ControlLabel}
              control={<Radio color="primary" className={classes.Radio} />}
              label="Усть-Каменогорск"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="flex flex-wrap mb-6">
        <div className="w-full md:w-2/3 md:pr-3 mb-6 md:mb-0">
          <label className="block text-gray-800" htmlFor="grid-delivery-city">
            Населённый пункт
          </label>

          <Autocomplete
            options={cities}
            getOptionLabel={option => option.label || ''}
            value={destinationCity}
            renderInput={params => <TextField {...params} variant="outlined" className={classes.TextField} />}
            onChange={onDestinationCityChange}
            onInputChange={onDestinationCitiesFetch}
            size="small"
            noOptionsText="Введите первые буквы города"
            autoHighlight
            autoSelect
            autoComplete
          />
        </div>
        <div className="w-full md:w-1/3 ">
          <label className="block text-gray-800" htmlFor="grid-delivery-zip">
            Почтовый индекс
          </label>

          <Autocomplete
            options={zipCodes}
            getOptionLabel={option => option || ''}
            value={destinationZipCode}
            renderInput={params => <TextField {...params} variant="outlined" className={classes.TextField} />}
            onChange={onDestinationZipCodeChange}
            size="small"
            noOptionsText={senderCity ? 'Выберите значение из списка' : 'Сначала укажите город'}
          />
        </div>
      </div>
      <div className="w-full mb-6">
        <label className="block text-gray-800" htmlFor="grid-delivery-address">
          Адрес получателя
        </label>
        <TextField
          onChange={onDestinationAddressChange}
          placeholder="Московский проспект д.5, кв 90"
          className={classes.TextField}
          value={destinationAddress}
          variant="outlined"
          fullWidth
          size="small"
        />
      </div>
      <div className="w-full">
        <FormControl component="fieldset">
          <FormLabel focused={false} className={classes.RadioGroupLabel}>
            Способ доставки
          </FormLabel>
          <RadioGroup row name="deliveryType" value={deliveryType} onChange={onDeliveryTypeChange}>
            <FormControlLabel
              value={DELIVERY_TYPES.DELIVERY}
              className={classes.ControlLabel}
              control={<Radio color="primary" className={classes.Radio} />}
              label="Доставка до квартиры"
            />
            <FormControlLabel
              value={DELIVERY_TYPES.WAREHOUSE}
              className={classes.ControlLabel}
              control={<Radio color="primary" className={classes.Radio} />}
              label="Самовывоз со склада"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};

export default CDEKDeliveryForm;
