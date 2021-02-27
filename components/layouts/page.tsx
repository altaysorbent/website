import React from 'react';

import Header from 'components/header';
import Footer from 'components/footer';

interface Props {
  children?: JSX.Element[];
}

const PageLayout = ({ children }: Props): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      <Header />
      <section className="flex flex-col flex-grow bg-white border-b py-8">
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default PageLayout;
