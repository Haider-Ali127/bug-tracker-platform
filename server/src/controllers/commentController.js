const Comment = require("../models/Comment");

// Create Comment
const createComment = async (req, res) => {
    try {
        const { comment, issueId, userId } = req.body;
        if (!comment) {
            return res.status(400).json({
                message: "Comment cannot be empty",
            });
        }

        const newComment = await Comment.create({
            comment,
            issueId,
            userId,
        });

        res.status(201).json({
            message: "Comment Added Successfully",
            comment: newComment,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Comments
const getComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Comment
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment Not Found",
            });
        }

        await comment.destroy();

        res.status(200).json({
            message: "Comment Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createComment,
    getComments,
    deleteComment,
};