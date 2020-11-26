import React from 'react';

const Footer = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto">
        <div className="w-full pt-6 text-center">
          <p className="text-white">
            <a href="https://altaysorbent.org">Алтайсорбент</a> © 1994 - 2020
          </p>
          <div className="text-white mt-4">
            <a
              className="mr-4"
              rel="noopener noreferrer"
              target="_blank"
              href="/files/privacy-policy.pdf"
            >
              Политика конфиденциальности
            </a>

            <a
              rel="noopener noreferrer"
              target="_blank"
              href="/files/public-offer-agreement.pdf"
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
