import React from 'react';

import MainLayout from './Main';

interface Props {
  children?: string | JSX.Element[] | JSX.Element;
}

const PageLayout = ({ children }: Props): JSX.Element => {
  return (
    <MainLayout>
      <div className="flex-grow bg-white py-8">
        <div className="container max-w-screen-xl mx-auto h-full">
          {children}
        </div>
      </div>
    </MainLayout>
  );
};

export default PageLayout;
