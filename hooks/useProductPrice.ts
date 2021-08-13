import {
  productPriceKzt as baseProductPriceKzt,
  productPriceRub as baseProductPriceRub,
} from 'constants/Product';

interface IState {
  isPromoCodeValid: boolean;
  productPriceKzt: number;
  productPriceRub: number;
  productSumKzt: number;
  productSumRub: number;
}
const PROMO_CODE = process.env.NEXT_PUBLIC_PROMO_CODE;

export const useProductPrice = (
  count: number,
  promoCode: string | null = null
): IState => {
  const getProductPrice = (price: number): number => {
    const priceWithPromoCode = isPromoCodeValid ? price * 0.92 : price;
    return Math.ceil(
      count > 16 ? priceWithPromoCode * 0.9 : priceWithPromoCode
    );
  };

  const isPromoCodeValid = promoCode && promoCode.toLowerCase() === PROMO_CODE;

  const productPriceKzt = getProductPrice(baseProductPriceKzt);
  const productPriceRub = getProductPrice(baseProductPriceRub);
  const productSumKzt = count * productPriceKzt;
  const productSumRub = count * productPriceRub;

  return {
    isPromoCodeValid,
    productPriceKzt,
    productPriceRub,
    productSumKzt,
    productSumRub,
  };
};
