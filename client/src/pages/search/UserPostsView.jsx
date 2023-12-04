import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSearchUserPosts } from 'api/posts';
import Wrapper from 'components/Wrapper';
import LoadingSpinner from 'components/LoadingSpinner';
import NotFound from 'components/NotFound';
import SearchResultsSection from 'components/SearchResultsSection';

const AVATAR_DEFAULT = '/assets/profile.png';

export default function UserPostsView() {
  const { displayName } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['search', displayName],
    queryFn: () => getSearchUserPosts(displayName),
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data || data.length === 0) return <NotFound />;

  const { avatar, intro } = data[0];

  return (
    <Wrapper>
      {data?.length > 0 && (
        <>
          <div className='flex items-center gap-5 border-b border-b-neutral-300 pb-10'>
            <div className='avatar-wrap h-28 w-28'>
              <img src={avatar || AVATAR_DEFAULT} alt='avatar' className='h-full w-full object-cover' />
            </div>
            <div>
              <h1 className='title'>{displayName}</h1>
              <p className='text-content'>{intro}</p>
            </div>
          </div>
          <SearchResultsSection data={data} />
        </>
      )}
      {(!data || data?.length === 0) && <NotFound />}
    </Wrapper>
  );
}
