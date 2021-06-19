const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/')
    },
    filename: function (req, file, res) {
        console.log(file);
        res(null, Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        console.log("testupload")
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
            callback(null, true);
        }
        else {
            console.log(
                'Only jpg or png file'
            )
            callback(null, true);
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 720
    },
})
module.exports = upload;

