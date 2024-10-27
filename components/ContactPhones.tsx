import React from 'react';
import HeaderContactPhone from '@/components/HeaderContactPhone';

const ContactPhones = (): React.JSX.Element => {
  return (
    <div className="ml-0 flex w-full flex-col items-center justify-center bg-white py-4 text-lg sm:flex-row">
        <HeaderContactPhone />
    </div>
  );
};

export default ContactPhones;
