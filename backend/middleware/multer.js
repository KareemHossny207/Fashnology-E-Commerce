const multer = require('multer');

// Use memory storage for Vercel deployment
// Vercel doesn't have persistent file system, so we can't use disk storage
const storage = multer.memoryStorage();

module.exports = multer({ storage: storage });