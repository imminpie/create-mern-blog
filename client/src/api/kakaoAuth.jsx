import axios from 'axios';

/**
 * 인가 코드로 토큰 발급을 요청
 * @param {string} code - 인가 코드 받기 요청으로 얻은 인가 코드
 */
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

/**
 * 현재 로그인한 사용자의 정보를 불러오기
 * @param {String} accessToken - 엑세스 토큰으로 인증 요청
 */
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

/**
 * 카카오 계정으로 로그인을 수행
 * @param {Object} user - 로그인 시 필요한 사용자 정보
 */
export async function login(user) {
  const response = await axios.post(`http://localhost:5000/auth/kakao`, user);
  return response.data;
}

/**
 * 사용자 액세스 토큰과 리프레시 토큰을 모두 만료시킨다.
 * @param {String} accessToken - 액세스 토큰 값
 * @param {String} targetId - 서비스에서 로그아웃시킬 사용자의 회원번호
 */
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
