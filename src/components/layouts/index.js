import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import '../../css/main.css';
import '../../css/redesign.scss';
import Footer from '../footer';
const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
