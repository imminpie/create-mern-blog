import axios from 'axios';

/**
 * 닉네임 중복 확인
 * @param {String} displayName - 닉네임
 * @returns {number} - 중복 여부 (0: 중복되지 않음, 1: 중복됨)
 */
export async function checkDisplayNameIsUnique(displayName) {
  const response = await axios.post(`http://localhost:5000/user/checkDisplayNameIsUnique`, displayName);
  return response.data;
}

/**
 * 사용자 프로필 등록
 * @param {Object} formData - 사용자 프로필 정보
 */
export async function setUserProfile(formData) {
  const response = await axios.patch('http://localhost:5000/user/profile', formData);
  return response.data;
}
