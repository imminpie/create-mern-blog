import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import InputField from './InputField';
import KakaoLogin from './KaKaoLogin';

export default function LoginForm({ pageType, initialValues, validationSchema, onSubmit, IsError }) {
  const isLogin = pageType === 'login';
  const handleFormSubmit = (values, onSubmitProps) => onSubmit(values, onSubmitProps);

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {({ values, handleSubmit, resetForm }) => (
        <form onSubmit={handleSubmit} className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='text-sm sm:mx-auto sm:w-full sm:max-w-sm'>
            <h1 className='title text-center'>{isLogin ? '로그인' : '회원가입'}</h1>
            <p className='text-center leading-10 text-other'>{isLogin ? '이메일과 비밀번호를 입력해 주세요.' : '회원가입을 위해 아래의 정보를 입력해 주세요.'}</p>

            <div className='mt-10 grid gap-6 text-title'>
              <InputField type='text' label='이메일' name='email' placeholder='you@email.com' value={values.email} />
              <InputField type='password' label='비밀번호' name='password' placeholder='비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)' value={values.password} />

              {isLogin ? (
                <>
                  <p className='text-danger'>{IsError}</p>
                  <KakaoLogin />
                  <button className='btn-success py-3 text-white' type='submit'>
                    로그인
                  </button>
                </>
              ) : (
                <>
                  <InputField type='password' label='비밀번호 확인' name='confirmPassword' placeholder='비밀번호 확인' value={values.confirmPassword} />
                  <InputField type='text' label='닉네임' name='displayName' placeholder='닉네임 입력(2~10자)' value={values.displayName} />
                  <button className='btn-success py-3 text-white' type='submit'>
                    회원가입
                  </button>
                </>
              )}

              <p className='cursor-pointer text-end text-other'>
                {isLogin ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}
                <span className='px-1'>&gt;</span>
                <Link className='font-bold text-accent' to={isLogin ? '/register' : '/login'}>
                  {isLogin ? '회원가입' : '로그인'}
                </Link>
              </p>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
