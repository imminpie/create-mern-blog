import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: 'User does not exist.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const kakaoLogin = async (req, res) => {
  try {
    const {
      id,
      kakao_account: {
        email,
        profile: { nickname },
      },
    } = req.body;

    const user = await User.findOne({ email: email });
    const password = id + email;

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      generateTokenAndRespond(res, user);
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        snsId: id,
        password: passwordHash,
        displayName: nickname,
      });

      const createdUser = await newUser.save();
      generateTokenAndRespond(res, createdUser);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generateTokenAndRespond = (res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token, user });
};
