import { KazPostDeliveryPrice } from '@/lib/constants/Product';

export const useKazPostDeliveryPrice = (count: number): number[] => {
  const multiplier = Math.round(count / 2);
  const priceKzt = KazPostDeliveryPrice.KZT;
  const priceRub = KazPostDeliveryPrice.RUB;

  return [multiplier * priceKzt, multiplier * priceRub];
};
