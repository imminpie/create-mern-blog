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
      <p className='py-5 text-content'>{count > 0 ? `총 ${count}개의 게시글을 찾았습니다.` : `검색 결과가 없습니다. 😢`}</p>
      {data && <Post data={data} />}
    </>
  );
}
