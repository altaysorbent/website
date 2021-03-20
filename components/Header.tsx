import React, { createRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

const Header = (): JSX.Element => {
  const logoRef: React.RefObject<HTMLImageElement> = createRef();
  const headerRef: React.RefObject<HTMLElement> = createRef();
  const toToggle = [];

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleScroll = useCallback(() => {
    const scrollpos = window.scrollY;
    const headerClasses = ['bg-white', 'border-b', 'shadow', 'top-0'];
    if (logoRef.current && headerRef.current) {
      if (scrollpos > 1) {
        logoRef.current.src = '/images/logo_black.png';
        headerRef.current.classList.add(...headerClasses);
        //Use to switch toggleColour colours
        for (const element of toToggle) {
          element.classList.add('text-black');
          element.classList.remove('text-white');
        }
      } else {
        logoRef.current.src = '/images/logo_white.png';

        headerRef.current.classList.remove(...headerClasses);
        for (const element of toToggle) {
          element.classList.remove('text-black');
        }
      }
    }
  }, [headerRef, logoRef, toToggle]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav className="w-full z-30 text-white sticky" ref={headerRef}>
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-4">
        <div className="lg:pl-0 pl-2 flex items-center order-1">
          <Link href="/">
            <a className="text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
              <img alt="" ref={logoRef} src="/images/logo_white.png" />
            </a>
          </Link>
        </div>
        <div
          className="ml-0 lg:ml-6 flex flex-col w-full sm:w-auto mt-4 sm:mt-0 order-3 lg:order-2 text-center lg:text-left"
          ref={(el) => {
            el && toToggle.push(el);
          }}
        >
          <div className="flex flex-col">
            <a className="cursor-pointer " href="tel:+77779898998">
              <FontAwesomeIcon icon={faWhatsapp} />
              &nbsp; +7 (777) 989-89-98 &nbsp; Казахстан
            </a>
          </div>
          <div className="flex flex-col mt-2 sm:mt-0">
            <a className="cursor-pointer" href="tel:+79956254555">
              <FontAwesomeIcon icon={faMobileAlt} />
              &nbsp; +7 (995) 625-45-55 &nbsp; Россия
            </a>
          </div>
        </div>

        <div className="block lg:hidden pr-4 order-2 sm:order-3">
          <button
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className={[
            'w-full flex-grow mt-2 bg-white p-4 z-20 order-3',
            'lg:mt-0 lg:flex lg:items-center lg:w-auto lg:block lg:bg-transparent lg:p-0',
            showMenu ? 'block text-black' : 'hidden text-white',
          ].join(' ')}
        >
          <ul
            className="list-reset lg:flex justify-end flex-1 items-center"
            ref={(el) => {
              toToggle.push(el);
            }}
          >
            <li className="mr-3">
              <Link href="/">
                <a className="no-underline hover:text-underline cursor-pointer focus:outline-none">
                  Главная
                </a>
              </Link>
            </li>
            <li className="mr-3">
              <Link href="/delivery">
                <a className="no-underline hover:text-underline cursor-pointer focus:outline-none">
                  Доставка и оплата
                </a>
              </Link>
            </li>
            <li className="mr-3">
              <Link href="/certification">
                <a className="no-underline hover:text-underline cursor-pointer focus:outline-none">
                  Сертификация
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contacts">
                <a className="no-underline hover:text-underline cursor-pointer focus:outline-none">
                  Контакты
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
