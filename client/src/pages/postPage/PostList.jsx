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
          <article key={post._id} className='flex max-w-2xl flex-col items-start justify-between'>
            <Link to={`/posts/${post._id}`}>
              <div className='flex items-center gap-x-4 text-xs'>
                <time dateTime={new Date(post.updatedAt).toISOString().split('T')[0]} className='text-gray-500'>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </time>
              </div>
              <div className='group relative'>
                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>{post.title}</h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>{RemoveMarkdown(post.content)}</p>
              </div>
            </Link>
            <div className='relative mt-8 flex items-center gap-x-2'>
              <UserCircleIcon className='h-6 w-6 text-gray-800' />
              <div className='text-xs leading-6'>
                <p className='font-semibold'>Michael Foster</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
