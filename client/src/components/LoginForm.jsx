import { Formik } from 'formik';
import { Link } from 'react-router-dom';

export default function LoginForm({ pageType, initialValues, validationSchema, onSubmit, onError }) {
  const isLogin = pageType === 'login';
  const handleFormSubmit = (values, onSubmitProps) => onSubmit(values, onSubmitProps);

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
        <form onSubmit={handleSubmit} className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='text-sm sm:mx-auto sm:w-full sm:max-w-sm'>
            <h1 className='text-center text-2xl font-bold text-title'>{isLogin ? '로그인' : '회원가입'}</h1>
            <p className='text-center leading-10 text-other'>{isLogin ? '이메일과 비밀번호를 입력해 주세요.' : '회원가입을 위해 아래의 정보를 입력해 주세요.'}</p>
            <div className='mt-10 grid gap-6 text-title'>
              <div>
                <label htmlFor='email'>이메일</label>
                <input type='text' onChange={handleChange} onBlur={handleBlur} value={values.email} name='email' id='email' placeholder='you@email.com' className='inputGroup' />
                {Boolean(touched.email) && Boolean(errors.email) && <p className='mt-1 text-danger'>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor='password'>비밀번호</label>
                <input
                  type='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name='password'
                  id='password'
                  placeholder='비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)'
                  autoComplete='off'
                  className='inputGroup'
                />
                {Boolean(touched.password) && Boolean(errors.password) && <p className='mt-1 text-danger'>{errors.password}</p>}
              </div>
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor='confirmPassword'>비밀번호 확인</label>
                    <input
                      type='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      name='confirmPassword'
                      id='confirmPassword'
                      placeholder='비밀번호 확인'
                      autoComplete='off'
                      className='inputGroup'
                    />
                    {Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword) && <p className='mt-1 text-danger'>{errors.confirmPassword}</p>}
                  </div>
                  <div>
                    <label htmlFor='displayName'>닉네임</label>
                    <input
                      type='text'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.displayName}
                      name='displayName'
                      id='displayName'
                      placeholder='닉네임 입력(2~10자)'
                      className='inputGroup'
                    />
                    {Boolean(touched.displayName) && Boolean(errors.displayName) && <p className='mt-1 text-danger'>{errors.displayName}</p>}
                  </div>
                </>
              )}

              {onError && <p className='text-danger'>아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.</p>}

              <button type='submit' className='btn-success py-3 text-white '>
                {isLogin ? '로그인' : '회원가입'}
              </button>
              <p className='cursor-pointer text-end text-other'>
                {isLogin ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}
                <span className='px-1'>&gt;</span>
                <Link to={isLogin ? '/register' : '/login'} className='font-bold text-accent'>
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
