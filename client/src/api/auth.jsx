import axios from 'axios';

/* REGISTER */
export async function register(users) {
  const response = await axios.post('http://localhost:5000/auth/register', users);
  return response.data;
}

/* LOGIN */
export async function login(users) {
  const response = await axios.post('http://localhost:5000/auth/login', users);
  return response.data;
}

/*  KAKAO ACCESS TOKEN */
export async function getAccessToken(code) {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const response = await axios.post(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
    {},
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    },
  );
  return response.data.access_token;
}

/* KAKAO USER INFO */
export async function getUserInfo(accessToken) {
  const response = await axios.post(
    `https://kapi.kakao.com/v2/user/me`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    },
  );
  return response.data;
}

/* KAKAO LOGIN */
export async function loginUser(user) {
  const response = await axios.post(`http://localhost:5000/auth/kakao`, user);
  return response.data;
}

/* KAKAO LOGOUT */
export async function logout(accessToken, targetId) {
  const response = await axios.post(
    `https://kapi.kakao.com/v1/user/logout`,
    { target_id_type: 'user_id', target_id: targetId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
}
