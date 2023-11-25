import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSearchUserPosts } from 'api/posts';
import SearchResult from './SearchResult';
import Wrapper from 'components/Wrapper';
import NotFound from 'pages/NotFound';

export default function UserPostsView() {
  const { displayName } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['search', displayName],
    queryFn: () => getSearchUserPosts(displayName),
  });

  return (
    <Wrapper>
      {data && data.length > 0 && (
        <>
          <h1 className='text-3xl font-bold text-title'>{displayName}</h1>
          <p className='mb-8 mt-5 text-title'>총 {data.length}개의 게시글을 찾았습니다.</p>
          <SearchResult isLoading={isLoading} isError={isError} data={data} />
        </>
      )}
      {(!data || data?.length === 0) && <NotFound />}
    </Wrapper>
  );
}
