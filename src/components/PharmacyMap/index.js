import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Map as YMap,
  Placemark as YPlaceMark,
  YMaps,
  ZoomControl,
} from 'react-yandex-maps';
import * as contentful from 'contentful';
import Spinner from 'components/spinner';

const PlaceMark = props => {
  const {
    pharmacy: { location, title, price, address, phone },
  } = props;

  const content = (
    <div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
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

const Map = props => {
  const [ymaps, setYmaps] = useState(null);
  const [showSpinner, setShowSpinner] = useState(true);

  const { placeMarks, bounds } = props;

  const disableBehaviors = ref => {
    ref && ref.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier']);
  };

  const setCenter = ref => {
    if (ref && ymaps && bounds.length > 0) {
      ref.setBounds(ymaps.util.bounds.fromPoints(bounds));
    }
  };

  return (
    <>
      <YMaps
        query={{
          load:
            'Map,Placemark,control.ZoomControl,util.bounds,geoObject.addon.balloon',
        }}
      >
        <YMap
          defaultState={{
            center: [49.945177, 82.612766],
            zoom: 16,
            controls: [],
            behaviors: ['default', 'scrollZoom'],
          }}
          style={{
            width: '100%',
            height: '500px',
          }}
          instanceRef={ref => {
            disableBehaviors(ref);
            setCenter(ref);
          }}
          onLoad={ymaps => {
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
      <Spinner show={showSpinner} containerStyle={{ height: '339px' }} />
    </>
  );
};
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: `57e4k2ca6fmc`,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: `Lh4LbfbNBL_vd6Vy22vMWSmiPiVdhYwenpfNzfyAyjg`,
});

const PharmacyMap = () => {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: 'pharmacy',
      })
      .then(entries => {
        setPharmacies(entries.items);
      })
      .catch(err => console.log(err));
  }, []);

  const bounds = [];
  const PlaceMarks = pharmacies.map(pharmacy => {
    bounds.push([pharmacy.fields.location.lat, pharmacy.fields.location.lon]);
    return <PlaceMark pharmacy={pharmacy.fields} key={pharmacy.sys.id} />;
  });
  return <Map placeMarks={PlaceMarks} bounds={bounds} />;
};

export default PharmacyMap;
