import React from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';

interface Props {
  children?: JSX.Element[];
}

const PageLayout = ({ children }: Props): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen text-gray-700">
      <Header />
      <section className="flex flex-col flex-grow bg-white border-b py-8">
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default PageLayout;
