import React from 'react';

import IndexLayout from './index';

interface Props {
  children?: string | JSX.Element[] | JSX.Element;
}

const PageLayout = ({ children }: Props): JSX.Element => {
  return (
    <IndexLayout>
      <div className="flex-grow bg-white py-8">
        <div className="container max-w-screen-xl mx-auto h-full">
          {children}
        </div>
      </div>
    </IndexLayout>
  );
};

export default PageLayout;
