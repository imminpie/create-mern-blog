import LoginForm from 'components/LoginForm';
import { register } from 'api/auth';
import * as yup from 'yup';
import { useNavigate } from 'react-router';

const registerSchema = yup.object().shape({
  email: yup.string().email('이메일 형식이 올바르지 않습니다.').max(30, '최대 30자까지 가능합니다.').required('이메일을 입력해 주세요.'),
  password: yup
    .string()
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, '8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.')
    .required('비밀번호를 입력해 주세요.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 입력해 주세요.'),
  displayName: yup.string().min(2, '2~10자를 입력해 주세요.').max(10, '2~10자를 입력해 주세요.').required('닉네임을 입력해 주세요.'),
});

const initialValuesRegister = {
  email: '',
  password: '',
  confirmPassword: '',
  displayName: '',
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const onRegister = async (values, onSubmitProps) => {
    const savedUser = await register(values);
    onSubmitProps.resetForm();
    savedUser && navigate('/login');
  };
  return <LoginForm pageType='register' initialValues={initialValuesRegister} validationSchema={registerSchema} onSubmit={onRegister} onError={false} />;
}
