import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import '../../css/main.css';
const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
