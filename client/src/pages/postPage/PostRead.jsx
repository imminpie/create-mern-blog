import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import { deletePost, getPost } from 'api/posts';
import TagDisplay from 'components/TagDisplay';
import MDEditor from '@uiw/react-md-editor';
import NotFound from 'components/NotFound';
import Wrapper from 'components/Wrapper';
import useModals from 'hooks/useModals';
import Modals from 'components/Modals';
import { formatAgo } from 'util/date';
import useUserStore from 'state';

export default function PostRead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, token } = useUserStore();
  const [isOpen, handleModalStateChange] = useModals();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
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
  if (isError) return <NotFound />;

  const { title, content, displayName, updatedAt, writer, tags } = data;

  return (
    <Wrapper>
      <h1 className='title'>{title}</h1>
      <div className='mt-4 flex justify-between text-sm'>
        <p className='flex gap-x-2 text-title'>
          <span className='cursor-pointer hover:underline hover:underline-offset-4' onClick={() => navigate(`/${displayName}`)}>
            {displayName}
          </span>
          <span>| {formatAgo(updatedAt, 'ko')}</span>
        </p>
        {token && writer === user?._id && (
          <div className='flex gap-x-3 text-other'>
            <button className='hover:text-content' onClick={() => navigate(`/posts/${id}/edit`)}>
              수정
            </button>
            <button className='hover:text-content' onClick={handleModalStateChange}>
              삭제
            </button>
          </div>
        )}
      </div>
      {tags && <TagDisplay tags={tags} />}
      <div className='my-12 text-base leading-7 text-title'>
        <MDEditor.Markdown source={content} />
      </div>
      {isOpen && <Modals isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} />}
    </Wrapper>
  );
}
