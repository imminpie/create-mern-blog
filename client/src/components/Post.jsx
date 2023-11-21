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
          <article key={data._id} className={`${location.pathname === '/' ? 'card' : 'mb-12'} text-sm text-content`}>
            <Link to={`/posts/${data._id}`}>
              <div className='group relative'>
                <h3 className='mt-3 line-clamp-1 text-lg font-semibold leading-6 text-title group-hover:text-content'>{data.title}</h3>
                <p className='mt-5 line-clamp-3 leading-6'>{RemoveMarkdown(data.content)}</p>
              </div>
            </Link>
            {location.pathname !== '/' && data.tags.length > 0 && (
              <div>
                {data.tags.map((tag, idx) => (
                  <Link to={`/tags/${tag}`} key={idx} className='mr-2 mt-5 inline-block cursor-pointer rounded-2xl bg-accent px-3 py-1.5 text-white hover:bg-accentHover'>
                    # {tag}
                  </Link>
                ))}
              </div>
            )}
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
