import React, { useRef } from 'react';
import { Field, Formik } from 'formik';
import useUserStore from 'state';
import PreviewImage from 'components/PreviewImage.jsx';
import { useNavigate } from 'react-router-dom';
import { setUserProfile } from 'api/user';
import * as yup from 'yup';

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
    avatar: user.avatar || '/assets/profile.png',
    file: null,
  };

  const handleImageUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFile = (e, setFieldValue) => {
    setFieldValue('file', e.target.files[0]);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const { file } = values;

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (file) {
        formData.append('picturePath', file.name);
      }

      const updated = await setUserProfile(formData);
      onSubmitProps.resetForm();

      if (updated) {
        setLogin({ user: updated, token });
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
      {({ values, errors, touched, handleBlur, handleSubmit, resetForm, setFieldValue }) => (
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
              <div>
                <label htmlFor='email'>이메일</label>
                <Field className='inputField' name='email' id='email' disabled />
              </div>
              <div>
                <label htmlFor='displayName'>닉네임</label>
                <Field className='inputField' name='displayName' id='displayName' placeholder='닉네임 입력(2~10자)' autoFocus />
                {Boolean(touched.displayName) && Boolean(errors.displayName) && <p className='mt-1 text-danger'>{errors.displayName}</p>}
              </div>
              <div>
                <label htmlFor='intro'>한 줄 소개</label>
                <Field className='inputField' name='intro' id='intro' placeholder='한 줄 소개 입력(20자)' />
              </div>
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
