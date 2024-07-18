import React from 'react';

const Footer = (): React.JSX.Element => {
  return (
    <section className="py-6 text-lg">
      <div className="container mx-auto">
        <div className="w-full pt-6 text-center">
          <p className="text-white">
            <a href="https://altaysorbent.org">Алтайсорбент</a> © 1994 -{' '}
            {new Date().getFullYear()}
          </p>
          <div className="mt-4 text-white">
            <a
              className="mr-4"
              href="https://docs.google.com/document/d/e/2PACX-1vSE2Ir9TYFF1CSj9EYuHXeNeYWzlX3CsoNJfSi98bYBNA8FX2-FLk-8AKKA4tHWqw/pub"
              rel="noopener noreferrer"
              target="_blank"
            >
              Политика конфиденциальности
            </a>

            <a
              href="https://docs.google.com/document/d/e/2PACX-1vSygbPdzCn4dXuNaOIB6hobrijByz7On4ARRM03QWrhaj4wIxx3UtIN6nysTjl1Xg/pub"
              rel="noopener noreferrer"
              target="_blank"
            >
              Договор оферта
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
