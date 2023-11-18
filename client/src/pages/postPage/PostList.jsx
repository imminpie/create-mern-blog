import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from 'api/posts';
import Post from 'components/Post';
import LoadingSpinner from 'components/LoadingSpinner';
import Error from 'components/Error';

export default function PostList() {
  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return (
    <main className='mx-auto max-w-7xl px-6 lg:px-8'>
      {isLoading && <LoadingSpinner />}
      {isError && <Error message={error.message} />}
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-5 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
        <Post data={post} />
      </div>
    </main>
  );
}
