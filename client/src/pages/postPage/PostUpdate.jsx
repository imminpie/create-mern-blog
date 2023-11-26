import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import { fetchPost, updatePost } from 'api/posts';
import PostForm from 'components/PostForm';
import NotFound from 'pages/NotFound';
import useUserStore from 'state';
import Wrapper from 'components/Wrapper';

export default function PostUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useUserStore();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate(`/posts/${id}`);
    },
    onError: async (error) => {
      console.error(`An error occurred: ${error.message}`);
    },
  });

  const handleFormSubmit = (updatedPost) => {
    const post = { id, ...updatedPost };
    updatePostMutation.mutate({ post, token });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  return (
    <Wrapper>
      <PostForm onSubmit={handleFormSubmit} initialValue={data} />
    </Wrapper>
  );
}
