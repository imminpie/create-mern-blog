import React from 'react';

export default function Error({ message }) {
  return (
    <div className='absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4'>
      <p className='text-center text-xl font-bold text-title'>{`${message} 😥`}</p>
    </div>
  );
}
