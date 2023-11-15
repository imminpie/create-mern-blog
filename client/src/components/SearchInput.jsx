import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function SearchInput({ search, setSearch }) {
  const handleChange = (e) => setSearch(e.target.value);

  return (
    <>
      <label htmlFor='search' className='mr-3 mt-1 h-6 w-6 cursor-pointer text-other'>
        <MagnifyingGlassIcon />
      </label>
      <input type='text' value={search} onChange={handleChange} id='search' className='w-full bg-sub text-xl text-content outline-none' placeholder='검색어를 입력하세요' autoFocus />
    </>
  );
}
