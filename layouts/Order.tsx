import React from 'react';

import Meta from 'components/Meta';
import PageLayout from './Page';

interface IProps {
  children?: string | JSX.Element[] | JSX.Element;
  title: string;
}

const OrderLayout = ({ title, children }: IProps): JSX.Element => {
  return (
    <PageLayout>
      <Meta title={title} />
      <div className="max-w-4xl mx-auto min-h-full px-2 sm:px-0">
        <h4 className="text-3xl sm:text-4xl mb-10 text-center sm:text-left">
          {title}
        </h4>
        {children}
      </div>
    </PageLayout>
  );
};

export default OrderLayout;
