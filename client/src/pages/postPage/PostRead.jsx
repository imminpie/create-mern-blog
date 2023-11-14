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
            <h1 className='text-title text-3xl font-bold tracking-tight'>{post.title}</h1>
            <p className='text-other mt-2 text-sm'>Michael Foster / {new Date(post.updatedAt).toLocaleDateString()}</p>
          </div>
          <div className='text-other py-3 text-end'>
            <button className='hover:text-content' onClick={() => navigate(`/posts/${id}/edit`)}>
              수정
            </button>
            <button className='hover:text-content ml-2' onClick={handleModalStateChange}>
              삭제
            </button>
          </div>
          <div className='text-title mt-7 pb-12 text-base leading-7'>
            <MDEditor.Markdown source={`${post.content}`} />
          </div>
        </div>
      </section>
      {isOpen && <Modals isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} />}
    </>
  );
}
