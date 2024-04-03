import React from 'react';

const Footer = (): JSX.Element => {
  return (
    <section className="py-6 text-lg">
      <div className="container mx-auto">
        <div className="w-full pt-6 text-center">
          <p className="text-white">
            <a href="https://altaysorbent.org">Алтайсорбент</a> © 1994 - 2024
          </p>
          <div className="text-white mt-4">
            <a
              className="mr-4"
              href="/files/privacy-policy.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              Политика конфиденциальности
            </a>

            <a
              href="/files/public-offer-agreement.pdf"
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
