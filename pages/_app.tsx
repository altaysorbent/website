import React, { useEffect, FunctionComponent } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import 'styles/main.css';

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

  useEffect(() => {
    (window as any).ChatraID = 'frymbj2afQB6g72sb';
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://call.chatra.io/chatra.js';
    document.body.appendChild(script);
  }, []);

  return (
    <StylesProvider injectFirst>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        autoHideDuration={5000}
        maxSnack={3}
      >
        <Component {...pageProps} />
      </SnackbarProvider>
    </StylesProvider>
  );
};

export default MyApp;
