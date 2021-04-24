import { useKazPostDeliveryPrice } from './useKazPostDeliveryPrice';
import { useCDEKDeliveryPrice } from './useCDEKDeliveryPrice';

interface IProps {
  count: number;
  cityUid: number;
  deliveryType: string;
  senderCityId: string;
  zip: string;
  isCDEKCompanySelected: boolean;
}

interface IState {
  deliveryPriceKzt: number;
  deliveryPriceRub: number;
  deliveryPeriodMin: number;
  deliveryPeriodMax: number;
  deliveryErrorText: null | string;
  loading: boolean;
}

export const useDeliveryPrice = (props: IProps): IState => {
  const {
    count,
    cityUid,
    deliveryType,
    senderCityId,
    zip,
    isCDEKCompanySelected,
  } = props;

  const [kazPostPriceKzt, kazPostPriceRub] = useKazPostDeliveryPrice(count);

  const {
    deliveryPriceKzt: CDEKPriceKzt,
    deliveryPriceRub: CDEKPriceRub,
    deliveryPeriodMin,
    deliveryPeriodMax,
    deliveryErrorText,
    loading,
  } = useCDEKDeliveryPrice({ cityUid, deliveryType, senderCityId, zip, count });

  return {
    deliveryPriceKzt: isCDEKCompanySelected ? CDEKPriceKzt : kazPostPriceKzt,
    deliveryPriceRub: isCDEKCompanySelected ? CDEKPriceRub : kazPostPriceRub,
    deliveryPeriodMax,
    deliveryPeriodMin,
    deliveryErrorText,
    loading: isCDEKCompanySelected ? loading : false,
  };
};
