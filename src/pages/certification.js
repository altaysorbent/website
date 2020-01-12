import React from 'react';
import Layout from '../components/layouts';
import Meta from '../components/meta';
const CertificationPage = () => {
  const title = 'Сертификация';
  return (
    <Layout>
      <Meta title={title} />
      <section className="bg-white border-b py-8">
        <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">
          {' '}
          {title}
        </h3>
        <div className="container mx-auto px-2 pt-4 text-gray-700 text-xl text-justify">
          <p className="text-gray-700 text-base px-6 mb-4 text-justify">
            Наши продукты соответствуют высоким стандартам. Ниже приведены сканы
            документов (кликабельно) для ознакомления с нашей компанией и
            продукцией.
          </p>
          <div className="flex items-center justify-center">
            <div className="w-1/3 px-3">
              <a
                className="cursor-pointer"
                href="/images/certificates/sertificate-eas.jpg"
                target="_blank"
                rel="noopener noreferrer"
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
                target="_blank"
                rel="noopener noreferrer"
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
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="Протокол испытаний"
                  src="/images/certificates/test-report-2.jpg"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CertificationPage;
