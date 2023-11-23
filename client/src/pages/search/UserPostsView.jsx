import React from 'react';
import SearchResult from 'components/SearchResult';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSearchUserPosts } from 'api/posts';

export default function UserPostsView() {
  const { displayName } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['search', displayName],
    queryFn: () => getSearchUserPosts(displayName),
  });

  return (
    <section className='mx-auto max-w-7xl px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl py-10 lg:mx-0 lg:max-w-none'>
        <h1 className='text-3xl font-bold text-title'>{displayName}</h1>
        {data && <SearchResult isLoading={isLoading} isError={isError} data={data} />}
      </div>
    </section>
  );
}
