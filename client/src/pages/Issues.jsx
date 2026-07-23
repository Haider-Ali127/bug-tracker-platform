import { analyzeBug } from "../services/aiService";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import api from "../api/api";
import toast from "react-hot-toast";
import { useNotifications } from "../context/NotificationContext";

import {
    FaBug,
    FaSearch,
    FaEdit,
    FaTrash,
    FaPlus,
    FaFolderOpen,
    FaUser,
} from "react-icons/fa";
const Issues = () => {
    const [issues, setIssues] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState("");
    const { addNotification } = useNotifications();

    const [issueData, setIssueData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        status: "Open",
        projectId: "",
        assignedTo: "",
        createdBy: "",
    });
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const fetchIssues = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/issues", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setIssues(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);

            toast.error("Something went wrong");
        }
    };
    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProjects(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);

            toast.error("Something went wrong");
        }
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);

            toast.error("Something went wrong");
        }
    };

    const handleChange = (e) => {
        setIssueData({
            ...issueData,
            [e.target.name]: e.target.value,
        });
    };

    const createIssue = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const profile = await api.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const newIssue = {
                ...issueData,
                createdBy: profile.data.user.id,

                projectId: issueData.projectId
                    ? Number(issueData.projectId)
                    : null,

                assignedTo: issueData.assignedTo
                    ? Number(issueData.assignedTo)
                    : null,
            };

            if (editingId) {
                await api.put(`/issues/${editingId}`, newIssue, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                console.log(newIssue);
                await api.post("/issues", newIssue, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            fetchIssues();

            toast.success(
                editingId
                    ? "✏️ Issue Updated"
                    : "🐞 New Issue Created"
            );

            addNotification(
                editingId
                    ? `✏️ Issue "${issueData.title}" updated`
                    : `🐞 Issue "${issueData.title}" created`
            );
            setIssueData({
                title: "",
                description: "",
                priority: "Medium",
                status: "Open",
                projectId: "",
                assignedTo: "",
                createdBy: "",
            });

            setEditingId(null);
            setShowForm(false);

        } catch (error) {
            console.log(error.response?.data || error.message);

            toast.error("Something went wrong");
        }
    };

    const handleAIAnalyze = async () => {

        if (!issueData.title || !issueData.description) {
            toast.error("Please enter title and description first.");
            return;
        }

        const loadingToast = toast.loading("Analyzing Bug...");

        try {

            setAiLoading(true);

            const response = await analyzeBug(
                issueData.title,
                issueData.description
            );

            setAiResponse(response);

            toast.dismiss(loadingToast);

            toast.success("AI Analysis Completed!");

            addNotification("🤖 AI analyzed a bug");

        } catch (err) {

            toast.dismiss(loadingToast);

            toast.error("AI Analysis Failed");

        } finally {

            setAiLoading(false);

        }

    };
    const deleteIssue = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/issues/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            fetchIssues();
            addNotification("🗑️ Issue Deleted");

        } catch (error) {
            console.log(error.response?.data || error.message);

            toast.error("Something went wrong");
        }
    };

    const editIssue = (issue) => {
        setEditingId(issue.id);
        setShowForm(true);

        setIssueData({
            title: issue.title,
            description: issue.description,
            priority: issue.priority,
            status: issue.status,
            projectId: issue.projectId,
            assignedTo: issue.assignedTo,
            createdBy: issue.createdBy,
        });
    };


    useEffect(() => {
        fetchIssues();
        fetchProjects();
        fetchUsers();
    }, []);

    console.log(projects);
    console.log(users);

    const filteredIssues = useMemo(() => {

        return issues.filter((issue) =>

            issue.title.toLowerCase().includes(search.toLowerCase())

        );

    }, [issues, search]);

    return (
        <MainLayout>
            <div className="mb-8">

                <h1 className="text-5xl font-black text-white">
                    🐞 Bug Hunter
                </h1>

                <p className="text-gray-400 mt-2">
                    Track • Investigate • Eliminate Bugs
                </p>

            </div>

            <div className="flex items-center gap-5 mb-8">

                <input
                    type="text"
                    placeholder="🔍 Search Issues..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-96 bg-[#111827] border border-gray-700 rounded-xl px-5 py-3 text-white outline-none focus:border-cyan-500 transition"
                />

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold hover:scale-105 transition"
                >

                    {showForm ? "✖ Close" : "🐞 Report New Bug"}

                </button>

            </div>

            {showForm && (
                <motion.form

                    initial={{ opacity: 0, scale: .9 }}

                    animate={{ opacity: 1, scale: 1 }}

                    exit={{ opacity: 0 }}

                    onSubmit={createIssue}

                    className="bg-[#161B22] border border-gray-800 rounded-3xl p-8 mb-10 shadow-2xl"

                >
                    <input

                        className="w-full px-4 py-3 mb-4 rounded-xl bg-[#0D1117] border border-gray-700 text-white focus:border-cyan-500 outline-none"
                        type="text"
                        name="title"
                        placeholder="Issue Title"
                        value={issueData.title}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <input

                        className="w-full px-4 py-3 mb-4 rounded-xl bg-[#0D1117] border border-gray-700 text-white focus:border-cyan-500 outline-none"
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={issueData.description}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={handleAIAnalyze}
                        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:scale-105 duration-300 text-white font-semibold"
                    >
                        {aiLoading ? "🤖 Analyzing..." : "✨ Analyze with AI"}
                    </button>

                    {aiResponse && (
                        <div className="mt-6 bg-[#161B22] border border-cyan-500 rounded-2xl p-6 shadow-lg">

                            <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                                🤖 Gemini AI Assistant
                            </h2>

                            <p className="text-gray-400 mb-5">
                                AI analyzed your issue and generated suggestions.
                            </p>

                            <div className="bg-[#0D1117] rounded-xl p-5 border border-cyan-400">

                                <pre className="whitespace-pre-wrap text-gray-300 font-sans leading-8">
                                    {aiResponse}
                                </pre>

                            </div>

                        </div>
                    )}

                    <br /><br />



                    <select

                        className="w-full px-4 py-3 mb-4 rounded-xl bg-[#0D1117] border border-gray-700 text-white focus:border-purple-500 outline-none"
                        name="assignedTo"
                        value={issueData.assignedTo}
                        onChange={handleChange}
                    >
                        <option
                            value=""
                            className="bg-[#161B22] text-white"
                        >
                            👤 Assign User
                        </option>

                        {users.map((user) => (
                            <option
                                key={user.id}
                                value={user.id}
                                className="bg-[#161B22] text-white"
                            >
                                {user.name} ({user.role})
                            </option>
                        ))}
                    </select>

                    <br /><br />

                    <select

                        className="w-full px-4 py-3 mb-4 rounded-xl bg-[#0D1117] border border-gray-700 text-white focus:border-purple-500 outline-none"
                        name="projectId"
                        value={issueData.projectId}
                        onChange={handleChange}
                    >
                        <option
                            value=""
                            className="bg-[#161B22] text-white"
                        >
                            📁 Select Project
                        </option>

                        {projects.map((project) => (
                            <option
                                key={project.id}
                                value={project.id}
                                className="bg-[#161B22] text-white"
                            >
                                {project.projectName}
                            </option>
                        ))}
                    </select>

                    <br /><br />

                    <select

                        className="w-full px-4 py-3 mb-4 rounded-xl bg-[#0D1117] border border-gray-700 text-white focus:border-purple-500 outline-none"
                        name="priority"
                        value={issueData.priority}
                        onChange={handleChange}
                    >
                        <option value="Low" className="bg-[#161B22] text-white">
                            🟢 Low
                        </option>

                        <option value="Medium" className="bg-[#161B22] text-white">
                            🟡 Medium
                        </option>

                        <option value="High" className="bg-[#161B22] text-white">
                            🟠 High
                        </option>

                        <option value="Critical" className="bg-[#161B22] text-white">
                            🔴 Critical
                        </option>
                    </select>

                    <br /><br />

                    <br /><br />

                    <label className="text-gray-300 font-medium">
                        📌 Status
                    </label>

                    <br /><br />

                    <select
                        name="status"
                        value={issueData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-gray-700 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                    >
                        <option value="Open">🟢 Open</option>
                        <option value="In Progress">🔵 In Progress</option>
                        <option value="Resolved">✅ Resolved</option>
                    </select>

                    <br /><br />

                    <button

                        type="submit"

                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-3 rounded-xl font-semibold hover:scale-105 transition flex justify-center gap-2"

                    >
                        {editingId ? "💾 Update Issue" : "🐞 Create Issue"}
                    </button>
                </motion.form>
            )}

            <hr />

            {filteredIssues.length === 0 ? (
                <h3>No Issues Found</h3>
            ) : (
                filteredIssues.map((issue) => (
                    <motion.div

                        key={issue.id}

                        whileHover={{ y: -6 }}

                        className="bg-[#161B22] rounded-2xl border border-gray-800 p-6 mb-5 hover:border-cyan-500 transition"

                    >

                        <div className="flex justify-between">

                            <div>

                                <h2 className="text-2xl text-white font-bold">

                                    🐞 {issue.title}

                                </h2>

                                <p className="text-gray-400 mt-2">

                                    {issue.description}

                                </p>

                                <div className="flex gap-3 mt-4 flex-wrap">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold border
    ${issue.priority === "Low"
                                                ? "border-green-500 text-green-400 bg-green-500/10"
                                                : issue.priority === "Medium"
                                                    ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
                                                    : issue.priority === "High"
                                                        ? "border-orange-500 text-orange-400 bg-orange-500/10"
                                                        : "border-red-500 text-red-400 bg-red-500/10"
                                            }`}
                                    >
                                        🚨 {issue.priority}
                                    </span>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold border
    ${issue.status === "Resolved"
                                                ? "border-green-500 text-green-400 bg-green-500/10"
                                                : issue.status === "In Progress"
                                                    ? "border-cyan-500 text-cyan-400 bg-cyan-500/10"
                                                    : "border-purple-500 text-purple-400 bg-purple-500/10"
                                            }`}
                                    >
                                        {issue.status === "Resolved"
                                            ? "✅"
                                            : issue.status === "In Progress"
                                                ? "🚀"
                                                : "🟣"}{" "}
                                        {issue.status}
                                    </span>

                                </div>

                            </div>

                            <div className="flex gap-3">

                                <button

                                    onClick={() => editIssue(issue)}

                                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_12px_#06b6d4] transition-all duration-300"
                                >

                                    <FaEdit />

                                </button>

                                <button

                                    onClick={() => deleteIssue(issue.id)}

                                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-red-500 text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_12px_#ef4444] transition-all duration-300"

                                >

                                    <FaTrash />

                                </button>

                            </div>

                        </div>

                    </motion.div>
                ))
            )}
        </MainLayout>
    );
};

export default Issues;