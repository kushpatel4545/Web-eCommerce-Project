const mongoose = require("mongoose");

const gCommentSchema = new mongoose.Schema({
    commentUserID:String,
    commentProductID:String,
    userRating:Number,
    commentImages:String,
    CommentText:String,
});

const googleComment = mongoose.model("googleComment", gCommentSchema);

module.exports = googleComment;