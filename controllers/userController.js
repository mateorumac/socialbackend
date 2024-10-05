const User = require('../models/User');
const s3 = require('../config/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Multer configuration for AWS S3
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `profile-images/${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload profile image
exports.uploadProfileImage = [
  upload.single('profileImage'),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.profileImage = req.file.location; // S3 file URL
      await user.save();
      res.json({ message: 'Profile image uploaded successfully', imageUrl: req.file.location });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
];
