import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import useFormValidation from 'hooks/useFormValidation';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BASIC_URL;
const initialValues = { title: '', content: '' };

export default function PostCreate() {
  const navigate = useNavigate();
  const [isFormValid] = useFormValidation();
  const [formData, setFormData] = useState({ initialValues });

  const handleTitleChange = (e) => setFormData((prev) => ({ ...prev, title: e.target.value }));

  const mutation = useMutation({
    mutationFn: ({ formData }) => axios.post(API_URL, formData),
    onSuccess: async () => navigate('/'),
    onError: async (error) => {
      console.error(`An error occurred: ${error.message}`);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    isFormValid({ formData }) && mutation.mutate({ formData });
  };

  return (
    <section className='mx-auto max-w-7xl px-6 lg:px-8'>
      <div className='mx-auto mt-2 max-w-2xl py-12 lg:mx-0 lg:max-w-none '>
        <form onSubmit={handleFormSubmit}>
          <input className='input mb-5 text-3xl outline-none' name='title' type='text' value={formData.title} onChange={handleTitleChange} placeholder='제목을 입력하세요' />
          <MDEditor
            value={formData.content}
            height='calc(100vh - 340px)'
            textareaProps={{ placeholder: '내용을 입력하세요', name: 'content' }}
            onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
          />
          <footer className='fixed bottom-0 left-0 right-0 z-50 w-full bg-white shadow-[0px_0px_8px_rgba(0,0,0,0.1)]'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <div className='mx-auto mt-2 max-w-2xl py-6 text-end lg:mx-0 lg:max-w-none'>
                <button type='button' onClick={() => navigate('/')} className='mb-2 w-full bg-neutral-300 py-2 font-bold text-white transition-colors hover:bg-neutral-400 sm:mb-0 sm:w-28'>
                  나가기
                </button>
                <button type='submit' className='w-full bg-teal-400 py-2 font-bold text-white transition-colors hover:bg-teal-500 sm:mb-0 sm:ml-2 sm:w-28'>
                  등록
                </button>
              </div>
            </div>
          </footer>
        </form>
      </div>
    </section>
  );
}
