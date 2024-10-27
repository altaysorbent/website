import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


const HeaderContactPhone = (): React.JSX.Element => (
  <div
    className="flex cursor-pointer items-center text-green-900 bg-red-100  w-full py-4 text-lg justify-center"
  >

      <FontAwesomeIcon height={18} icon={faExclamationTriangle} />
      &nbsp;Продажа Алтайсорбента прекращена в связи с продажей бизнеса и невозможностью приема оплаты.


  </div>
);

export default HeaderContactPhone;
