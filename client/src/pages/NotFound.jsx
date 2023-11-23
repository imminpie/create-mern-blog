import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <main className='grid min-h-full place-items-center bg-main px-6 py-24 sm:py-32 lg:px-8'>
        <div className='text-center'>
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-title sm:text-5xl'>404 ERROR</h1>
          <div className='mt-6 text-base leading-7 text-gray-600'>
            <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
            <p>존재하지 않는 주소를 입력하셨거나,</p>
            <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
            <div className='mx-auto w-2/5'>
              <img src='/assets/not_found.png' alt='not_found' />
            </div>
          </div>
          <div className='flex items-center justify-center gap-x-6'>
            <Link to='/' className='cursor-pointer px-3.5 py-2.5 text-sm font-semibold text-title underline underline-offset-4'>
              홈으로
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
