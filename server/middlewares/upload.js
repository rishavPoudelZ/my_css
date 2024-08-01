const multer = require('multer');
const storage = require('../utils/multerStorage');

const upload = multer({ storage });

module.exports = upload;
