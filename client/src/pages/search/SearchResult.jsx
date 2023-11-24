import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import LoadingSpinner from 'components/LoadingSpinner';
import RemoveMarkdown from 'remove-markdown';
import TagLink from 'components/TagLink';
import NotFound from 'pages/NotFound';
import { formatAgo } from 'util/date';

export default function SearchResult({ isLoading, isError, data }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const regex = /!\[\]\((.*?)\)/; // 이미지 경로가 있는 패턴을 정의

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  return (
    <>
      {!isHome && <p className='pb-8 pt-5 text-content'>{data.length > 0 ? `총 ${data.length}개의 게시글을 찾았습니다.` : `검색 결과가 없습니다. 😢`}</p>}
      {data.map(({ _id, title, content, tags, displayName, updatedAt }) => (
        <article key={_id} className={`${isHome ? 'card' : 'mb-12'} text-sm text-content`}>
          <Link to={`/posts/${_id}`}>
            <div className={`${isHome ? '' : 'lg:grid lg:grid-cols-3 lg:gap-x-8'} relative`}>
              {content.match(regex) && <img src={content.match(regex)[1]} alt='post images' className='h-48 w-full object-cover object-center' loading='lazy' />}
              <div className='col-span-2'>
                <h3 className='mt-3 line-clamp-1 text-lg font-semibold leading-6 text-title group-hover:text-content'>{title}</h3>
                <p className='mt-5 line-clamp-3 leading-6'>{RemoveMarkdown(content)}</p>
              </div>
            </div>
          </Link>
          {!isHome && tags.length > 0 && (
            <div>
              {tags.map((tag, idx) => (
                <TagLink tag={tag} key={idx} />
              ))}
            </div>
          )}
          <div className='relative mt-8 flex w-full items-center justify-between gap-x-2 text-xs text-other'>
            <div className='flex items-center gap-x-2'>
              <UserCircleIcon className='h-6 w-6' />
              <p className='cursor-pointer hover:underline hover:underline-offset-4' onClick={() => navigate(`/${displayName}`)}>
                {displayName}
              </p>
            </div>
            <p>{formatAgo(updatedAt, 'ko')}</p>
          </div>
        </article>
      ))}
    </>
  );
}
