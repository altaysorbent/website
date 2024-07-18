'use client';

import React, { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Map as YMap,
  Placemark as YPlaceMark,
  YMaps,
  ZoomControl,
} from '@pbe/react-yandex-maps';

import Spinner from '@/components/Spinner/Spinner';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';

interface IPLaceMarkProps {
  pharmacy: {
    location: {
      lat: number;
      lon: number;
    };
    title: string;
    price: number;
    address: string;
    phone: string;
  };
}

const PlaceMark = (props: IPLaceMarkProps): React.JSX.Element => {
  const {
    pharmacy: { location, title, price, address, phone },
  } = props;

  const content = (
    <div>
      <h4 className="mb-2 text-lg font-bold">{title}</h4>
      <p>
        <b>Адрес:</b> {address}
      </p>
      <p>
        <b>Телефон:</b> {phone}
      </p>
      <p>
        <b>Стоимость:</b> {price} &#8376;
      </p>
    </div>
  );
  const baloonContent = renderToStaticMarkup(content);
  return (
    <YPlaceMark
      geometry={[location.lat, location.lon]}
      options={{
        preset: 'islands#redStretchyIcon',
        hideIconOnBalloonOpen: false,
        balloonOffset: [-10, -40],
      }}
      properties={{
        balloonContent: baloonContent,
        iconContent: price + ' &#8376;',
      }}
    />
  );
};

interface IMapProps {
  placeMarks: React.JSX.Element[];
  bounds: number[][];
}

const Map = (
  props: IMapProps = { bounds: [], placeMarks: [] }
): React.JSX.Element => {
  const [ymaps, setYmaps] = useState<YMapsApi | null>(null);
  const [showSpinner, setShowSpinner] = useState(true);

  const { placeMarks, bounds } = props;

  const disableBehaviors = (ref: ymaps.Map) => {
    ref && ref.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier']);
  };

  const setCenter = async (ref: ymaps.Map) => {
    if (ref && ymaps && bounds.length > 0) {
      await ref.setBounds(ymaps.util.bounds.fromPoints(bounds));
    }
  };

  return (
    <>
      <div className="relative w-full" style={{ height: '500px' }}>
        <Spinner
          containerStyle={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          show={showSpinner}
        />
        <YMaps
          query={{
            load: 'Map,Placemark,control.ZoomControl,util.bounds,geoObject.addon.balloon',
          }}
        >
          <YMap
            defaultState={{
              center: [49.945177, 82.612766],
              zoom: 16,
              controls: [],
              behaviors: ['default', 'scrollZoom'],
            }}
            instanceRef={(ref) => {
              disableBehaviors(ref);
              setCenter(ref);
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
            onLoad={(ymaps: YMapsApi) => {
              setYmaps(ymaps);
              setShowSpinner(false);
            }}
          >
            <ZoomControl
              options={{
                size: 'small',
              }}
            />
            {placeMarks}
          </YMap>
        </YMaps>
      </div>
    </>
  );
};

export type TPharmacy = {
  fields: {
    title: string;
    address: string;
    phone: string;
    price: number;
    info: string;
    location: {
      lat: number;
      lon: number;
    };
  };
  sys: {
    id: string;
  };
};

export default function PharmacyMap({
  pharmacies = [],
}: {
  pharmacies: TPharmacy[];
}): React.JSX.Element {
  const bounds: number[][] = [];
  const PlaceMarks = pharmacies.map((pharmacy) => {
    bounds.push([pharmacy.fields.location.lat, pharmacy.fields.location.lon]);
    return <PlaceMark key={pharmacy.sys.id} pharmacy={pharmacy.fields} />;
  });
  return <Map bounds={bounds} placeMarks={PlaceMarks} />;
}
