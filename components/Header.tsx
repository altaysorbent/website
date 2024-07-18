'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((value) => !value);
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
      <Link
        className="hover:text-underline cursor-pointer no-underline focus:outline-none"
        href={item.href}
      >
        {item.title}
      </Link>
    </li>
  ));

  return (
    <nav className="sticky top-0 z-30 w-full border-b bg-white text-gray-700">
      <div className="container mx-auto mt-0 flex w-full flex-wrap items-center justify-between py-4">
        <div className="order-1 flex items-center pl-2">
          <Link href="/">
            <Image
              className="cursor-pointer text-2xl no-underline hover:no-underline lg:text-4xl"
              width={198}
              height={24}
              src="/logo.svg"
              alt="Altaysorbent"
            />
          </Link>
        </div>

        <div className="order-2 block pr-4 sm:order-3 lg:hidden">
          <button
            className="flex appearance-none items-center rounded border border-gray-600 px-3 py-2 text-gray-500 hover:border-teal-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className={[
            'z-20 order-3 mt-2 w-full flex-grow bg-white p-4',
            'lg:mt-0 lg:flex lg:w-auto lg:items-center lg:bg-transparent lg:p-0',
            showMenu ? 'block text-gray-700' : 'hidden',
          ].join(' ')}
        >
          <ul className="list-reset flex-1 items-center justify-end text-lg lg:flex">
            {menuItems}
          </ul>
        </div>
      </div>
    </nav>
  );
}
