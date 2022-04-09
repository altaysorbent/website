import React from 'react';
import HeaderContactNumber from './HeaderContactNumber';

const ContactPhones = (): JSX.Element => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center w-full bg-white ml-0 text-lg py-4">
      <div className="flex flex-col">
        <HeaderContactNumber />
      </div>
    </div>
  );
};

export default ContactPhones;
