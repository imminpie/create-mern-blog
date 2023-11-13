import axios from 'axios';

/* READ */
export async function fetchPosts() {
  const response = await axios.get('http://localhost:5000/posts');
  return response.data;
}

export async function fetchPost(id) {
  const response = await axios.get(`http://localhost:5000/posts/${id}`);
  return response.data;
}

/* POST */
export async function createPost(newPost) {
  const response = await axios.post(`http://localhost:5000/posts`, newPost);
  return response.data;
}

/* UPDATE */
export async function updatePost(updatedPost) {
  const response = await axios.patch(`http://localhost:5000/posts/${updatedPost.id}/edit`, updatedPost);
  return response.data;
}

/* DELETE */
export async function deletePost(id) {
  const response = await axios.delete(`http://localhost:5000/posts/${id}`);
  return response.data;
}
