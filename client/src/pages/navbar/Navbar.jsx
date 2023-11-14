import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, SunIcon, MoonIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useDarkMode } from 'context/DarkModeContext';
import useClickOutside from 'hooks/useClickOutside';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [menuRef, isShowing, handleToggleMenu] = useClickOutside(false);

  return (
    <header className='bg-main'>
      <nav className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto flex h-16 max-w-2xl items-center justify-between lg:mx-0 lg:max-w-none'>
          <Link to='/' className='text-title text-lg font-bold leading-none'>
            BLOG
          </Link>
          <div className='relative ml-3'>
            <div className='text-title grid grid-cols-3 gap-3'>
              <button className='h-5 w-5 rounded-full'>
                <MagnifyingGlassIcon />
              </button>
              <button onClick={toggleDarkMode} className='h-5 w-5 rounded-full'>
                {!darkMode ? <SunIcon /> : <MoonIcon />}
              </button>
              <button onClick={handleToggleMenu} className='h-5 w-5 rounded-full' id='user-menu-button' aria-expanded='false' aria-haspopup='true' ref={menuRef}>
                <UserCircleIcon />
              </button>
            </div>
            <Transition
              show={isShowing}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <div
                className='bg-sub absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu-button'
                tabIndex='-1'
              >
                <Link to='/posts/new' className='text-title block px-4 py-2 hover:text-teal-500' role='menuitem' tabIndex='-1' id='user-menu-item-0'>
                  새 글 작성
                </Link>
                <Link to='#' className='text-title block px-4 py-2 hover:text-teal-500' role='menuitem' tabIndex='-1' id='user-menu-item-1'>
                  로그아웃
                </Link>
              </div>
            </Transition>
          </div>
        </div>
      </nav>
    </header>
  );
}
