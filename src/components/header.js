import React, {
  Component,
  createRef,
  PureComponent,
  useEffect,
  useState,
} from 'react';

const Header = () => {
  const logoRef = createRef();
  const headerRef = createRef();
  const toToggle = [];

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigateTo = anchor => {
    document.getElementById(anchor).scrollIntoView();
  };

  const handleScroll = () => {
    const scrollpos = window.scrollY;

    if (logoRef.current && headerRef.current) {
      if (scrollpos > 10) {
        logoRef.current.src = '/images/logo_black.png';
        headerRef.current.classList.add('bg-white', 'border-b', 'shadow');
        //Use to switch toggleColour colours
        for (let element of toToggle) {
          element.classList.add('text-black');
          element.classList.remove('text-white');
        }
      } else {
        logoRef.current.src = '/images/logo_white.png';

        headerRef.current.classList.remove('bg-white', 'border-b', 'shadow');
        for (let element of toToggle) {
          element.classList.remove('text-black');
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="fixed w-full z-30 top-0 text-white" ref={headerRef}>
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="lg:pl-0 pl-2 flex items-center">
          <a
            className="text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="/"
          >
            <img ref={logoRef} src="/images/logo_white.png" alt="" />
          </a>
        </div>
        <div
          className="ml-0 lg:ml-6 "
          ref={el => {
            el && toToggle.push(el);
          }}
        >
          <p>
            <a className="cursor-pointer" href="tel:+77779898998">
              <i className="fab fa-whatsapp" aria-hidden="true" />
              &nbsp; +7 (777) 989-89-98
            </a>
          </p>
        </div>

        <div className="block lg:hidden pr-4">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
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
            'w-full flex-grow mt-2 bg-white p-4 z-20',
            'lg:mt-0 lg:flex lg:items-center lg:w-auto lg:block lg:bg-transparent lg:p-0',
            showMenu ? 'block text-black' : 'hidden text-white',
          ].join(' ')}
          id="nav-content"
        >
          <ul
            className="list-reset lg:flex justify-end flex-1 items-center"
            ref={el => {
              toToggle.push(el);
            }}
          >
            <li className="mr-3">
              <button
                className="inline-block no-underline hover:text-underline cursor-pointer focus:outline-none"
                onClick={() => {
                  navigateTo('sorbent');
                }}
              >
                Алтайсорбент
              </button>
            </li>

            <li className="mr-3">
              <button
                className="inline-block no-underline hover:text-underline cursor-pointer focus:outline-none"
                onClick={() => {
                  navigateTo('specification');
                }}
              >
                Описание
              </button>
            </li>
            <li className="mr-3">
              <button
                className="inline-block no-underline hover:text-underline cursor-pointer focus:outline-none"
                onClick={() => {
                  navigateTo('wheretobuy');
                }}
              >
                Где купить?
              </button>
            </li>
            <li className="mr-3">
              <button
                className="inline-block no-underline hover:text-underline cursor-pointer focus:outline-none"
                onClick={() => {
                  navigateTo('use');
                }}
              >
                Применение
              </button>
            </li>
            <li className="mr-3">
              <button
                className="inline-block no-underline hover:text-underline cursor-pointer focus:outline-none"
                onClick={() => {
                  navigateTo('certificates');
                }}
              >
                Сертификация
              </button>
            </li>
            <li>
              <button
                className="inline-block no-underline hover:text-underline cursor-pointer focus:outline-none"
                onClick={() => {
                  navigateTo('contacts');
                }}
              >
                Контакты
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
