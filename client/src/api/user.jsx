import axios from 'axios';

export async function getUser(writer) {
  const response = await axios.get(`http://localhost:5000/user/${writer}`);
  return response.data;
}

export async function getUserInfo(formData) {
  const response = await axios.patch('http://localhost:5000/user/formData', formData);
  return response.data;
}
