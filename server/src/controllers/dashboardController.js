const Project = require("../models/Project");
const Issue = require("../models/Issue");

const getDashboard = async (req, res) => {
  try {
    const totalProjects = await Project.count();

    const totalIssues = await Issue.count();

    const openIssues = await Issue.count({
      where: {
        status: "Open",
      },
    });

    const resolvedIssues = await Issue.count({
      where: {
        status: "Resolved",
      },
    });

    const criticalIssues = await Issue.count({
      where: {
        priority: "Critical",
      },
    });

    res.status(200).json({
      totalProjects,
      totalIssues,
      openIssues,
      resolvedIssues,
      criticalIssues,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getDashboard,
};