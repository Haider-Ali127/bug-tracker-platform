const Project = require("../models/Project");

// Create Project
const createProject = async (req, res) => {
    try {
        const { projectName, description, status } = req.body;
        if (!projectName) {
            return res.status(400).json({
                message: "Project Name is required",
            });
        }

        const project = await Project.create({
            projectName,
            description,
            status,
        });

        res.status(201).json({
            message: "Project Created Successfully",
            project,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Projects
const getProjects = async (req, res) => {
    const projects = await Project.findAll();

    console.log("Projects from DB:", projects);
    try {
        const projects = await Project.findAll();

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Single Project
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found",
            });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Project
const updateProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found",
            });
        }

        await project.update(req.body);

        res.status(200).json({
            message: "Project Updated Successfully",
            project,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Project
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found",
            });
        }

        await project.destroy();

        res.status(200).json({
            message: "Project Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};