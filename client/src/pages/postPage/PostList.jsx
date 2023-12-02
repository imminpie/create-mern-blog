import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchResult from 'pages/search/SearchResult';
import { getPosts } from 'api/posts';
import LoadingSpinner from 'components/LoadingSpinner';
import NotFound from 'components/NotFound';

export default function PostList() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  return (
    <main className='mx-auto mt-5 max-w-7xl px-6 pb-12 lg:px-8'>
      {data && (
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-5 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          <SearchResult data={data} />
        </div>
      )}
      {data?.length === 0 && (
        <div className='mx-auto mt-10 md:w-2/4 lg:w-2/5'>
          <img src='/assets/no_posts.png' alt='no posts' />
          <p className='text-center text-title'>현재 게시된 글이 없습니다. 새로운 글을 기대해주세요!</p>
        </div>
      )}
    </main>
  );
}
