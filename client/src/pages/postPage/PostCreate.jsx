import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import PostForm from 'components/PostForm';
import { createPost } from 'api/posts';

export default function PostCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
    },
    onError: async (error) => {
      console.error(`An error occurred: ${error.message}`);
    },
  });

  const handleAddPost = (post) => {
    createPostMutation.mutate(post);
  };

  return (
    <section className='mx-auto max-w-7xl px-6 lg:px-8'>
      <div className='mx-auto mt-2 max-w-2xl py-8 lg:mx-0 lg:max-w-none '>
        <PostForm onSubmit={handleAddPost} initialValue={{}} />
      </div>
    </section>
  );
}
