import User from '../models/User.js';

export const setUserInfo = async (req, res) => {
  try {
    const { _id, displayName, intro } = req.body;

    if (req.file) {
      const fileName = `http://localhost:5000/assets/${req.file.filename}`;
      const updated = await User.findByIdAndUpdate(_id, { displayName, intro, avatar: fileName });
      const user = await User.findOne(updated._id);
      res.status(201).json(user);
    } else {
      const updated = await User.findByIdAndUpdate(_id, { displayName, intro });
      const user = await User.findOne(updated._id);
      res.status(201).json(user);
    }
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};
