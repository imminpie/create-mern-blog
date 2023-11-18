import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTER */
app.use('/posts', postRoutes);

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
