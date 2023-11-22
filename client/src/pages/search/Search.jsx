import { useQuery } from '@tanstack/react-query';
import SearchInput from 'components/SearchInput';
import SearchResult from 'components/SearchResult';
import useDebounce from 'hooks/useDebounce';
import React, { useState } from 'react';
import { getSearch } from 'api/posts';

export default function Search() {
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 200);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: () => {
      if (debouncedSearchTerm) {
        return getSearch(debouncedSearchTerm);
      }
      return [];
    },
    enabled: !!search,
  });

  return (
    <section className='mx-auto max-w-7xl px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl py-10 lg:mx-0 lg:max-w-none'>
        <div className='flex items-center border border-neutral-400 bg-sub p-4'>
          <SearchInput search={search} setSearch={setSearch} />
        </div>
        {data && <SearchResult isLoading={isLoading} isError={isError} data={data}/>}
      </div>
    </section>
  );
}
