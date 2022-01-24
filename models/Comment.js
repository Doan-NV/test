const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;


const CommentSchema = new mongoose.Schema(
  {
    postId: { type: ObjectId, required: true, index: true, ref: "posts" },
    parentCommentId: {
      type: ObjectId,
      required: false,
      index: true,
      ref: "comments",
    },
    content: { type: String, required: true },
    likes: [
      {
        likedBy: { type: ObjectId, required: true, index: true, ref: "users" },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    isDeleted: { type: Boolean, required: true, default: false },
    updatedAt: { type: Date, default: Date.now() },
    createdBy: { type: ObjectId, required: true, index: true, ref: "users" },
    updatedBy: { type: ObjectId, required: false, ref: "users" },
  },
  { versionKey: false }
);

module.exports = mongoose.model('comments', CommentSchema);