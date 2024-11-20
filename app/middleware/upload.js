const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './app/uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        // Chỉ cần sử dụng tên file để trả về đường dẫn mong muốn
        cb(null, + Date.now() + ext); // Đường dẫn sẽ là "uploads/1729698525566.png"
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/bmp", "image/webp", "image/svg+xml"];
        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            console.log('only supported image types!');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

module.exports = upload;

