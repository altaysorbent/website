import { useKazPostDeliveryPrice } from './useKazPostDeliveryPrice';
import { useCDEKDeliveryPrice } from './useCDEKDeliveryPrice';

interface IProps {
  count: number;
  cityCode?: string;
  deliveryType: number;
  senderCityId: number;
  zip: string | null;
  isCDEKCompanySelected: boolean;
  address?: string;
}

interface IState {
  deliveryPriceKzt: number;
  deliveryPeriodMin: number;
  deliveryPeriodMax: number;
  deliveryErrorText: null | string;
  loading: boolean;
}

export const useDeliveryPrice = (props: IProps): IState => {
  const {
    count,
    cityCode,
    deliveryType,
    senderCityId,
    zip,
    isCDEKCompanySelected,
    address,
  } = props;

  const [kazPostPriceKzt, kazPostPriceRub] = useKazPostDeliveryPrice(count);

  const {
    deliveryPriceKzt: CDEKPriceKzt,
    deliveryPeriodMin,
    deliveryPeriodMax,
    deliveryErrorText,
    loading,
  } = useCDEKDeliveryPrice({
    cityCode,
    deliveryType,
    senderCityId,
    zip,
    count,
    address,
  });

  return {
    deliveryPriceKzt: isCDEKCompanySelected ? CDEKPriceKzt : kazPostPriceKzt,
    deliveryPeriodMax,
    deliveryPeriodMin,
    deliveryErrorText,
    loading: isCDEKCompanySelected ? loading : false,
  };
};
