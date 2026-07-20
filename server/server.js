require("dotenv").config();

const app = require("./src/app");
const sequelize = require("./src/config/database");

require("./src/models/User");
require("./src/models/Project");
require("./src/models/Issue");
require("./src/models/Comment");

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Database Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Database Connection Failed");
    console.log(err);
  });