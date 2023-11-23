import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from 'api/posts';
import NotFound from 'pages/NotFound';
import Post from 'components/Post';

export default function PostList() {
  const {
    isLoading,
    isError,
    data: post,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return (
    <main className='mx-auto max-w-7xl px-6 pb-12 lg:px-8'>
      {isLoading && <LoadingSpinner />}
      {isError && <NotFound />}
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-5 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
        <Post data={post} />
      </div>
    </main>
  );
}
