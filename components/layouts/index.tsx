import React from 'react';

import Header from 'components/header';
import Footer from 'components/footer';

interface Props {
  children?: JSX.Element[];
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="text-gray-800">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
