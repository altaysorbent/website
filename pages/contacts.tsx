import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import Meta from 'components/Meta';
import Layout from 'layouts/Page';

const ContactsPage = (): JSX.Element => {
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
            Консультации по телефону или WhatsApp по будням с 7:00 до 14:00 по
            Москве:
            <span className="text-green-800">
              <FontAwesomeIcon
                className="mx-2"
                height={16}
                icon={faMobileAlt}
              />
              <a href="tel:+77779898998">+7 (777) 989-89-98</a>
            </span>
          </p>
        </div>

        <div>
          <p className="py-1">
            <b>Товарищество с ограниченной ответственностью «АКТАС»</b>
          </p>
          <p className="py-1">БИН: 921240000388</p>
          <p>
            Адрес: Республика Казахстан, г.Усть-Каменогорск, проспект Ауэзова,
            14/1, офис 306
          </p>
          <p className="py-1">
            Телефон:{' '}
            <span className="text-green-800">
              <FontAwesomeIcon
                className="mx-2"
                height={16}
                icon={faMobileAlt}
              />
              <a href="tel:+77779898998">+7 (777) 989-89-98</a>
            </span>
          </p>
          <p className="py-1">
            Отдел производства - ТОО «Арника»:
            <span className="text-green-800">
              <FontAwesomeIcon
                className="mx-2"
                height={16}
                icon={faPhoneVolume}
              />
              <a href="tel:+77232221078">+7 (7232) 22-10-78</a>
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactsPage;
