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
          <div className='flex items-center gap-5 border-b border-b-neutral-300 pb-10'>
            <div className='h-28 w-28 overflow-hidden rounded-full'>
              <img src={data[0].avatar ? data[0].avatar : '/assets/profile.png'} alt='avatar' />
            </div>
            <div>
              <h1 className='title'>{data[0].displayName}</h1>
              <p className='text-content'>{data[0].intro}</p>
            </div>
          </div>
          <p className='my-8 text-title'>총 {data.length}개의 게시글을 찾았습니다.</p>
          <SearchResult isLoading={isLoading} isError={isError} data={data} />
        </>
      )}
      {(!data || data?.length === 0) && <NotFound />}
    </Wrapper>
  );
}
