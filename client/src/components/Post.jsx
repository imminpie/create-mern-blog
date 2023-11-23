import React from 'react';
import RemoveMarkdown from 'remove-markdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { formatAgo } from 'util/date';

export default function Post({ data }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleUserPosts = (displayName, writer) => {
    navigate(`/@${displayName}`, { state: { displayName, writer } });
  };

  const regex = /!\[\]\((.*?)\)/; // 이미지 경로가 있는 패턴을 정의

  return (
    <>
      {data &&
        data.map((post) => (
          <article key={post._id} className={`${location.pathname === '/' ? 'card' : 'mb-12'} text-sm text-content`}>
            <Link to={`/posts/${post._id}`}>
              <div className={`${location.pathname === '/' ? '' : 'lg:grid lg:grid-cols-3 lg:gap-x-8'} group relative`}>
                {post.content.match(regex) && <img src={post.content.match(regex)[1]} alt='post images' className='h-48 w-full object-cover object-center' loading='lazy' />}
                <div className='col-span-2'>
                  <h3 className='mt-3 line-clamp-1 text-lg font-semibold leading-6 text-title group-hover:text-content'>{post.title}</h3>
                  <p className='mt-5 line-clamp-3 leading-6'>{RemoveMarkdown(post.content)}</p>
                </div>
              </div>
            </Link>
            {location.pathname !== '/' && post.tags.length > 0 && (
              <div>
                {post.tags.map((tag, idx) => (
                  <Link to={`/tags/${tag}`} key={idx} className='mr-2 mt-5 inline-block cursor-pointer rounded-2xl bg-accent px-3 py-1.5 text-white hover:bg-accentHover'>
                    # {tag}
                  </Link>
                ))}
              </div>
            )}
            <div className='relative mt-8 flex w-full items-center justify-between gap-x-2 text-xs text-other'>
              <div className='flex items-center gap-x-2'>
                <UserCircleIcon className='h-6 w-6' />
                <p className='cursor-pointer hover:underline hover:underline-offset-4' onClick={() => handleUserPosts(post.displayName, post.writer)}>
                  {post.displayName}
                </p>
              </div>
              <p>{formatAgo(post.updatedAt, 'ko')}</p>
            </div>
          </article>
        ))}
    </>
  );
}
