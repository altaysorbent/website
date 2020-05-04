import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import '../../css/main.css';
import Footer from '../footer';
const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex flex-col flex-grow bg-white border-b py-8">
        {children}
      </section>
      <Footer />
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
