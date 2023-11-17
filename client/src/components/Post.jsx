import React from 'react';
import RemoveMarkdown from 'remove-markdown';
import { Link, useLocation } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { formatAgo } from 'util/date';

export default function Post({ data }) {
  const location = useLocation();
  return (
    <>
      {data &&
        data.map((data) => (
          <article key={data._id} className={`${location.pathname === '/search' ? 'mb-12' : 'card'}`}>
            <Link to={`/posts/${data._id}`}>
              <div className='group relative'>
                <h3 className='mt-3 line-clamp-1 text-lg font-semibold leading-6 text-title group-hover:text-content'>{data.title}</h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-content'>{RemoveMarkdown(data.content)}</p>
              </div>
            </Link>
            <div className='relative mt-8 flex w-full items-center justify-between gap-x-2 text-xs text-other'>
              <div className='flex items-center gap-x-2'>
                <UserCircleIcon className='h-6 w-6' />
                <p>윤딴딴</p>
              </div>
              <p>{formatAgo(data.updatedAt, 'ko')}</p>
            </div>
          </article>
        ))}
    </>
  );
}
