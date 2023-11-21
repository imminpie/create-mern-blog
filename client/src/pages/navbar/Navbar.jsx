import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useDarkMode } from 'context/DarkModeContext';
import DropdownMenu from 'components/DropdownMenu';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className='bg-main'>
      <nav className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto flex h-16 max-w-2xl items-center justify-between lg:mx-0 lg:max-w-none'>
          <Link to='/' className='text-lg font-bold leading-none text-title'>
            BLOG
          </Link>
          <div className='grid grid-cols-3 gap-3 text-title'>
            <Link to='/search'>
              <MagnifyingGlassIcon className='h-5 w-5' />
            </Link>
            <button type='button' className='h-5 w-5 transition duration-300' onClick={toggleDarkMode}>
              {darkMode ? <MoonIcon /> : <SunIcon />}
            </button>
            <DropdownMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
