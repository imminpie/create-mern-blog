import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSearchTags } from 'api/posts';
import SearchResult from './SearchResult';
import Wrapper from 'components/Wrapper';
import LoadingSpinner from 'components/LoadingSpinner';
import NotFound from 'components/NotFound';

export default function Tags() {
  const { tag } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['search', tag],
    queryFn: () => getSearchTags(tag),
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  return (
    <Wrapper>
      {data?.length > 0 && (
        <>
          <h1 className='text-3xl font-bold text-title'># {tag}</h1>
          <p className='search-text'>총 {data.length}개의 게시글을 찾았습니다.</p>
          <SearchResult data={data} />
        </>
      )}
      {data?.length === 0 && <NotFound />}
    </Wrapper>
  );
}
