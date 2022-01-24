const express = require('express');
const router = express.Router();
const CommentControllers = require('../controllers/CommentControllers')
router.get('/comment/:postId', (req, res) => {
    CommentControllers.getComment(req, res);
});
router.post('/comment/:postId', (req, res) => {
    CommentControllers.addComment(req, res);
})

module.exports = router;