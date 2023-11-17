import React from 'react';
import Post from './Post';

export default function SearchResult({ isLoading, isError, error, data: post }) {
  const count = post.length;
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{`Error: ${error.message}`}</p>}
      <p className='py-5 text-content'>총 {count}개의 게시글을 찾았습니다.</p>
      <Post data={post} />
    </>
  );
}