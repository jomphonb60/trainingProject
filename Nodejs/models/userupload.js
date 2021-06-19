const mongoose = require('mongoose')
const UploadSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    imagesLeft: {
        type: String,
        require: true
    },
    imagesRight: {
        type: String,
        require: true
    },
    imagesTop: {
        type: String,
        require: true
    },
    imagesBottom: {
        type: String,
        require: true
    }
});
const Image = mongoose.model("images", UploadSchema);
module.exports = Image;