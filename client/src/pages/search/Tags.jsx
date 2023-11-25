import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getSearchTags } from 'api/posts';
import SearchResult from './SearchResult';
import Wrapper from 'components/Wrapper';
import NotFound from 'pages/NotFound';

export default function Tags() {
  const { tag } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['search', tag],
    queryFn: () => getSearchTags(tag),
  });

  return (
    <Wrapper>
      {data && data.length > 0 && (
        <>
          <h1 className='text-3xl font-bold text-title'># {tag}</h1>
          <p className='mb-8 mt-5 text-title'>총 {data.length}개의 게시글을 찾았습니다.</p>
          <SearchResult isLoading={isLoading} isError={isError} data={data} />
        </>
      )}
      {data?.length === 0 && <NotFound />}
    </Wrapper>
  );
}
