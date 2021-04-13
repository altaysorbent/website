import React from 'react';
import Layout from 'components/layouts/page';
import Meta from 'components/Meta';

const CertificationPage = (): JSX.Element => {
  const title = 'Сертификация';

  return (
    <Layout>
      <Meta title={title} />
      <h3 className="text-3xl font-bold leading-none mb-3 text-center">
        {title}
      </h3>
      <hr />
      <div className="container mx-auto px-2 pt-4 text-xl max-w-5xl text-justify">
        <p className="mb-12">
          Наши продукты соответствуют высоким стандартам. Ниже приведены сканы
          документов для ознакомления с нашей компанией и продукцией.
        </p>
        <div className="flex items-center justify-center mb-12">
          <div className="w-1/3 px-3">
            <a
              className="cursor-pointer"
              href="/images/certificates/sertificate-eas.jpg"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="Свидетельство о регистрации"
                src="/images/certificates/sertificate-eas.jpg"
              />
            </a>
          </div>
          <div className="w-1/3 px-3">
            <a
              className="cursor-pointer"
              href="/images/certificates/test-report.jpg"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="Протокол испытаний"
                src="/images/certificates/test-report.jpg"
              />
            </a>
          </div>
          <div className="w-1/3 px-3">
            <a
              className="cursor-pointer"
              href="/images/certificates/test-report-2.jpg"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="Протокол испытаний"
                src="/images/certificates/test-report-2.jpg"
              />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CertificationPage;
