import React from 'react';
import Layout from 'components/layouts/page';
import Meta from 'components/Meta';

const CertificationPage = (): JSX.Element => {
  const title = 'Сертификация';
  const linkClassName =
    'mx-auto text-green-700 border-b border-green-700 cursor-pointer ml-2';

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
        <div>
          <p className="mb-2">
            Если Вам интересно поглубже узнать о нашей пищевой добавке, то мы
            специально подготовили несколько статей:
          </p>
          <ul className="lg:ml-10">
            <li>
              Природа против болезней и старости -
              <a
                className={linkClassName}
                href="https://drive.google.com/file/d/1dhmSmjziJt5zoAT12HP1cOCfIYKLHeoh/view?usp=sharing"
                rel="noopener noreferrer"
                target="_blank"
              >
                читать»
              </a>
            </li>
            <li>
              Бентонитовые глины -
              <a
                className={linkClassName}
                href="https://drive.google.com/file/d/1FqydJPlLO5FIO9S8PeIMot0f2y_QWOPV/view?usp=sharing"
                rel="noopener noreferrer"
                target="_blank"
              >
                читать»
              </a>
            </li>
            <li>
              Матрица жизни -
              <a
                className={linkClassName}
                href="https://drive.google.com/file/d/1pMajZd5H2yVyIpoIz0KyPtUcLRoKWwPG/view?usp=sharing"
                rel="noopener noreferrer"
                target="_blank"
              >
                читать»
              </a>
            </li>
            <li className="mb-4">
              Принцип баланса в медицине -
              <a
                className={linkClassName}
                href="https://drive.google.com/file/d/16MZJyKY5JfSE9dLjebn5Ww4YQWHYiWKJ/view?usp=sharing"
                rel="noopener noreferrer"
                target="_blank"
              >
                читать»
              </a>
            </li>
            <li>
              Отзывы о продукции -
              <a
                className={linkClassName}
                href="https://irecommend.ru/content/altaisorbent-maloizvestnyi-no-ochen-khoroshii-sorbent"
                rel="noopener noreferrer"
                target="_blank"
              >
                irecommend.ru
              </a>
            </li>
            <li>
              Бентониты в экологии. Л. С. Васильянова -
              <a
                className={linkClassName}
                href="http://www.vestnik.nauka.kz/wp-content/uploads/2016/10/5-%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D1%8C%D1%8F%D0%BD%D0%BE%D0%B2%D0%B0.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                vestnik.nauka.kz
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default CertificationPage;
