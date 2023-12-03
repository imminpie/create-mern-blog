import User from '../models/User.js';

/* 사용자 프로필 등록 */
export const setUserProfile = async (req, res) => {
  try {
    const { _id, displayName, intro } = req.body;
    const updateFields = { displayName, intro };

    if (req.file) {
      const fileName = `http://localhost:5000/assets/${req.file.filename}`;
      updateFields.avatar = fileName;
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
