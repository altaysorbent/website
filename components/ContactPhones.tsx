import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

const ContactPhones = (): JSX.Element => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center w-full bg-white ml-0 text-lg py-4">
      <div className="flex flex-col">
        <a className="cursor-pointer " href="tel:+77779898998">
          <FontAwesomeIcon height={16} icon={faWhatsapp} />
          &nbsp; +7 (777) 989-89-98 &nbsp; Казахстан
        </a>
      </div>
      <div className="flex flex-col sm:ml-10">
        <a className="cursor-pointer" href="tel:+79956254555">
          <FontAwesomeIcon height={16} icon={faMobileAlt} />
          &nbsp; +7 (995) 625-45-55 &nbsp; Россия
        </a>
      </div>
    </div>
  );
};

export default ContactPhones;
