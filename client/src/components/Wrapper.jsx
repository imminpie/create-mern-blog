import React from 'react';

export default function Wrapper({ children }) {
  return (
    <div className='mx-auto mt-12 max-w-7xl px-6 pb-12 lg:px-8'>
      <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>{children}</div>
    </div>
  );
}
