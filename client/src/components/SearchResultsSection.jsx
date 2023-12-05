import React from 'react';
import RemoveMarkdown from 'remove-markdown';
import TagDisplay from './TagDisplay';
import { formatAgo } from 'util/date';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function SearchResultsSection({ data }) {
  const AVATAR_DEFAULT = '/assets/profile.png';
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const getImagePath = (content) => {
    const regex = /!\[\]\((.*?)\)/;
    const match = content.match(regex);
    return match ? match[1] : null;
  };

  return (
    <>
      {isHome || (
        <p className='search-text'>
          총 <b>{data.length}</b>개의 게시글을 찾았습니다.
        </p>
      )}
      {data?.map(({ _id, title, content, tags, displayName, createdAt, avatar }) => (
        <article className={classNames({ isCard: isHome, noCard: !isHome, 'text-sm text-content': true })} key={_id}>
          <Link className={classNames({ 'block w-full': true, 'gap-8 lg:grid lg:grid-cols-3': !isHome })} to={`/posts/${_id}`}>
            {getImagePath(content) && (
              <img
                className={classNames({ 'lg:h-40': !isHome, 'h-48 w-full object-contain object-center': true })}
                src={getImagePath(content)}
                loading='lazy'
                alt='post'
              />
            )}
            <div className={classNames({ 'lg:col-span-2 lg:my-0': !isHome, 'mt-5': true })}>
              <h2 className='line-clamp-1 text-lg font-bold leading-6 text-title'>{title}</h2>
              <p className={classNames({ 'lg:line-clamp-5': !isHome, 'line-clamp-3 pt-3 text-sm leading-6 text-content': true })}>
                {RemoveMarkdown(content)}
              </p>
            </div>
          </Link>
          {isHome || (tags.length > 0 && <TagDisplay tags={tags} />)}
          <div className='mt-5 flex w-full items-center justify-between text-xs text-content'>
            <p
              className='flex cursor-pointer items-center hover:underline hover:underline-offset-4'
              onClick={() => navigate(`/${displayName}`)}
            >
              <button className='avatar-wrap mr-2 h-6 w-6' type='button'>
                <img src={avatar || AVATAR_DEFAULT} alt='avatar' className='h-full w-full object-cover' />
              </button>
              {displayName}
            </p>
            <span>{formatAgo(createdAt, 'ko')}</span>
          </div>
        </article>
      ))}
    </>
  );
}
