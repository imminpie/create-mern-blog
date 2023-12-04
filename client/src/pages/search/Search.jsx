import { useQuery } from '@tanstack/react-query';
import SearchInput from 'components/SearchInput';
import useDebounce from 'hooks/useDebounce';
import React, { useState } from 'react';
import { getSearch } from 'api/posts';
import Wrapper from 'components/Wrapper';
import LoadingSpinner from 'components/LoadingSpinner';
import NotFound from 'components/NotFound';
import SearchResultsSection from 'components/SearchResultsSection';

export default function Search() {
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 200);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: () => {
      if (debouncedSearchTerm) {
        return getSearch(debouncedSearchTerm);
      }
      return { post: [] };
    },
    enabled: !!search,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  return (
    <Wrapper>
      <div className='flex items-center border border-neutral-400 bg-sub p-4'>
        <SearchInput search={search} setSearch={setSearch} />
      </div>

      {data?.length === 0 && <p className='search-text'>검색 결과가 없습니다.</p>}
      {data?.length > 0 && <SearchResultsSection data={data} />}
    </Wrapper>
  );
}
