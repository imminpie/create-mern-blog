import Post from '../models/Post.js';

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const newPost = new Post({ title, content, tags });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* READ */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
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
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getSearchTags = async (req, res) => {
  try {
    const { q: tag } = req.query;
    const posts = await Post.find({ tags: tag });
    res.status(200).json(posts);
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
