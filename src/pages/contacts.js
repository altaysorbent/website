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
            center: [49.945177, 82.612766],
            zoom: 16,
            controls: [],
          }}
          style={{
            width: '100%',
            height: '400px',
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
            height: '400px',
            width: '100%',
          }}
        >
          <Map />
          <div className="flex flex-col justify-center shadow inset-y-0 left-0 bg-white absolute py-6 px-4 lg:py-12 lg:px-8 text-black my-28 lg:my-24 ml-4 lg:ml-32">
            <img
              className="mx-auto mb-2"
              src="/images/logo_black.png"
              style={{
                width: '75px',
              }}
              alt=""
            />
            <h4 className="font-bold">ТОО "Арника"</h4>
            <p>
              <i className="fas fa-map-marked-alt mr-2" /> Ауэзова 14/1 офис 306
            </p>
            <p>
              <i className="fas fa-phone-volume mr-2" /> Отдел продаж:
              <a className="ml-2" href="tel:+77779898998">
                +7 (777) 989-89-98
              </a>
              <br />
              <i className="fas fa-phone-square-alt mr-2" />
              Отдел производства:
              <a className="ml-2" href="tel:+77232221078">
                +7 (7232) 22-10-78
              </a>
            </p>
            <p>
              <i className="fas fa-envelope mr-2" />{' '}
              <a href="mailto:sales@altaysorbent.org">sales@altaysorbent.org</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactsPage;
