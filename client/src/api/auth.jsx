import axios from 'axios';

/**
 * 회원가입
 * @param {Object} users - 회원정보
 */
export async function register(users) {
  const response = await axios.post('http://localhost:5000/auth/register', users);
  return response.data;
}

/**
 * 이메일 중복 확인
 * @param {String} email - 이메일
 * @returns {number} - 중복 여부 (0: 신규 회원, 1: 기존 회원)
 */
export async function checkEmailIsUnique(email) {
  const response = await axios.post(`http://localhost:5000/auth/checkEmailIsUnique`, email);
  return response.data;
}

/**
 * 로그인
 * @param {Object} users - 회원정보
 */
export async function login(users) {
  const response = await axios.post('http://localhost:5000/auth/login', users);
  return response.data;
}
