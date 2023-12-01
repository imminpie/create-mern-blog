import { getAccessToken, getUserInfo, loginUser } from 'api/auth';
import LoadingSpinner from 'components/LoadingSpinner';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'state';

export default function KakaoCallback() {
  const { setLogin } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const code = new URL(document.location.href).searchParams.get('code');

        const accessToken = await getAccessToken(code);
        const user = await getUserInfo(accessToken);
        const loggedIn = await loginUser(user);

        if (loggedIn) {
          setLogin({ user: loggedIn.user, token: loggedIn.token, snsToken: accessToken });
          navigate('/');
        }
      } catch (error) {
        console.error('Login API error:', error);
      }
    };
    authenticateUser();
  }, [setLogin, navigate]);

  return <LoadingSpinner />;
}
