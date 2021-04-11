import React from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';
import ContactPhones from '../ContactPhones';

interface Props {
  children?: string | JSX.Element[] | JSX.Element;
}

const PageLayout = ({ children }: Props): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen text-gray-700 h-full">
      <Header />
      <ContactPhones />
      <div className="flex-grow bg-white py-8">
        <div className="container max-w-screen-xl mx-auto h-full">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PageLayout;
