import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import '../../css/main.css';
import Footer from '../footer';
import { SnackbarProvider } from 'notistack';

const Layout = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={5000}
    >
      <Header />
      {children}
      <Footer />
    </SnackbarProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
