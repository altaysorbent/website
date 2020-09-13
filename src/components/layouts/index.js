import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import '../../css/main.css';
import Footer from '../footer';

const Layout = ({ children }) => {
  return (
    <div className="text-gray-800">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
