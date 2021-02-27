import React, { useEffect, FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import 'styles/main.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhoneVolume, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faWhatsapp, faPhoneVolume, faMobileAlt);

const MyApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}): JSX.Element => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={5000}
    >
      <Component {...pageProps} />
    </SnackbarProvider>
  );
};

export default MyApp;
