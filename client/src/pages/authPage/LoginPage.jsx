import LoginForm from 'components/LoginForm';
import { useNavigate } from 'react-router';
import useStore from 'state/index.js';
import { useState } from 'react';
import { login } from 'api/auth';
import * as yup from 'yup';

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
  const [isError, setIsError] = useState(false);
  const setLogin = useStore((state) => state.setLogin);

  const onLogin = async (values, onSubmitProps) => {
    try {
      const loggedIn = await login(values);
      onSubmitProps.resetForm();
      if (loggedIn) {
        setLogin({ user: loggedIn.user, token: loggedIn.token });
        navigate('/');
      }
    } catch (error) {
      console.error(error.response.data.message);
      setIsError(true);
    }
  };

  return <LoginForm pageType='login' initialValues={initialValuesLogin} validationSchema={loginSchema} onSubmit={onLogin} onError={isError} />;
}
