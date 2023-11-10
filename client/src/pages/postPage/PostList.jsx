import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.REACT_APP_BASIC_URL;

export default function PostList() {
  const getPosts = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw new Error(`Failed to fetch posts from ${url}`);
    }
  };

  const { data: posts, isLoading, isError } = useQuery({ queryKey: ['posts'], queryFn: () => getPosts(API_URL) });

  if (isLoading) return <h3>Loading...⌛</h3>;
  if (isError) return <h3>Oops, something went wrong! 😣</h3>;

  return (
    <main className='mx-auto max-w-7xl px-6 lg:px-8'>
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
        {posts.map((post) => (
          <article key={post._id} className='flex max-w-2xl flex-col items-start justify-between'>
            <Link to={`/posts/${post._id}`}>
              <div className='flex items-center gap-x-4 text-xs'>
                <time dateTime={new Date(post.updatedAt).toISOString().split('T')[0]} className='text-gray-500'>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </time>
              </div>
              <div className='group relative'>
                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>{post.title}</h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>{post.content}</p>
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
