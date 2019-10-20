import React, { Fragment } from 'react';
import { Map as YMap, Placemark, YMaps } from 'react-yandex-maps';
const Footer = () => {
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
    <Fragment>
      <a id="contacts" />

      <svg
        className="wave-top"
        viewBox="0 0 1439 147"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
            <g className="wave" fill="#f8fafc">
              <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z" />
            </g>
            <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
              <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                <path
                  d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                  opacity="0.100000001"
                />
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                />
                <path
                  d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                  opacity="0.200000003"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>

      <section className="py-6 mb-12">
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
              <i className="fas fa-map-marked-alt mr-2" /> Ауэзова 14/1 офис 308
            </p>
            <p>
              <i className="fas fa-phone-volume mr-2" />{' '}
              <a className="" href="tel:+77779898998">
                +7 (777) 989-89-98
              </a>
            </p>
            <p>
              <i className="fas fa-envelope mr-2" />{' '}
              <a href="mailto:sales@altaysorbent.org">sales@altaysorbent.org</a>
            </p>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="w-full pt-6 text-center">
            <p className="text-white">
              ТОО "АРНИКА" © 1994 - 2019
              <br />
              Республика Казахстан, г. Усть-Каменогорск
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Footer;
