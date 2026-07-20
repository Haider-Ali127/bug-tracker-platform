const Issue = require("../models/Issue");

// Create Issue
const createIssue = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            status,
            projectId,
            assignedTo,
            createdBy,
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and Description are required",
            });
        }

        const issue = await Issue.create({
            title,
            description,
            priority,
            status,
            projectId,
            assignedTo,
            createdBy,
        });

        res.status(201).json({
            message: "Issue Created Successfully",
            issue,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Issues
const getIssues = async (req, res) => {
    try {
        const { status, priority, projectId } = req.query;

        const where = {};

        if (status) {
            where.status = status;
        }

        if (priority) {
            where.priority = priority;
        }

        if (projectId) {
            where.projectId = projectId;
        }

        const issues = await Issue.findAll({
            where,
        });

        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Issue By ID
const getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findByPk(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue Not Found",
            });
        }

        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Issue
const updateIssue = async (req, res) => {
    try {
        const issue = await Issue.findByPk(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue Not Found",
            });
        }

        await issue.update(req.body);

        res.status(200).json({
            message: "Issue Updated Successfully",
            issue,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Issue
const deleteIssue = async (req, res) => {
    try {
        const issue = await Issue.findByPk(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue Not Found",
            });
        }

        await issue.destroy();

        res.status(200).json({
            message: "Issue Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue,
};