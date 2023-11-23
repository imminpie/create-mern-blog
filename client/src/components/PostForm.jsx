import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormValidation from 'hooks/useFormValidation';
import { useDarkMode } from 'context/DarkModeContext';
import TagInput from './TagInput';
import MyEditor from './MyEditor';

export default function PostForm({ onSubmit, initialValue }) {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [isFormValid] = useFormValidation();
  const [post, setPost] = useState({
    title: initialValue.title || '',
    content: initialValue.content || '',
    tags: initialValue.tags || [],
    picturePath: initialValue.picturePath || '',
  });

  const handleChangeTitle = (e) => {
    setPost({
      ...post,
      title: e.target.value,
    });
  };

  const handleContentChange = (content) => {
    setPost({ ...post, content });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isFormValid({ post })) {
      onSubmit(post);
      setPost({ title: '', content: '', tags: [] });
    }
  };

  return (
    <form onSubmit={handleFormSubmit} data-color-mode={darkMode ? 'dark' : 'light'}>
      <input value={post.title} onChange={handleChangeTitle} className='input mb-5 h-12 w-full bg-main text-3xl text-title outline-none' name='title' type='text' placeholder='제목을 입력하세요' />
      <TagInput post={post} setPost={setPost} />
      <MyEditor content={post.content} setContent={handleContentChange} />
      <footer className='fixed bottom-0 left-0 right-0 z-50 w-full bg-sub shadow-[0px_0px_8px_rgba(0,0,0,0.1)]'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto mt-2 max-w-2xl py-6 text-end lg:mx-0 lg:max-w-none'>
            <button type='button' onClick={() => navigate('/')} className='mb-2 w-full bg-neutral-400 py-2 font-bold text-sub transition-colors hover:bg-closeHover sm:mb-0 sm:w-28'>
              나가기
            </button>
            <button type='submit' className='w-full bg-accent py-2 font-bold text-sub transition-colors hover:bg-accentHover sm:mb-0 sm:ml-2 sm:w-28'>
              {initialValue.title ? '수정' : '등록'}
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}
