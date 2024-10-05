const s3 = require('../config/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Multer configuration for S3 uploads
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'your-s3-bucket-name',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `profile-images/${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

// Controller for uploading profile image
exports.uploadProfileImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const imageUrl = req.file.location;
  res.status(200).json({ message: 'Profile image uploaded successfully', imageUrl });
};
