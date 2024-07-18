import React from 'react';
import HeaderContactNumber from '@/components/HeaderContactNumber';

const ContactPhones = (): React.JSX.Element => {
  return (
    <div className="ml-0 flex w-full flex-col items-center justify-center bg-white py-4 text-lg sm:flex-row">
      <div className="flex flex-col">
        <HeaderContactNumber />
      </div>
    </div>
  );
};

export default ContactPhones;
