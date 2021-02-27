import React from 'react';

import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  TextField: {
    backgroundColor: '#fff',
  },
}));

const KazPostDeliveryForm = ({
  destinationCity,
  onDestinationCityChange,
  destinationZipCode,
  onDestinationZipCodeChange,
  onDestinationAddressChange,
  destinationAddress,
}): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <div className="flex flex-wrap mb-6">
        <div className="w-full md:w-2/3 md:pr-3 mb-6 md:mb-0">
          <label className="block text-gray-800" htmlFor="grid-delivery-city">
            Населённый пункт
          </label>
          <TextField
            onChange={onDestinationCityChange}
            placeholder="г. Усть-Каменогорск"
            className={classes.TextField}
            value={destinationCity}
            variant="outlined"
            fullWidth
            size="small"
          />
        </div>
        <div className="w-full md:w-1/3 ">
          <label className="block text-gray-800" htmlFor="grid-delivery-zip">
            Почтовый индекс
          </label>
          <TextField
            onChange={onDestinationZipCodeChange}
            placeholder="F02D8D5 или 070004"
            className={classes.TextField}
            value={destinationZipCode}
            variant="outlined"
            fullWidth
            size="small"
          />
        </div>
      </div>
      <div className="w-full mb-6">
        <label className="block text-gray-800" htmlFor="grid-delivery-address">
          Адрес получателя
        </label>
        <TextField
          onChange={onDestinationAddressChange}
          placeholder="пр. Назарбаева 28, кв 90"
          className={classes.TextField}
          value={destinationAddress}
          variant="outlined"
          fullWidth
          size="small"
        />
        <p className="text-red-900 mt-4">
          Доставка осуществляется в районное почтовое отделение
        </p>
      </div>
    </>
  );
};

export default KazPostDeliveryForm;
