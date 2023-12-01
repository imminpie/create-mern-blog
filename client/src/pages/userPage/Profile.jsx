import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import PreviewImage from 'components/PreviewImage.jsx';
import InputField from 'components/InputField';
import { setUserProfile } from 'api/user';
import { Formik } from 'formik';
import useUserStore from 'state';
import * as yup from 'yup';

const AVATAR_DEFAULT = '/assets/profile.png';

export default function Profile() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const { user, token, setLogin } = useUserStore();

  const userSchema = yup.object().shape({
    displayName: yup.string().required('닉네임을 입력해 주세요.'),
  });

  const initialValues = {
    _id: user._id || '',
    email: user.email || '',
    displayName: user.displayName || '',
    intro: user.intro || '',
    avatar: user.avatar || AVATAR_DEFAULT,
    file: null,
  };

  const handleImageUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFile = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('file', file);
    }
  };

  const setUserProfileMutation = useMutation({
    mutationFn: setUserProfile,
    onSuccess: async (updatedUserProfile) => {
      const updatedUser = { user: updatedUserProfile, token };
      setLogin(updatedUser);
      navigate('/');
    },
    onError: async (error) => {
      console.error('Error submitting form:', error);
    },
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    const { file } = values;

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      formData.append('picturePath', file.name);
    }

    setUserProfileMutation.mutate(formData);
    resetForm();
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
      {({ values, handleSubmit, resetForm, setFieldValue }) => (
        <form onSubmit={handleSubmit} className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 text-title lg:px-8'>
          <div className='text-sm sm:mx-auto sm:w-full sm:max-w-sm'>
            <h1 className='title text-center'>회원정보 수정</h1>
            <div className='mt-10 grid gap-6'>
              <div className='flex flex-col items-center'>
                <div className='flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-neutral-300'>
                  <input className='hidden' type='file' name='file' onChange={(e) => handleFile(e, setFieldValue)} ref={inputRef} />
                  <PreviewImage file={values.file} avatar={values.avatar} />
                </div>
                <button className='btn-success mt-3 rounded-3xl px-5 py-2 text-white' type='button' onClick={handleImageUpload}>
                  이미지 편집
                </button>
              </div>
              <InputField type='text' label='이메일' name='email' disabled />
              <InputField type='text' label='닉네임' name='displayName' autoFocus />
              <InputField type='text' label='한 줄 소개' name='intro' />
              <button className='btn-success w-full py-3 text-white' type='submit'>
                수정
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
