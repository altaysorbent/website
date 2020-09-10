import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import '../../css/main.css';
import Footer from '../footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
