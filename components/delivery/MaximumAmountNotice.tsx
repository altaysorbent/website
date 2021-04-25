import React from 'react';

import { maximumAvailableCount } from 'constants/Product';

interface IProps {
  className?: string;
}
const MaximumAmountNotice = ({ className = '' }: IProps): JSX.Element => (
  <div className={`${className} text-red-900`}>
    <p>
      Максимально возможное количество упаковок для заказа -{' '}
      {maximumAvailableCount} штуки
    </p>
    <p>
      При заказе более 16 упаковок - предоставляется <b>10% скидка</b>
    </p>
  </div>
);

export default MaximumAmountNotice;
