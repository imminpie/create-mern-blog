import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import { setImagePosts } from './controllers/posts.js';
import { setUserProfile } from './controllers/user.js';
import { fileURLToPath } from 'url';
import path from 'path';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('common'));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 한글 깨짐 문제 해결
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post('/posts/imagePosts', upload.single('picture'), setImagePosts);
app.patch('/user/profile', upload.single('file'), setUserProfile);

/* ROUTER */
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
