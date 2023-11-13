import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';
import useFormValidation from 'hooks/useFormValidation';

export default function PostForm({ onSubmit, initialValue }) {
  const navigate = useNavigate();
  const [isFormValid] = useFormValidation();
  const [post, setPost] = useState({
    title: initialValue.title || '',
    content: initialValue.content || '',
  });

  const handleChangeTitle = (e) => {
    setPost({
      ...post,
      title: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isFormValid({ post })) {
      onSubmit(post);
      setPost({ title: '', content: '' });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input value={post.title} onChange={handleChangeTitle} className='input mb-5 h-12 text-3xl outline-none' name='title' type='text' placeholder='제목을 입력하세요' />
      <MDEditor value={post.content} onChange={(content) => setPost({ ...post, content })} height='calc(100vh - 340px)' textareaProps={{ placeholder: '내용을 입력하세요', name: 'content' }} />
      <footer className='fixed bottom-0 left-0 right-0 z-50 w-full bg-white shadow-[0px_0px_8px_rgba(0,0,0,0.1)]'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto mt-2 max-w-2xl py-6 text-end lg:mx-0 lg:max-w-none'>
            <button type='button' onClick={() => navigate('/')} className='mb-2 w-full bg-neutral-300 py-2 font-bold text-white transition-colors hover:bg-neutral-400 sm:mb-0 sm:w-28'>
              나가기
            </button>
            <button type='submit' className='w-full bg-teal-400 py-2 font-bold text-white transition-colors hover:bg-teal-500 sm:mb-0 sm:ml-2 sm:w-28'>
              {initialValue.title ? '수정' : '등록'}
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}
