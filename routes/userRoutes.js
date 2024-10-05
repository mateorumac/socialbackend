const express = require('express');
const { getUserProfile, updateProfile, uploadProfileImage } = require('../controllers/userController');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', authenticateToken, getUserProfile);

// Update user profile
router.put('/profile', authenticateToken, updateProfile);

// Upload profile image
router.post('/profile/image', authenticateToken, uploadProfileImage);

module.exports = router;
