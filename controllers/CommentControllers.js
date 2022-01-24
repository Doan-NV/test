const ObjectId = require("mongodb").ObjectId;
const commentsService = require("../services/commentsService");
class CommentControllers {
  async getComment(req, res) {
    const params = req.params;
    const postId = params.postId;
    let response = null;
    try {
      // check current user
      //   if (!currentUser) {
      //    response = {
      //    status: 400,
      //     message: "user is not allower",
      //    };
      //    res.json(response);
      //   }
      if (!ObjectId.isValid(postId)) {
        response = {
          status: 400,
          message: "postid is not objectid",
        };
      } else {
        response = await commentsService.getCommentofPost(postId);
      }
      res.json({ response: response });
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  }
  async addComment(req, res) {
    const data = req.body;
    const params = req.params;
    const postId = params.postId;
    let response = null;
    try {
      // const currentUser = await getUser(req);
      // check current user
      //   if (!currentUser) {
      //    response = {
      //    status: 400,
      //     message: "user is not allower",
      //    };
      //    res.json(response);
      //   }
      // const userId = currentUser._id
      //   data.createdBy = userId;
      if (!ObjectId.isValid(postId)) {
        response = {
          status: 400,
          message: "postid is not objectid",
        };
      } else {
        response = await commentsService.addComment(postId, data); // + userId
      }
      res.json(response);
    } catch (error) {
      res.json({ error: error });
    }
  }
}

module.exports = new CommentControllers();
