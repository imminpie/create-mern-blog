import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from 'api/posts';
import LoadingSpinner from 'components/LoadingSpinner';
import NotFound from 'components/NotFound';
import { useInView } from 'react-intersection-observer';
import SearchResultsSection from 'components/SearchResultsSection';

export default function PostList() {
  const { ref, inView } = useInView();

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [inView]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  return (
    <main className='relative mx-auto mt-5 h-screen max-w-7xl px-6 pb-12 lg:px-8'>
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-5 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
        {data.pages?.map((posts, idx) => (
          <SearchResultsSection data={posts} key={idx} />
        ))}
        {isFetchingNextPage && <LoadingSpinner />}
      </div>

      {data.pages[0]?.length === 0 && (
        <div className='mt-12'>
          <img className='mx-auto' src='/assets/no_posts.png' alt='no posts' />
          <p className='text-center text-title'>현재 게시된 글이 없습니다. 새로운 글을 기대해주세요!</p>
        </div>
      )}
      <div ref={ref} className='absolute bottom-0'></div>
    </main>
  );
}
