import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import { calculateDeliveryPrice } from '@/lib/services/altayApi';
import { DeliveryCompaniesIds } from '@/lib/constants/Product';

interface IState {
  deliveryPriceKzt: number;
  deliveryPeriodMin: number;
  deliveryPeriodMax: number;
  deliveryErrorText: null | string;
  loading: boolean;
}
interface IProps {
  cityCode?: string;
  deliveryType: number;
  senderCityId: number;
  zip?: string | null;
  count: number;
  address?: string;
}
export const useCDEKDeliveryPrice = ({
  cityCode,
  deliveryType,
  senderCityId,
  zip,
  count,
  address,
}: IProps): IState => {
  const initialState: IState = {
    deliveryPriceKzt: 0,
    deliveryPeriodMin: 0,
    deliveryPeriodMax: 0,
    deliveryErrorText: null,
    loading: false,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (cityCode && deliveryType && senderCityId && zip) {
      setState((state) => ({
        ...state,
        deliveryErrorText: null,
        loading: true,
      }));
      calculateDeliveryPrice({
        senderCityId,
        receiverCityId: cityCode,
        quantity: count,
        tariffId: deliveryType,
        deliveryCompany: DeliveryCompaniesIds.CDEK,
        zip,
        address,
      })
        .then(({ data }: AxiosResponse) => {
          if (data) {
            setState({
              deliveryPriceKzt: Math.ceil(data.total_sum),
              deliveryPeriodMax: data.calendar_max,
              deliveryPeriodMin: data.calendar_min,
              deliveryErrorText: null,
              loading: false,
            });
          }
        })
        .catch((err) => {
          // debugger;
          console.log(2222, err?.response);
          const message =
            err?.response?.data?.errors?.[0]?.message ?? err.message;
          setState({
            ...initialState,
            deliveryErrorText: message,
            loading: false,
          });
        });
    } else {
      setState(initialState);
    }
  }, [cityCode, deliveryType, senderCityId, zip, count]);

  return state;
};
