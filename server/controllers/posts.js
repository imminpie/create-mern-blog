import Post from '../models/Post.js';
import User from '../models/User.js';

/**
 * 각 게시글에 작성자 정보를 추가하는 함수
 * @param {Array} posts - 게시글 정보
 * @returns {Promise<Array>} 추가된 사용자 정보를 반환
 */
const fetchUsersAndFormatPosts = async (posts) => {
  const users = await Promise.all(posts.map((post) => User.findById(post.writer)));
  return posts.map((post, idx) => ({
    ...post.toObject(),
    displayName: users[idx].displayName,
    avatar: users[idx].avatar,
    intro: users[idx].intro,
  }));
};

/* 새로운 게시글 생성 */
export const createPost = async (req, res) => {
  try {
    const { title, content, tags, user: writer } = req.body;
    const newPost = new Post({ title, content, tags, writer });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* 이미지 업로드 */
export const setImagePosts = async (req, res) => {
  try {
    const { filename } = req.file;
    res.status(201).json({ picturePath: filename });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* 게시글 목록 조회 */
export const getPosts = async (req, res) => {
  try {
    const { page = 0, pageSize = 6 } = req.query;
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(page * pageSize)
      .limit(parseInt(pageSize));

    const formattedPosts = await fetchUsersAndFormatPosts(posts);
    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* 특정 게시글 조회 */
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).sort({ createdAt: -1 });
    const formattedPost = await fetchUsersAndFormatPosts([post]);
    res.status(200).json(formattedPost[0]);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* 키워드로 게시글 조회 */
export const getSearch = async (req, res) => {
  try {
    const { q: keyword } = req.query;
    const posts = await Post.find({
      $or: [
        { title: { $regex: '.*' + keyword + '.*', $options: 'i' } },
        { content: { $regex: '.*' + keyword + '.*', $options: 'i' } },
        { tags: { $regex: '.*' + keyword + '.*', $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });

    const formattedPosts = await fetchUsersAndFormatPosts(posts);
    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* 태그로 게시글 조회 */
export const getSearchTags = async (req, res) => {
  try {
    const { q: tag } = req.query;
    const posts = await Post.find({ tags: tag }).sort({ createdAt: -1 });
    const formattedPosts = await fetchUsersAndFormatPosts(posts);
    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* 닉네임으로 게시글 조회 */
export const getSearchUserPosts = async (req, res) => {
  try {
    const { displayName } = req.params;
    const writer = await User.findOne({ displayName }, { _id: 1 });
    if (!writer) return res.status(200).end();

    const posts = await Post.find({ writer: writer._id }).sort({ createdAt: -1 });
    if (!posts.length) return res.status(200).end();

    const formattedPosts = await fetchUsersAndFormatPosts(posts);
    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* 게시글 수정 */
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = req.body;
    const post = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(200).json(post);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* 게시글 삭제 */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    res.status(204).json(deletedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
