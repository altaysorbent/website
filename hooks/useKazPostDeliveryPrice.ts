import { KazPostDeliveryPrice } from 'constants/Product';

export const useKazPostDeliveryPrice = (count: number): number[] => {
  const isDoublePacket = count > 32;
  const priceKzt = KazPostDeliveryPrice.KZT;
  const priceRub = KazPostDeliveryPrice.RUB;

  return [
    isDoublePacket ? priceKzt * 2 : priceKzt,
    isDoublePacket ? priceRub * 2 : priceRub,
  ];
};
