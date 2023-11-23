import Post from '../models/Post.js';
import User from '../models/User.js';

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
    const file = req.file.filename;
    res.status(201).json({ picturePath: file });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* READ */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    const users = await Promise.all(posts.map((post) => User.findById(post.writer)));

    const formattedPosts = posts.map((post, idx) => ({
      ...post.toObject(),
      displayName: users[idx].displayName,
    }));

    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    const users = await User.findById(post.writer);

    const formattedPosts = { ...post.toObject(), displayName: users.displayName };
    res.status(200).json(formattedPosts);
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

    const users = await Promise.all(posts.map((post) => User.findById(post.writer)));

    const formattedPosts = posts.map((post, idx) => ({
      ...post.toObject(),
      displayName: users[idx].displayName,
    }));

    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getSearchTags = async (req, res) => {
  try {
    const { q: tag } = req.query;
    const posts = await Post.find({ tags: tag });
    const users = await Promise.all(posts.map((post) => User.findById(post.writer)));

    const formattedPosts = posts.map((post, idx) => ({
      ...post.toObject(),
      displayName: users[idx].displayName,
    }));

    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getSearchUserPosts = async (req, res) => {
  try {
    const { displayName } = req.params;

    const writer = await User.findOne({ displayName }, { _id: 1 });
    if (!writer) return res.status(200).json([]);

    const posts = await Post.find({ writer: writer._id });
    if (!posts.length) return res.status(200).json([]);

    const users = await User.findById(writer);

    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),
      displayName: users.displayName,
    }));

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
