const User = require("../models/User");

const getProfile = (req, res) => {
    res.json({
        message: "Profile Retrieved Successfully",
        user: req.user,
    });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "name", "email", "role"],
        });

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getProfile,
    getAllUsers,
};