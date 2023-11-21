import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import { deletePost, fetchPost } from 'api/posts';
import MDEditor from '@uiw/react-md-editor';
import useModals from 'hooks/useModals';
import Modals from 'components/Modals';
import { formatAgo } from 'util/date';
import Error from 'components/Error';
import useStore from 'state';

export default function PostRead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, handleModalStateChange] = useModals();
  const token = useStore((state) => state.token);

  const {
    isLoading,
    isError,
    data: post,
    error,
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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error message={error.message} />;

  return (
    <>
      <section className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto mt-2 max-w-2xl py-12 lg:mx-0 lg:max-w-none'>
          <h1 className='text-3xl font-bold tracking-tight text-title'>{post.title}</h1>
          <div className='mt-3 flex justify-between text-sm text-title'>
            <p>윤딴딴 &#124; {formatAgo(post.updatedAt, 'ko')}</p>
            <div className='text-other'>
              <button className='hover:text-content' onClick={() => navigate(`/posts/${id}/edit`)}>
                수정
              </button>
              <button className='ml-3 hover:text-content' onClick={handleModalStateChange}>
                삭제
              </button>
            </div>
          </div>
          {post.tags.map((tag, idx) => (
            <Link to={`/tags/${tag}`} key={idx} className='mb-3 mr-3 mt-5 inline-block h-8 rounded-2xl bg-accent px-4 text-sm leading-8 text-white'>
              # {tag}
            </Link>
          ))}
          <div className='mt-7 pb-12 text-base leading-7 text-title'>
            <MDEditor.Markdown source={`${post.content}`} />
          </div>
        </div>
      </section>
      {isOpen && <Modals isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} />}
    </>
  );
}
