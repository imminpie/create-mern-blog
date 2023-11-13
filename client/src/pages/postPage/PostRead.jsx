import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, fetchPost } from 'api/posts';
import MDEditor from '@uiw/react-md-editor';
import useModals from 'hooks/useModals';
import Modals from 'components/Modals';

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
            <h1 className='text-3xl font-bold tracking-tight'>{post.title}</h1>
            <p className='mt-2 text-sm text-gray-500'>Michael Foster / {new Date(post.updatedAt).toLocaleDateString()}</p>
          </div>
          <div className='py-3 text-end text-gray-500'>
            <button className='hover:text-gray-600' onClick={() => navigate(`/posts/${id}/edit`)}>
              수정
            </button>
            <button className='ml-2 hover:text-gray-600' onClick={handleModalStateChange}>
              삭제
            </button>
          </div>
          <div className='mt-7 pb-12 text-base leading-7 text-gray-700'>
            <MDEditor.Markdown source={`${post.content}`} />
          </div>
        </div>
      </section>
      {isOpen && <Modals isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} />}
    </>
  );
}
