const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Issue = sequelize.define("Issue", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    priority: {
        type: DataTypes.ENUM("Low", "Medium", "High", "Critical"),
        defaultValue: "Medium",
    },

    status: {
        type: DataTypes.ENUM(
            "Open",
            "In Progress",
            "Resolved",
            "Closed"
        ),
        defaultValue: "Open",
    },

    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    assignedTo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
module.exports = Issue;