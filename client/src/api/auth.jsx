import axios from 'axios';

export async function register(users) {
  const response = await axios.post('http://localhost:5000/auth/register', users);
  return response.data;
}

export async function login(users) {
  const response = await axios.post('http://localhost:5000/auth/login', users);
  return response.data;
}
