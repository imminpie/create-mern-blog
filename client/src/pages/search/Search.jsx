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
      return { post: [] };
    },
    enabled: !!search,
  });

  return (
    <Wrapper>
      <div className='flex items-center border border-neutral-400 bg-sub p-4'>
        <SearchInput search={search} setSearch={setSearch} />
      </div>
      {data && data.length > 0 && (
        <>
          <p className='mb-8 mt-5 text-title'>총 {data.length}개의 게시글을 찾았습니다.</p>
          <SearchResult isLoading={isLoading} isError={isError} data={data} />
        </>
      )}
      {data?.length === 0 && (
        <p className='mb-8 mt-5 text-title'>
          <b>{search}</b> 에 대한 검색 결과가 없습니다.
        </p>
      )}
    </Wrapper>
  );
}
