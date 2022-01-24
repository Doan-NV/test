// articles
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, index: true, required: true },
    content: { type: String, required: false, default: null },
    images: [{ type: String, required: false, default: null }],
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
module.exports = mongoose.model('post', PostSchema);
