const express = require('express');
const { getUserProfile, updateProfile, uploadProfileImage } = require('../controllers/userController');
const upload = require('../config/s3');
const router = express.Router();

// Get user profile
router.get('/profile', getUserProfile);

// Update user profile (without image)
router.put('/profile', updateProfile);

// Upload profile image to AWS S3
router.post('/profile/image', upload.single('profileImage'), uploadProfileImage);

module.exports = router;
