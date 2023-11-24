import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getSearchTags } from 'api/posts';
import SearchResult from './SearchResult';
import Wrapper from 'components/Wrapper';

export default function Tags() {
  const { tag } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['search', tag],
    queryFn: () => getSearchTags(tag),
  });

  return (
    <Wrapper>
      <h1 className='text-3xl font-bold text-title'># {tag}</h1>
      {data && <SearchResult isLoading={isLoading} isError={isError} data={data} />}
    </Wrapper>
  );
}
