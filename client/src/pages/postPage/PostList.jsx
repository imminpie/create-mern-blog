import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import RemoveMarkdown from 'remove-markdown';
import { fetchPosts } from 'api/posts';

export default function PostList() {
  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return 'Loading...';
  if (isError) return `Error: ${error.message}`;

  return (
    <main className='mx-auto max-w-7xl px-6 lg:px-8'>
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
        {posts?.map((post) => (
          <article key={post._id} className='bg-sub flex max-w-2xl flex-col items-start justify-between rounded-md p-5 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]'>
            <Link to={`/posts/${post._id}`}>
              <div className='group relative'>
                <h3 className='text-title group-hover:text-content mt-3 text-lg font-semibold leading-6'>{post.title}</h3>
                <p className='text-content mt-5 line-clamp-3 text-sm leading-6'>{RemoveMarkdown(post.content)}</p>
              </div>
            </Link>
            <div className='text-other relative mt-8 flex w-full items-center justify-between gap-x-2 text-xs'>
              <div className='flex items-center gap-x-2'>
                <UserCircleIcon className='h-6 w-6' />
                <p className='font-semibold'>Michael Foster</p>
              </div>
              <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
