import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import PostForm from 'components/PostForm';
import { createPost } from 'api/posts';
import useUserStore from 'state';
import Wrapper from 'components/Wrapper';

export default function PostCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, token } = useUserStore();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
    },
    onError: async (error) => {
      console.error('Create Post error:', error);
    },
  });

  const handleAddPost = (newPost) => {
    const post = { ...newPost, user: user._id };
    createPostMutation.mutate({ post, token });
  };

  return (
    <Wrapper>
      <PostForm onSubmit={handleAddPost} initialValue={{}} />
    </Wrapper>
  );
}
