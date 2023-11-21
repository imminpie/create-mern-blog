import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPost, updatePost } from 'api/posts';
import PostForm from 'components/PostForm';
import LoadingSpinner from 'components/LoadingSpinner';
import Error from 'components/Error';
import useStore from 'state';

export default function PostUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
  if (isError) return <Error message={error.message} />;

  return (
    <section className='mx-auto max-w-7xl px-6 lg:px-8'>
      <div className='mx-auto mt-2 max-w-2xl py-8 lg:mx-0 lg:max-w-none '>
        <PostForm onSubmit={handleFormSubmit} initialValue={post} />
      </div>
    </section>
  );
}
