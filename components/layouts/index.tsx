import React from 'react';

import ContactPhones from 'components/ContactPhones';
import Header from 'components/Header';
import Footer from 'components/Footer';

interface Props {
  children?: JSX.Element[] | JSX.Element;
}

const IndexLayout = ({ children }: Props): JSX.Element => {
  return (
    <div className="text-gray-700">
      <Header />
      <ContactPhones />
      {children}
      <Footer />
    </div>
  );
};

export default IndexLayout;
