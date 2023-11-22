import React from 'react';
import { ClockIcon } from '@heroicons/react/24/solid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import { useAuthContext } from 'context/AuthContext';
import { deletePost, fetchPost } from 'api/posts';
import MDEditor from '@uiw/react-md-editor';
import useModals from 'hooks/useModals';
import Modals from 'components/Modals';
import { formatAgo } from 'util/date';
import NotFound from 'pages/NotFound';
import useStore from 'state';

export default function PostRead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, handleModalStateChange] = useModals();
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);
  const { isAuth } = useAuthContext();

  const {
    isLoading,
    isError,
    data: post,
  } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ id, token });
  };

  const handleClose = () => {
    handleModalStateChange();
  };

  const handleUserPosts = () => {
    const data = { writer: post.writer, displayName: post.displayName };
    navigate(`/@${post.displayName}`, { state: data });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  return (
    <>
      <section className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl py-12 lg:mx-0 lg:max-w-none'>
          <h1 className='text-3xl font-bold tracking-tight text-title'>{post.title}</h1>
          <div className='mb-6 mt-4 flex justify-between text-sm'>
            <p className='text-title'>
              <span className='cursor-pointer hover:underline hover:underline-offset-4' onClick={handleUserPosts}>
                {post.displayName}
              </span>
              <span className='px-2'>|</span>
              {formatAgo(post.updatedAt, 'ko')}
            </p>
            {isAuth && post.writer === user?._id && (
              <div className='text-other'>
                <button className='hover:text-content' onClick={() => navigate(`/posts/${id}/edit`)}>
                  수정
                </button>
                <button className='ml-3 hover:text-content' onClick={handleModalStateChange}>
                  삭제
                </button>
              </div>
            )}
          </div>
          {post.tags.map((tag, idx) => (
            <Link to={`/tags/${tag}`} key={idx} className='mr-3 inline-block h-8 rounded-2xl bg-accent px-4 text-sm leading-8 text-white'>
              # {tag}
            </Link>
          ))}
          <div className='my-12 text-base leading-7 text-title'>
            <MDEditor.Markdown source={`${post.content}`} />
          </div>
        </div>
      </section>
      {isOpen && <Modals isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} />}
    </>
  );
}
