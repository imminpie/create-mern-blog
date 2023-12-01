import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      max: 30,
      trim: true,
      lowercase: true,
    },
    snsId: {
      type: String,
      default: -1,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 20,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 10,
      trim: true,
    },
    intro: {
      type: String,
      max: 20,
    },
    avatar: {
      type: String,
    },
    file: {
      type: Object,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
