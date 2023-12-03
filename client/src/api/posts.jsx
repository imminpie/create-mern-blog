import axios from 'axios';

/**
 * 게시글 목록 조회
 * @param {number} pageParam - 페이지 번호
 */
export async function getPosts(pageParam) {
  const response = await axios.get(`http://localhost:5000/posts?page=${pageParam}&pageSize=6`);
  return response.data;
}

/**
 * 특정 게시글 조회
 * @param {String} id - 게시글 아이디
 */
export async function getPost(id) {
  const response = await axios.get(`http://localhost:5000/posts/${id}`);
  return response.data;
}

/**
 * 키워드로 게시글 조회
 * @param {String} keyword - 키워드
 */
export async function getSearch(keyword) {
  const response = await axios.get(`http://localhost:5000/posts/search?q=${keyword}`);
  return response.data;
}

/**
 *  태그로 게시글 조회
 * @param {String} tag - 태그
 */
export async function getSearchTags(tag) {
  const response = await axios.get(`http://localhost:5000/posts/tags?q=${tag}`);
  return response.data;
}

/**
 * 닉네임으로 게시글 조회
 * @param {String} displayName - 닉네임
 */
export async function getSearchUserPosts(displayName) {
  const response = await axios.get(`http://localhost:5000/posts/userPosts/${displayName}`);
  return response.data;
}

/**
 * 새로운 게시글 생성
 * @param {Object} newPost - 게시글 정보
 */
export async function createPost(newPost) {
  const { post, token } = newPost;
  const response = await axios.post(`http://localhost:5000/posts`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

/**
 * 게시글 이미지 업로드
 * @param {Object} formData - 이미지 데이터
 */
export async function uploadPicture(formData) {
  const response = await axios.post('http://localhost:5000/posts/imagePosts', formData);
  return response.data;
}

/**
 * 게시글 수정
 * @param {Object} updatedPost - 게시글 정보
 */
export async function updatePost(updatedPost) {
  const { post, token } = updatedPost;
  const response = await axios.patch(`http://localhost:5000/posts/${post.id}/edit`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

/**
 * 게시글 삭제
 * @param {Object} deletedPost - 게시글 정보
 */
export async function deletePost(deletedPost) {
  const { id, token } = deletedPost;
  const response = await axios.delete(`http://localhost:5000/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
