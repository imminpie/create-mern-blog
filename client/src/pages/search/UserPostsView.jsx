import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSearchUserPosts } from 'api/posts';
import SearchResult from './SearchResult';
import Wrapper from 'components/Wrapper';

export default function UserPostsView() {
  const { displayName } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['search', displayName],
    queryFn: () => getSearchUserPosts(displayName),
  });

  return (
    <Wrapper>
      <h1 className='text-3xl font-bold text-title'>{displayName}</h1>
      {data && <SearchResult isLoading={isLoading} isError={isError} data={data} />}
    </Wrapper>
  );
}
