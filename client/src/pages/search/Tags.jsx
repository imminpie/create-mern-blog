import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SearchResult from 'components/SearchResult';
import { useParams } from 'react-router-dom';
import { getSearchTags } from 'api/posts';

export default function Tags() {
  const { tag } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['search', tag],
    queryFn: () => getSearchTags(tag),
  });

  return (
    <section className='mx-auto max-w-7xl px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl py-10 lg:mx-0 lg:max-w-none'>
        <h1 className='text-3xl font-bold text-title'># {tag}</h1>
        {data && <SearchResult isLoading={isLoading} isError={isError} data={data} />}
      </div>
    </section>
  );
}
