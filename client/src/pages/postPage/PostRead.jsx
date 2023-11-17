import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, fetchPost } from 'api/posts';
import MDEditor from '@uiw/react-md-editor';
import useModals from 'hooks/useModals';
import Modals from 'components/Modals';
import { formatAgo } from 'util/date';

export default function PostRead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, handleModalStateChange] = useModals();

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
    deleteMutation.mutate(id);
  };

  const handleClose = () => {
    handleModalStateChange();
  };

  if (isLoading) return 'Loading...';
  if (isError) return `Error: ${error.message}`;

  return (
    <>
      <section className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto mt-2 max-w-2xl py-12 lg:mx-0 lg:max-w-none'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-title'>{post.title}</h1>
            <p className='mt-3 text-sm text-other'>윤딴딴 / {formatAgo(post.updatedAt, 'ko')}</p>
          </div>
          <div className='py-3 text-end text-other'>
            <button className='hover:text-content' onClick={() => navigate(`/posts/${id}/edit`)}>
              수정
            </button>
            <button className='ml-2 hover:text-content' onClick={handleModalStateChange}>
              삭제
            </button>
          </div>
          <div className=''>
            {post.tags.map((tag, idx) => (
              <span key={idx} className='bg-accent mb-3 mr-3 inline-block h-8 rounded-2xl px-4 text-sm leading-8 text-white'>
                # {tag}
              </span>
            ))}
          </div>
          <div className='mt-7 pb-12 text-base leading-7 text-title'>
            <MDEditor.Markdown source={`${post.content}`} />
          </div>
        </div>
      </section>
      {isOpen && <Modals isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} />}
    </>
  );
}
