import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from 'state/index.js';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DropdownMenu() {
  const navigate = useNavigate();
  const { token } = useUserStore();
  const { setLogout } = useUserStore();

  const onLogout = async () => {
    await setLogout();
    navigate('/');
    window.location.reload();
  };

  return (
    <Menu as='div' className='relative inline-block h-5 text-left'>
      <div>
        <Menu.Button>
          <UserCircleIcon className='h-5 w-5' aria-hidden='true' />
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
            <Menu.Item>
              {({ active }) => (
                <Link to='/posts/new' className={classNames(active ? 'text-accent' : 'text-title', 'block px-4 py-2 text-sm')}>
                  새 글 작성
                </Link>
              )}
            </Menu.Item>
            {token && (
              <Menu.Item onClick={onLogout}>
                {({ active }) => (
                  <button type='submit' className={classNames(active ? 'text-accent' : 'text-title', 'block w-full px-4 py-2 text-left text-sm')}>
                    로그아웃
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
