import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.REACT_APP_BASIC_URL;

export default function PostRead() {
  const navigate = useNavigate();
  const { id } = useParams();

  const getPost = async (url) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw new Error(`Failed to fetch posts from ${url}`);
    }
  };

  const { data: post, isLoading, isError } = useQuery({ queryKey: ['post'], queryFn: () => getPost(API_URL) });

  if (isLoading) return <h3>Loading...⌛</h3>;
  if (isError) return <h3>Oops, something went wrong! 😣</h3>;

  return (
    <>
      <section className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto mt-2 max-w-2xl py-12 lg:mx-0 lg:max-w-none '>
          <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tight'>{post.title}</h1>
            <p className='mt-2 text-sm text-gray-500'>Michael Foster / {new Date(post.updatedAt).toLocaleDateString()}</p>
          </div>
          <p className='mt-7 pb-12 text-base leading-7 text-gray-700'>{post.content}</p>
        </div>
      </section>
      <footer className='fixed bottom-0 left-0 right-0 mx-auto max-w-7xl bg-white px-6 shadow-[0px_0px_8px_rgba(0,0,0,0.1)] lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
          <div className='flex flex-col py-6 sm:flex-row sm:justify-end'>
            <button onClick={() => navigate(`/posts/${id}/edit`)} className=' bg-teal-400 px-7 py-2 font-bold text-white transition-colors hover:bg-teal-500'>
              수정
            </button>
            <button className='ml-2 bg-neutral-300 px-7 py-2 font-bold text-white transition-colors hover:bg-neutral-400'>삭제</button>
          </div>
        </div>
      </footer>
    </>
  );
}
