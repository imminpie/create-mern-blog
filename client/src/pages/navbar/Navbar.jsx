import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useDarkMode } from 'context/DarkModeContext';
import DropdownMenu from 'components/DropdownMenu';
import useUserStore from 'state';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { token } = useUserStore();

  return (
    <header className='bg-main'>
      <nav className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto flex h-16 max-w-2xl items-center justify-between lg:mx-0 lg:max-w-none'>
          <Link to='/' className='text-lg font-bold leading-none text-title'>
            BLOG
          </Link>
          <div className='flex items-center text-title'>
            <Link to='/search'>
              <MagnifyingGlassIcon className='h-5 w-5' />
            </Link>
            <button onClick={toggleDarkMode} type='button' className='mx-4 h-5 w-5 transition delay-200 duration-100 ease-out'>
              {darkMode ? <MoonIcon /> : <SunIcon />}
            </button>
            {token ? (
              <DropdownMenu />
            ) : (
              <Link to='/login' className='btn-success rounded-2xl px-3 py-1 text-sm text-white '>
                로그인
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
