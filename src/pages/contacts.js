import React from 'react';
import Layout from 'components/layouts/page';
import Meta from 'components/meta';

const ContactsPage = () => {
  const title = 'Контактная информация';
  return (
    <Layout>
      <Meta title={title} />

      <h3 className="text-3xl font-bold leading-none mb-3 text-center">
        {title}
      </h3>
      <hr />
      <div className="container mx-auto px-2 pt-4 max-w-5xl text-xl">
        <div className="mb-6">
          <p className="py-1">Режим работы интернет магазина - круглосуточно</p>
          <p className="py-1">
            Прием, подтверждение заказов по почте{' '}
            <a className="text-green-800" href="mailto:sales@altaysorbent.org">
              sales@altaysorbent.org
            </a>{' '}
            - ежедневно с 10:00 до 20:00 по Москве
          </p>
          <p className="py-1">
            Консультации по телефону по будням с 11:00 до 20:00 -{' '}
            <span className="text-green-800">
              <i className="fas fa-phone-volume ml-2" />
              <a href="tel:+79956254555">+7 (995) 625-45-55</a>
            </span>{' '}
          </p>
          <p>
            Консультации по телефону или WhatsApp по будням с 7:00 до 14:00 по
            Москве:
            <span className="text-green-800">
              <i className="fas fa-phone-volume ml-2" />
              <a href="tel:+77779898998">+7 (777) 989-89-98</a>
            </span>
          </p>
        </div>
        <h4 className="text-2xl font-bold mb-2">Российская Федерация</h4>
        <div className="ml-4 mb-4">
          <p>
            <b>ИП Садоян Роман Андреевич</b>
          </p>
          <p>ОГРН: 320784700145055</p>
          <p>
            Телефон:{' '}
            <span className="text-green-800">
              <i className="fas fa-phone-volume ml-2" />
              <a href="tel:+79956254555">+7 (995) 625-45-55</a>
            </span>{' '}
          </p>
        </div>
        <h4 className="text-2xl font-bold mb-2">Республика Казахстан</h4>
        <div className="ml-4">
          <p>
            <b>Товарищество с ограниченной ответственностью "АКТАС"</b>
          </p>
          <p>БИН: 921240000388</p>
          <p>
            Адрес: Республика Казахстан, г.Усть-Каменогорск, проспект Ауэзова,
            14/1, офис 306
          </p>
          <p>
            Телефон:{' '}
            <span className="text-green-800">
              <i className="fas fa-phone-volume ml-2" />
              <a href="tel:+77779898998">+7 (777) 989-89-98</a>
            </span>
          </p>
          <p>
            Отдел производства - ТОО "Арника":
            <a className="ml-2 text-green-800" href="tel:+77232221078">
              +7 (7232) 22-10-78
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactsPage;
