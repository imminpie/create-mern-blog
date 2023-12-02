import React, { useEffect } from 'react';
import { getAccessToken, getUserInfo, login } from 'api/kakaoAuth';
import LoadingSpinner from 'components/LoadingSpinner';
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
        const loggedIn = await login(user);

        if (loggedIn) {
          setLogin({ user: loggedIn.user, token: loggedIn.token, kakaoToken: accessToken });
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
