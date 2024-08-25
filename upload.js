const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
require('dotenv').config();

// Ensure environment variables are loaded
console.log('Bucket Name:', process.env.S3_BUCKET_NAME); // Added for debugging

// Configure AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Configure Multer to use S3 for storage
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,  // This should match your .env variable
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

module.exports = upload;
