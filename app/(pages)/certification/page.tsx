import React from 'react';
import type { Metadata } from 'next';
import { getMeta } from '@/lib/meta';

const title = 'Сертификация';
export const metadata: Metadata = getMeta({ title });
const CertificationPage = (): React.JSX.Element => {
  return (
    <>
      <h3 className="mb-3 text-center text-3xl font-bold leading-none">
        {title}
      </h3>
      <hr />
      <div className="container mx-auto max-w-5xl px-2 pt-4 text-justify text-xl">
        <p className="mb-12">
          Наши продукты соответствуют высоким стандартам. Ниже приведены сканы
          документов для ознакомления с нашей компанией и продукцией.
        </p>
        <div className="mb-12 flex items-center justify-center">
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
    </>
  );
};

export default CertificationPage;
