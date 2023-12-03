import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * JWT 토큰 생성
 * @param {Object} res - EXPRESS 응답 객체
 * @param {Object} user - 사용자 정보
 */
const generateTokenAndRespond = (res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token, user });
};

/**
 * bcrypt 를 사용하여 비밀번호 해싱
 * @param {String} password - 해싱할 비밀번호
 * @returns {Promise<String>} - 해싱된 비밀번호
 */
const getPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * bcrypt 를 사용하여 입력된 비밀번호와 사용자 비밀번호를 비교
 * @param {String} inputPassword - 입력된 비밀번호
 * @param {String} userPassword  - 해싱된 비밀번호
 * @returns {Promise<boolean>} - 비밀번호 일치 여부를 반환
 */
const getPasswordIsMatch = async (inputPassword, userPassword) => {
  return await bcrypt.compare(inputPassword, userPassword);
};

/* 회원가입 */
export const register = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    const passwordHash = await getPasswordHash(password);

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

/* 이메일 중복 확인 */
export const checkEmailIsUnique = async (req, res) => {
  try {
    const { email } = req.body;
    const isUnique = await User.find({ email: email }).count();
    res.status(201).json(isUnique);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* 로그인 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).send('User does not exist.');

    const isMatch = await getPasswordIsMatch(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    delete user.password;
    generateTokenAndRespond(res, user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* 카카오 회원가입 및 로그인 */
export const kakaoLogin = async (req, res) => {
  try {
    const {
      id,
      kakao_account: {
        email,
        profile: { nickname },
      },
    } = req.body;

    // 사용자가 존재하는지 확인
    const user = await User.findOne({ email: email });
    const password = process.env.KAKAO_LOGIN_PASSWORD;

    // 사용자가 존재하면 제공되는 비밀번호가 일치하는 확인
    if (user) {
      const isMatch = await getPasswordIsMatch(password, user.password);
      if (!isMatch) return res.status(400).send('Invalid credentials');

      // 사용자 객체에서 비밀번호를 제거하고 토큰 생성
      delete user.password;
      generateTokenAndRespond(res, user);
    } else {
      // 사용자가 존재하지 않으면 카카오 정보로 회원가입
      const passwordHash = await getPasswordHash(password);

      const newUser = new User({
        email,
        kakaoId: id,
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
