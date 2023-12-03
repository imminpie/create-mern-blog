import express from 'express';
import { register, login, kakaoLogin, checkEmailIsUnique } from '../controllers/auth.js';

const router = express.Router();

/* CREATE */
router.post('/register', register);
router.post('/login', login);
router.post('/kakao', kakaoLogin);
router.post('/checkEmailIsUnique', checkEmailIsUnique);

export default router;
