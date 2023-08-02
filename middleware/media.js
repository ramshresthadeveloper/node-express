const multer = require('multer')
const path=require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: async function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.zip') {
            return callback(new Error('Only images and zip are allowed'));
        }
        // I want next function to validate real ext of files here. 
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload;