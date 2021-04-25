import {
  productPriceKzt as baseProductPriceKzt,
  productPriceRub as baseProductPriceRub,
} from 'constants/Product';

interface IState {
  productPriceKzt: number;
  productPriceRub: number;
  productSumKzt: number;
  productSumRub: number;
}
export const useProductPrice = (count: number): IState => {
  const getProductPrice = (price: number, count: number): number => {
    return count > 16 ? Math.ceil(price * 0.9) : price;
  };

  const productPriceKzt = getProductPrice(baseProductPriceKzt, count);
  const productPriceRub = getProductPrice(baseProductPriceRub, count);
  const productSumKzt = count * productPriceKzt;
  const productSumRub = count * productPriceRub;

  return {
    productPriceKzt,
    productPriceRub,
    productSumKzt,
    productSumRub,
  };
};
