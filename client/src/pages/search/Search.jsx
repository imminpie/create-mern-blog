import SearchInput from 'components/SearchInput';
import React, { useState } from 'react';

export default function Search() {
  const [search, setSearch] = useState('');

  return (
    <section className='mx-auto max-w-7xl px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl pt-6 lg:mx-0 lg:max-w-none'>
        <div className='flex items-center border border-neutral-400 bg-sub p-4'>
          <SearchInput search={search} setSearch={setSearch} />
        </div>
      </div>
    </section>
  );
}
