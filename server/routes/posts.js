import express from 'express';
import { createPost, getPosts, getPost, updatePost, deletePost } from '../controllers/posts.js';

const router = express.Router();

/* READ */
router.get('/', getPosts);
router.get('/:id', getPost);

/* CREATE */
router.post('/', createPost);

/* UPDATE */
router.patch('/:id/edit', updatePost);

/* DELETE */
router.delete('/:id', deletePost);

export default router;
