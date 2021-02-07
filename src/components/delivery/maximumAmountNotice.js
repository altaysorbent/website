import React from 'react';

import { DELIVERY_COMPANIES, maximumAvailableCountCDEK, maximumAvailableCountKazPost } from '../../constants/product';

const MaximumAmountNotice = () => (
  <div className="text-red-700">
    Максимально возможное количество упаковок для заказа через {DELIVERY_COMPANIES.CDEK} -{' '}
    <b>{maximumAvailableCountCDEK}</b>, через {DELIVERY_COMPANIES.KAZPOST} - <b>{maximumAvailableCountKazPost}</b>
  </div>
);

export default MaximumAmountNotice;
