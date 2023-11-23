import express from 'express';
import {
  createPost,
  getPosts,
  getPost,
  getSearch,
  getSearchTags,
  getSearchUserPosts,
  updatePost,
  deletePost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', getPosts);
router.get('/search', getSearch);
router.get('/tags', getSearchTags);
router.get('/userPosts/:displayName', getSearchUserPosts);
router.get('/:id', getPost);

/* CREATE */
router.post('/', verifyToken, createPost);

/* UPDATE */
router.patch('/:id/edit', verifyToken, updatePost);

/* DELETE */
router.delete('/:id', verifyToken, deletePost);

export default router;
