import React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
  description?: string;
}
const Meta = ({ description, title }: Props): JSX.Element => {
  const pageTitle = `${title} | Алтайсорбент`;
  const metaDescription =
    description ||
    'Алтайсорбент - 100% натуральный кремнесодержащий энтеросорбент с широким спектром действия';

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta content={metaDescription} key="description" name="description" />
      <meta content={pageTitle} key="og:title" property="og:title" />
      <meta
        content={metaDescription}
        key="og:description"
        property="og:description"
      />
      <meta content="summary" key="twitter:card" name="twitter:card" />
      <meta content={pageTitle} key="twitter:title" name="twitter:title" />
      <meta
        content={metaDescription}
        key="twitter:description"
        name="twitter:description"
      />
      <meta content="ie=edge" httpEquiv="X-UA-Compatible" key="httpEquiv" />
      <meta
        content="width=device-width, initial-scale=1.0"
        key="viewport"
        name="viewport"
      />
      <meta charSet="UTF-8" key="charSet" />
    </Head>
  );
};

export default Meta;
