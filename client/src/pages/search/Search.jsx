import { useQuery } from '@tanstack/react-query';
import SearchInput from 'components/SearchInput';
import useDebounce from 'hooks/useDebounce';
import React, { useState } from 'react';
import { getSearch } from 'api/posts';
import SearchResult from './SearchResult';
import Wrapper from 'components/Wrapper';

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
    <Wrapper>
      <div className='flex items-center border border-neutral-400 bg-sub p-4'>
        <SearchInput search={search} setSearch={setSearch} />
      </div>
      {data && <SearchResult isLoading={isLoading} isError={isError} data={data} />}
    </Wrapper>
  );
}
