const mongoose =require('mongoose')
const UploadSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    images:{
        type:String,
        require:true
    }
});
const Image = mongoose.model("images",UploadSchema);
module.exports = Image;