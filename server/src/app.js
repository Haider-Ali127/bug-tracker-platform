const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const issueRoutes = require("./routes/issueRoutes");
const commentRoutes = require("./routes/commentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://bug-tracker-platform.vercel.app/",
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://bug-tracker-platform.vercel.app",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;