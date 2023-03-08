import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import { getDeliveryPrice } from 'services/altayApi';
import { DeliveryCompaniesIds } from 'constants/Product';

interface IState {
  deliveryPriceKzt: number;
  deliveryPriceRub: number;
  deliveryPeriodMin: number;
  deliveryPeriodMax: number;
  deliveryErrorText: null | string;
  loading: boolean;
}
interface IProps {
  cityUid: number;
  deliveryType: string;
  senderCityId: string;
  zip: string;
  count: number;
}
export const useCDEKDeliveryPrice = ({
  cityUid,
  deliveryType,
  senderCityId,
  zip,
  count,
}: IProps): IState => {
  const initialState: IState = {
    deliveryPriceKzt: 0,
    deliveryPriceRub: 0,
    deliveryPeriodMin: 0,
    deliveryPeriodMax: 0,
    deliveryErrorText: null,
    loading: false,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (cityUid && deliveryType && senderCityId && zip) {
      setState((state) => ({
        ...state,
        deliveryErrorText: null,
        loading: true,
      }));
      getDeliveryPrice({
        senderCityId,
        receiverCityId: cityUid,
        quantity: count,
        tariffId: deliveryType,
        deliveryCompany: DeliveryCompaniesIds.CDEK,
      })
        .then(({ data }: AxiosResponse) => {
          const { result, error } = data;
          if (result) {
            setState({
              deliveryPriceKzt: Math.ceil(result.priceByCurrency),
              deliveryPriceRub: Math.ceil(result.price),
              deliveryPeriodMax: result.deliveryPeriodMax,
              deliveryPeriodMin: result.deliveryPeriodMin,
              deliveryErrorText: null,
              loading: false,
            });
          }
          if (error) {
            const text = error?.[0]?.text;
            if (text) {
              throw new Error(text);
            } else {
              throw new Error(
                'Ошибка при расчете доставки, пожалуйста попробуйте позже'
              );
            }
          }
        })
        .catch(({ message }) =>
          setState({
            ...initialState,
            deliveryErrorText: message,
            loading: false,
          })
        );
    } else {
      setState(initialState);
    }
  }, [cityUid, deliveryType, senderCityId, zip, count]);

  return state;
};
