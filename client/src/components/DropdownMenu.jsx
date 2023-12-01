import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from 'state/index.js';
import { logout } from 'api/auth';

const AVATAR_DEFAULT = '/assets/profile.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DropdownMenu() {
  const navigate = useNavigate();
  const { user, token, snsToken, setLogout } = useUserStore();

  const onLogout = async () => {
    try {
      user.snsId > 0 && (await logout(snsToken, user.snsId));
      await setLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Menu as='div' className='relative inline-block h-6 text-left'>
      <div>
        <Menu.Button>
          <div className='mr-2 h-6 w-6 overflow-hidden rounded-full' aria-hidden='true'>
            <img src={user.avatar || AVATAR_DEFAULT} alt='avatar' />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-sub shadow-lg focus:outline-none'>
          <div className='py-1'>
            {token && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link to='/posts/new' className={classNames(active ? 'text-accent' : 'text-title', 'block px-4 py-2 text-sm')}>
                      새 글 작성
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link to='/profile' className={classNames(active ? 'text-accent' : 'text-title', 'block px-4 py-2 text-sm')}>
                      내 프로필
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item onClick={onLogout}>
                  {({ active }) => (
                    <button type='submit' className={classNames(active ? 'text-accent' : 'text-title', 'block w-full px-4 py-2 text-left text-sm')}>
                      로그아웃
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
