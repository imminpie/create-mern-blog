import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';
import useFormValidation from 'hooks/useFormValidation';
import { useDarkMode } from 'context/DarkModeContext';

export default function PostForm({ onSubmit, initialValue }) {
  const { darkMode } = useDarkMode();
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
    <form onSubmit={handleFormSubmit} data-color-mode={darkMode ? 'dark' : 'light'}>
      <input value={post.title} onChange={handleChangeTitle} className='input bg-main text-title mb-5 h-12 w-full text-3xl outline-none' name='title' type='text' placeholder='제목을 입력하세요' />
      <MDEditor value={post.content} onChange={(content) => setPost({ ...post, content })} height='calc(100vh - 340px)' textareaProps={{ placeholder: '내용을 입력하세요', name: 'content' }} />
      <footer className='bg-sub fixed bottom-0 left-0 right-0 z-50 w-full shadow-[0px_0px_8px_rgba(0,0,0,0.1)]'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto mt-2 max-w-2xl py-6 text-end lg:mx-0 lg:max-w-none'>
            <button type='button' onClick={() => navigate('/')} className='text-sub mb-2 w-full bg-neutral-400 py-2 font-bold transition-colors hover:bg-neutral-500 sm:mb-0 sm:w-28'>
              나가기
            </button>
            <button type='submit' className='text-sub w-full bg-teal-400 py-2 font-bold transition-colors hover:bg-teal-500 sm:mb-0 sm:ml-2 sm:w-28'>
              {initialValue.title ? '수정' : '등록'}
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}
