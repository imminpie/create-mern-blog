import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
      {data &&
        data.map(({ _id, title, content, tags, displayName, updatedAt, intro, avatar }) => (
          <article className={`${isHome ? 'card' : 'mb-12 lg:grid'} text-sm text-content`} key={_id}>
            <Link className={`${isHome ? '' : 'gap-5 lg:grid lg:grid-cols-3'}`} to={`/posts/${_id}`}>
              {content.match(regex) && <img src={content.match(regex)[1]} alt='post images' loading='lazy' className='h-48 w-full object-cover object-center' />}
              <div className={`${isHome ? '' : 'lg:col-span-2 lg:my-0'} mt-5`}>
                <h2 className='line-clamp-1 text-lg font-bold leading-6 text-title'>{title}</h2>
                <p className='line-clamp-3 pt-3 text-sm leading-6 text-content'>{RemoveMarkdown(content)}</p>
              </div>
            </Link>
            {!isHome && tags.length > 0 && (
              <div>
                {tags.map((tag, idx) => (
                  <TagLink tag={tag} key={idx} />
                ))}
              </div>
            )}
            <div className='mt-5 flex w-full items-center justify-between text-xs text-other'>
              <p className='flex cursor-pointer items-center hover:underline hover:underline-offset-4' onClick={() => navigate(`/${displayName}`)}>
                <button className='mr-2 h-6 w-6 overflow-hidden rounded-full' type='button'>
                  <img src={avatar ? avatar : '/assets/profile.png'} alt='avatar' />
                </button>
                {displayName}
              </p>
              <span>{formatAgo(updatedAt, 'ko')}</span>
            </div>
          </article>
        ))}
    </>
  );
}
