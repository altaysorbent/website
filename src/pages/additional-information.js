import React from 'react';
import Layout from 'components/layouts/page';
import Meta from 'components/meta';
const AdditionalInformationPage = () => {
  const title = 'Дополнительная информация';
  const linkClassName =
    'mx-auto text-green-700 border-b border-green-700 cursor-pointer ml-2';
  return (
    <Layout>
      <Meta title={title} />
      <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center">
        {title}
      </h3>
      <div className="container mx-auto px-2 pt-4 text-gray-700 text-xl text-justify">
        <div>
          <p className="buyDescription">
            Если Вам интересно поглубже узнать о нашей пищевой добавке, то мы
            специально подготовили несколько статей:
          </p>
        </div>
        <ul className="list-disc lg:ml-10">
          <li>
            Природа против болезней и старости -
            <a
              className={linkClassName}
              rel="noopener noreferrer"
              target="_blank"
              href="https://drive.google.com/file/d/1dhmSmjziJt5zoAT12HP1cOCfIYKLHeoh/view?usp=sharing"
            >
              Перейти к статье
            </a>
          </li>
          <li>
            Бентонитовые глины -
            <a
              className={linkClassName}
              rel="noopener noreferrer"
              target="_blank"
              href="https://drive.google.com/file/d/1FqydJPlLO5FIO9S8PeIMot0f2y_QWOPV/view?usp=sharing"
            >
              Перейти к статье
            </a>
          </li>
          <li>
            Матрица жизни -
            <a
              className={linkClassName}
              rel="noopener noreferrer"
              target="_blank"
              href="https://drive.google.com/file/d/1pMajZd5H2yVyIpoIz0KyPtUcLRoKWwPG/view?usp=sharing"
            >
              Перейти к статье
            </a>
          </li>
          <li>
            Отзывы о продукции -
            <a
              className={linkClassName}
              rel="noopener noreferrer"
              target="_blank"
              href="https://irecommend.ru/content/altaisorbent-maloizvestnyi-no-ochen-khoroshii-sorbent"
            >
              irecommend.ru
            </a>
          </li>
          <li>
            Бентониты в экологии. Л. С. Васильянова -
            <a
              className={linkClassName}
              rel="noopener noreferrer"
              target="_blank"
              href="http://www.vestnik.nauka.kz/wp-content/uploads/2016/10/5-%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D1%8C%D1%8F%D0%BD%D0%BE%D0%B2%D0%B0.pdf"
            >
              vestnik.nauka.kz
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default AdditionalInformationPage;
