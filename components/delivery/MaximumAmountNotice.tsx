import React from 'react';

import { maximumAvailableCount } from 'constants/Product';

interface IProps {
  className?: string;
}
const MaximumAmountNotice = ({ className = '' }: IProps): JSX.Element => (
  <div className={`${className} `}>
    <p className="text-red-900">
      Максимально возможное количество блоков для заказа -{' '}
      {maximumAvailableCount} блоков
    </p>
    <p>В одном блоке 16 пачек, в каждой пачке 20 пакетиков по 1 грамму</p>
  </div>
);

export default MaximumAmountNotice;
