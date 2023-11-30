import React from 'react';

export default function KakaoLogin() {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.href = KAKAO_URI;
  };

  return (
    <button type='button' onClick={handleLogin} style={{ background: '#FEE500' }}>
      <img src='/assets/kakao_login_large_narrow.png' alt='kakao login' className='mx-auto h-11' />
    </button>
  );
}
