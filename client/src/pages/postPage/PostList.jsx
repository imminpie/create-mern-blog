import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from 'api/posts';
import SearchResult from 'pages/search/SearchResult';

export default function PostList() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return (
    <main className='mx-auto mt-5 max-w-7xl px-6 pb-12 lg:px-8'>
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-5 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
        {data && <SearchResult isLoading={isLoading} isError={isError} data={data} />}
      </div>
    </main>
  );
}
