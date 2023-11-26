import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import { deletePost, fetchPost } from 'api/posts';
import MDEditor from '@uiw/react-md-editor';
import useModals from 'hooks/useModals';
import Modals from 'components/Modals';
import { formatAgo } from 'util/date';
import NotFound from 'pages/NotFound';
import useUserStore from 'state';
import Wrapper from 'components/Wrapper';
import TagLink from 'components/TagLink';

export default function PostRead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, handleModalStateChange] = useModals();
  const { user, token } = useUserStore();

  const { isLoading, isError, data } = useQuery({
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
  if (isError) return <NotFound />;

  return (
    <Wrapper>
      <h1 className='title'>{data.title}</h1>
      <div className='mt-4 flex justify-between text-sm'>
        <p className='flex gap-x-2 text-title'>
          <span className='cursor-pointer hover:underline hover:underline-offset-4' onClick={() => navigate(`/${data.displayName}`)}>
            {data.displayName}
          </span>
          <span>|</span>
          {formatAgo(data.updatedAt, 'ko')}
        </p>
        {token && data.writer === user?._id && (
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
      {data.tags && data.tags.map((tag, idx) => <TagLink tag={tag} key={idx} />)}
      <div className='my-12 text-base leading-7 text-title'>
        <MDEditor.Markdown source={data.content} />
      </div>
      {isOpen && <Modals isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} />}
    </Wrapper>
  );
}
