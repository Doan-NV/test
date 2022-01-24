const mongoose = require('mongoose')
const PostSchema = require('../models/Post');
const CommentShema = require('../models/Comment')
const UserSchema = require('../models/User')
const { ObjectId } = mongoose.Types;
async function addComment(postId, data) {
    const response = {};
    const post = await PostSchema.findOne({
        isDeleted: false,
        _id: new ObjectId(postId)
    }).exec();

    if (!post) {
        response.code = 400;
        response.status = 'error';
        response.message = 'post not found';
    }
    const newComment = new CommentShema();
    newComment.postId = new ObjectId(postId);
    newComment.content = data.content ? data.content : " ";
    // newComment.createdBy = new ObjectId(data.userId);
    newComment.createdBy = new ObjectId(postId);
    newComment.parentCommentId = data.parentCommentId ? new ObjectId(data.parentCommentId) : null;
    const savedInfo = await newComment.save();
    if(savedInfo!=null){
        response.code = 200,
        response.status = 'success';
        response.message = 'create success';
        response.data = savedInfo;
    }else{
        response.code = 400,
        response.status = 'error';
        response.message = 'some error';
        // response.data = savedInfo;
    }
    return response;
}

async function getCommentofPost(postId) {
    const response = {};
    const comment = await CommentShema.find({
        // isDeleted: false,
        postId: new ObjectId(postId)
    })
    .populate({
        path: "parentCommentId",
        select: ['_id', 'content'],
    })
    .populate({
        path: "createdBy",
        select: ['_id', 'firstName', 'lastName', 'username'],
    })
    .populate({
        path: "likes.likedBy",
        select: ['_id', 'firstName', 'lastName', 'username', 'email', 'picture']
    })
    .exec();

    response.data = comment;
    response.status = 'success';
    response.statusCode = 200;
    return response;
}
module.exports = {addComment, getCommentofPost}