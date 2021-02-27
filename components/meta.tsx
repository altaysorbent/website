import Head from 'next/head';
import React from 'react';

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
      <meta key="description" name="description" content={metaDescription} />
      <meta key="og:title" property="og:title" content={pageTitle} />
      <meta
        key="og:description"
        property="og:description"
        content={metaDescription}
      />
      <meta key="twitter:card" name="twitter:card" content="summary" />
      <meta key="twitter:title" name="twitter:title" content={pageTitle} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={metaDescription}
      />
      <meta key="httpEquiv" httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <meta key="charSet" charSet="UTF-8" />
    </Head>
  );
};

export default Meta;
