import Post from '../models/Post.js';
import User from '../models/User.js';

/**
 * 각 게시글 작성자에 대한 사용자 정보를 가져오고 게시글을 형식화하는 함수
 *
 * @param {Array} posts - Post 문서들로 이루어진 배열
 * @returns {Array} 추가된 사용자 정보가 포함된 형식화된 게시글들로 이루어진 배열
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

/* CREATE */
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

export const setImagePosts = async (req, res) => {
  try {
    const { filename } = req.file;
    res.status(201).json({ picturePath: filename });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* READ */
export const getPosts = async (req, res) => {
  try {
    const { page = 0, pageSize = 10 } = req.query;
    const posts = await Post.find()
      .skip(page * pageSize)
      .limit(parseInt(pageSize));

    const formattedPosts = await fetchUsersAndFormatPosts(posts);
    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    const formattedPost = await fetchUsersAndFormatPosts([post]);
    res.status(200).json(formattedPost[0]);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getSearch = async (req, res) => {
  try {
    const { q: keyword } = req.query;
    const posts = await Post.find({
      $or: [
        { title: { $regex: '.*' + keyword + '.*', $options: 'i' } },
        { content: { $regex: '.*' + keyword + '.*', $options: 'i' } },
        { tags: { $regex: '.*' + keyword + '.*', $options: 'i' } },
      ],
    });

    const formattedPosts = await fetchUsersAndFormatPosts(posts);
    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getSearchTags = async (req, res) => {
  try {
    const { q: tag } = req.query;
    const posts = await Post.find({ tags: tag });
    const formattedPosts = await fetchUsersAndFormatPosts(posts);
    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getSearchUserPosts = async (req, res) => {
  try {
    const { displayName } = req.params;

    const writer = await User.findOne({ displayName }, { _id: 1 });
    if (!writer) return res.status(200).end();

    const posts = await Post.find({ writer: writer._id });
    if (!posts.length) return res.status(200).end();

    const formattedPosts = await fetchUsersAndFormatPosts(posts);
    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* UPDATE */
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

/* DELETE */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(204).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
