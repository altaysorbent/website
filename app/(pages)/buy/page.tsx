import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Description from '@/components/Description';

import {
  CurrencySymbols,
  productName,
  productPriceKzt,
} from '@/lib/constants/Product';
import type { Metadata } from 'next';
import { getMeta } from '@/lib/meta';

export const metadata: Metadata = getMeta({ title: productName });
const BuyPage = (): React.JSX.Element => {
  return (
    <>
      <div className="mx-auto flex flex-wrap px-2">
        <div className="w-full">
          <h3 className="mb-4 text-center text-3xl font-bold leading-none sm:text-left">
            {productName}
          </h3>
        </div>
        <div className="mb-12 flex w-full flex-col sm:flex-row">
          <div className="my-4 w-full pr-0 sm:my-0 sm:w-1/3 sm:pr-4">
            <img
              alt="Алтайсорбент"
              className="mx-auto border sm:mx-0"
              src="/images/altaysorbent.jpg"
              style={{
                maxHeight: '265px',
                width: 'auto',
              }}
            />
          </div>
          <div className="w-full text-center text-xl sm:w-2/3 sm:text-left">
            <div className="mb-4">
              <div className="mb-2 font-semibold">
                Стоимость блока (16 пачек) (без учета доставки)
              </div>
              <div className="font-bold text-green-700">
                <b>
                  {productPriceKzt} {CurrencySymbols.KZT}
                </b>
              </div>
            </div>
            <Link href="/checkout">
              <Button
                color="primary"
                size="large"
                startIcon={<ShoppingCartIcon />}
                variant="contained"
              >
                В корзину
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <Description />
        </div>
      </div>
    </>
  );
};

export default BuyPage;
