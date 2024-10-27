import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const HeaderContactPhone = (): React.JSX.Element => (
  <a
    className="flex cursor-pointer items-center text-green-900"
    href="https://wa.me/77779898998"
    rel="noreferrer nofollow"
    target="_blank"
  >
    <FontAwesomeIcon height={18} icon={faWhatsapp} />
    &nbsp;+7 (777) 989-89-98 (только Whatsapp)
  </a>
);

export default HeaderContactPhone;
