import axios from 'axios';

export async function setUserProfile(formData) {
  const response = await axios.patch('http://localhost:5000/user/formData', formData);
  return response.data;
}
