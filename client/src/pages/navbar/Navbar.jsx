import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, SunIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import useClickOutside from 'hooks/useClickOutside';

export default function Navbar() {
  const [menuRef, isShowing, handleToggleMenu] = useClickOutside(false);

  return (
    <header className='bg-gray-100'>
      <nav className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto flex h-16 max-w-2xl items-center justify-between lg:mx-0 lg:max-w-none'>
          <Link to='/' className='text-lg font-bold leading-none text-gray-800'>
            BLOG
          </Link>
          <div className='relative ml-3'>
            <div className='grid grid-cols-3 gap-3'>
              <button>
                <MagnifyingGlassIcon className='h-6 w-6 text-gray-800' />
              </button>
              <button>
                <SunIcon className='h-6 w-6 text-gray-800' />
              </button>
              <button onClick={handleToggleMenu} ref={menuRef} className='relative flex rounded-full text-sm' id='user-menu-button' aria-expanded='false' aria-haspopup='true'>
                <span className='absolute -inset-1.5'></span>
                <span className='sr-only'>Open user menu</span>
                <UserCircleIcon className='h-6 w-6 text-gray-800' />
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
                className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu-button'
                tabIndex='-1'
              >
                <Link to='/posts/new' className='block px-4 py-2 text-gray-700 hover:text-teal-500' role='menuitem' tabIndex='-1' id='user-menu-item-0'>
                  새 글 작성
                </Link>
                <Link to='#' className='block px-4 py-2 text-gray-700 hover:text-teal-500' role='menuitem' tabIndex='-1' id='user-menu-item-1'>
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
