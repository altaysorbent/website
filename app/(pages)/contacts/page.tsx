import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import { getMeta } from '@/lib/meta';

const title = 'Контактная информация';
export const metadata: Metadata = getMeta({ title });
const ContactsPage = (): React.JSX.Element => {
  return (
    <>
      <h3 className="mb-3 text-center text-3xl font-bold leading-none">
        {title}
      </h3>
      <hr />
      <div className="container mx-auto max-w-5xl px-2 pt-4 text-xl">
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
            <span className="flex items-center text-green-800">
              <FontAwesomeIcon
                className="mx-2"
                height={18}
                icon={faMobileAlt}
              />
              <a href="tel:+77779898998">+7 (777) 989-89-98</a>
            </span>
          </p>
        </div>

        <div>
          <p className="py-1">
            <b>Товарищество с ограниченной ответственностью «Cityinfo.kz»</b>
          </p>
          <p className="py-1">БИН: 120340001974</p>
          <p>
            Юридический адрес: Республика Казахстан, г.Усть-Каменогорск, ул.
            Беспалова 51, корпус 1, офис 211
          </p>
          <p className="py-1">
            Телефон:{' '}
            <span className="flex items-center text-green-800">
              <FontAwesomeIcon
                className="mx-2 inline"
                height={18}
                icon={faMobileAlt}
              />
              <a href="tel:+77779898998">+7 (777) 989-89-98</a>
            </span>
          </p>
          <p className="py-1">
            Отдел производства - ТОО «Арника»:
            <span className="flex items-center text-green-800">
              <FontAwesomeIcon
                className="mx-2 inline"
                height={18}
                icon={faPhoneVolume}
              />
              <a href="tel:+77232221078">+7 (7232) 22-10-78</a>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactsPage;
