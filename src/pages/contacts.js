import React from 'react';
import { Map as YMap, Placemark, YMaps } from 'react-yandex-maps';
import Layout from 'components/layouts';
import Meta from 'components/meta';

const ContactsPage = () => {
  const Map = () => {
    const placemark = (
      <Placemark
        geometry={[49.945177, 82.612766]}
        options={{
          preset: 'islands#redMedicalIcon',
        }}
      />
    );

    const disableBehaviors = ref => {
      ref &&
        ref.behaviors.disable([
          'drag',
          'multiTouch',
          'scrollZoom',
          'dblClickZoom',
          'rightMouseButtonMagnifier',
        ]);
    };

    return (
      <YMaps>
        <YMap
          defaultState={{
            center: [49.945177, 82.609331],
            zoom: 16,
            controls: [],
          }}
          style={{
            width: '100%',
            height: '500px',
          }}
          instanceRef={ref => {
            disableBehaviors(ref);
          }}
        >
          {placemark}
        </YMap>
      </YMaps>
    );
  };

  return (
    <Layout>
      <Meta title="Контакты" />

      <section className="py-6">
        <div
          className="relative w-full h-full"
          style={{
            height: '500px',
            width: '100%',
          }}
        >
          <Map />
          <div className="flex flex-col justify-center shadow inset-y-0 left-0 bg-white absolute py-6 px-4 my-10 lg:py-12 lg:px-8 lg:my-24 lg:ml-4 lg:ml-32 max-w-xl">
            <img
              className="mx-auto mb-2"
              src="/images/logo_black.png"
              style={{
                width: '85px',
              }}
              alt=""
            />
            <p className="font-bold">
              ТОО "Актас" - Генеральный дистрибьютор ТОО "Арника"
            </p>
            <p className="py-1">
              Режим работы интернет магазина - круглосуточно
            </p>
            <p className="py-1">
              Прием, подтверждение заказов по почте - ежедневно с 10:00 до 20:00
              по Москве
            </p>
            <p className="py-1">
              Консультации по телефону или WhatsApp по будням с 7 до 14.00 по
              Москве
              <i className="fas fa-phone-volume ml-2" />
              <a className="ml-2" href="tel:+77779898998">
                +7 (777) 989-89-98
              </a>
            </p>
            <p>
              <i className="fas fa-map-marked-alt mr-2" />
              Ауэзова 14/1 офис 306
            </p>
            <p>
              <i className="fas fa-phone-square-alt mr-2" />
              Отдел производства ТОО "Арника":
              <a className="ml-2" href="tel:+77232221078">
                +7 (7232) 22-10-78
              </a>
            </p>
            <p>
              <i className="fas fa-envelope mr-2" />
              <a href="mailto:sales@altaysorbent.org">sales@altaysorbent.org</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactsPage;
