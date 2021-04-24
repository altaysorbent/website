import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '../assets/logo.svg';

const Header = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const menuElements = [
    {
      href: '/blog',
      title: 'Блог',
    },
    {
      href: '/buy',
      title: 'Купить',
    },
    {
      href: '/delivery',
      title: 'Доставка и оплата',
    },
    {
      href: '/certification',
      title: 'Сертификация',
    },
    {
      href: '/contacts',
      title: 'Контакты',
    },
  ];
  const menuItems = menuElements.map((item) => (
    <li className="mr-3 last:mr-0" key={item.href}>
      <Link href={item.href}>
        <a className="no-underline hover:text-underline cursor-pointer focus:outline-none">
          {item.title}
        </a>
      </Link>
    </li>
  ));

  return (
    <nav className="w-full z-30 text-gray-700 sticky bg-white border-b top-0">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-4">
        <div className="lg:pl-0 pl-2 flex items-center order-1">
          <Link href="/">
            <a>
              <Logo className="no-underline cursor-pointer hover:no-underline text-2xl lg:text-4xl" />
            </a>
          </Link>
        </div>

        <div className="block lg:hidden pr-4 order-2 sm:order-3">
          <button
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-700 hover:border-teal-500 appearance-none focus:outline-none"
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
            'lg:mt-0 lg:flex lg:items-center lg:w-auto lg:bg-transparent lg:p-0',
            showMenu ? 'block text-gray-700' : 'hidden',
          ].join(' ')}
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center text-lg">
            {menuItems}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
