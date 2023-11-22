import React from 'react';
import Post from './Post';
import LoadingSpinner from './LoadingSpinner';
import NotFound from 'pages/NotFound';

export default function SearchResult({ isLoading, isError, data }) {
  const count = data.length;
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isError && <NotFound />}
      <p className='py-5 text-content'>총 {count > 0 ? count : 0}개의 게시글을 찾았습니다.</p>
      {data && <Post data={data} />}
    </>
  );
}
