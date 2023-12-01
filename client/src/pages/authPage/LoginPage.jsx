import LoginForm from 'components/LoginForm';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { login } from 'api/auth';
import * as yup from 'yup';
import useUserStore from 'state';

const loginSchema = yup.object().shape({
  email: yup.string().email('이메일 형식이 올바르지 않습니다.').required('이메일을 입력해 주세요.'),
  password: yup.string().required('비밀번호를 입력해 주세요.'),
});

const initialValuesLogin = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { setLogin } = useUserStore();

  const onLogin = async (values, { resetForm }) => {
    try {
      const loggedIn = await login(values);
      resetForm();
      if (loggedIn) {
        setLogin({ user: loggedIn.user, token: loggedIn.token });
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.');
    }
  };

  return <LoginForm pageType='login' initialValues={initialValuesLogin} validationSchema={loginSchema} onSubmit={onLogin} IsError={error} />;
}
