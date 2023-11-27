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
