const getProfile = (req, res) => {
  res.json({
    message: "Profile Retrieved Successfully",
    user: req.user,
  });
};

module.exports = {
  getProfile,
};