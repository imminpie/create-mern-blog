import express from 'express';
import { register, login, kakaoLogin } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/kakao', kakaoLogin);

export default router;
