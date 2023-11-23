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

export async function getSearch(keyword) {
  const response = await axios.get(`http://localhost:5000/posts/search`, { params: { q: keyword } });
  return response.data;
}

export async function getSearchTags(tag) {
  const response = await axios.get(`http://localhost:5000/posts/tags`, { params: { q: tag } });
  return response.data;
}

export async function getSearchUserPosts(displayName) {
  const response = await axios.get(`http://localhost:5000/posts/userPosts/${displayName}`);
  return response.data;
}

/* POST */
export async function createPost(newPost) {
  const { post, token } = newPost;
  const response = await axios.post(`http://localhost:5000/posts`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function uploadPicture(formData) {
  const response = await axios.post('http://localhost:5000/posts/imagePosts', formData);
  return response.data;
}

/* UPDATE */
export async function updatePost(updatedPost) {
  const { post, token } = updatedPost;
  const response = await axios.patch(`http://localhost:5000/posts/${post.id}/edit`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

/* DELETE */
export async function deletePost(deletedPost) {
  const { id, token } = deletedPost;
  const response = await axios.delete(`http://localhost:5000/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
