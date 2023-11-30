import { getAccessToken, getUserInfo, loginUser } from 'api/auth';
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
          setLogin({ user: loggedIn.user, token: loggedIn.token });
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    };
    authenticateUser();
  }, []);

  return <div></div>;
}
