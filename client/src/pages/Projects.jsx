import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import api from "../api/api";
import toast from "react-hot-toast";
import { useNotifications } from "../context/NotificationContext";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaFolderOpen,
    FaSearch,
} from "react-icons/fa";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const { addNotification } = useNotifications();

    const [projectData, setProjectData] = useState({
        projectName: "",
        description: "",
        status: "Active",
    });

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
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value,
        });
    };

    const createProject = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (editingId) {
                await api.put(`/projects/${editingId}`, projectData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await api.post("/projects", projectData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            fetchProjects();
            toast.success(
                editingId
                    ? "Project Updated Successfully"
                    : "Project Created Successfully"
            );


            addNotification(
                editingId
                    ? "✏️ Project Updated"
                    : "📁 New Project Created"
            );


            setEditingId(null);
            setShowForm(false);

            setProjectData({
                projectName: "",
                description: "",
                status: "Active",
            });

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const deleteProject = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchProjects();
            toast.success("Project Deleted Successfully");
            addNotification("🗑️ Project Deleted");


        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };
    const editProject = (project) => {
        setShowForm(true);

        setEditingId(project.id);


        setProjectData({
            projectName: project.projectName,
            description: project.description,
            status: project.status,
        });
    };

    const filteredProjects = useMemo(() => {
        return projects.filter((project) =>
            project.projectName
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [projects, search]);



    return (
        <MainLayout>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                    <FaFolderOpen className="text-purple-500" />
                    Projects
                </h1>

                <p className="text-gray-400 mt-2">
                    Manage all your projects from one beautiful dashboard.
                </p>
            </motion.div>

            {/* Search + Button */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">

                <div className="relative w-full md:w-[350px]">
                    <FaSearch className="absolute left-4 top-4 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search Projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 pl-11 rounded-xl bg-[#111827] border border-gray-700 shadow-lg shadow-cyan-500/10 text-white placeholder:text-gray-500 focus:border-cyan-500 outline-none"
                    />
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-105 duration-300 font-semibold text-white"
                >
                    {showForm ? "✖ Close Form" : "➕ New Project"}
                </button>

            </div>

            {/* Form */}

            {showForm && (
                <motion.form
                    initial={{ opacity: 0, scale: .95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: .3 }}
                    onSubmit={createProject}
                    className="bg-[#161B22] border border-gray-800 rounded-2xl p-7 shadow-xl mb-10"
                >

                    <h2 className="text-2xl text-white font-bold mb-6">
                        {editingId ? "✏ Edit Project" : "📁 Create Project"}
                    </h2>

                    <input
                        type="text"
                        name="projectName"
                        placeholder="Project Name"
                        value={projectData.projectName}
                        onChange={handleChange}
                        className="w-full mb-5 px-4 py-3 rounded-xl bg-[#0D1117] border border-gray-700 text-white focus:border-purple-500 outline-none"
                    />

                    <textarea
                        rows="4"
                        name="description"
                        placeholder="Project Description"
                        value={projectData.description}
                        onChange={handleChange}
                        className="w-full mb-5 px-4 py-3 rounded-xl bg-[#0D1117] border border-gray-700 text-white focus:border-cyan-500 outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-105 duration-300 text-white font-semibold flex justify-center items-center gap-2"
                    >
                        <FaPlus />
                        {editingId ? "Update Project" : "Create Project"}
                    </button>

                </motion.form>
            )}

            {/* Empty */}

            {filteredProjects.length === 0 ? (

                <div className="text-center py-24">

                    <div className="text-7xl mb-5">
                        📁
                    </div>

                    <h2 className="text-3xl font-bold text-white">
                        No Projects Yet
                    </h2>

                    <p className="text-gray-400 mt-3">
                        Create your first project to get started.
                    </p>

                </div>

            ) : (

                filteredProjects.map((project) => (

                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -6 }}
                        transition={{ duration: .25 }}
                        className="bg-[#161B22] border border-gray-800 rounded-2xl p-6 mb-6 shadow-lg hover:border-cyan-500"
                    >

                        <div className="flex flex-col lg:flex-row justify-between gap-6">

                            <div>

                                <h2 className="text-2xl font-bold text-white">
                                    📁 {project.projectName}
                                </h2>

                                <p className="text-xs text-gray-500 mt-1">
                                    Project ID : #{project.id}
                                </p>

                                <p className="text-gray-400 mt-4">
                                    {project.description}
                                </p>

                                <div className="mt-5">

                                    <span
                                        className={`px-4 py-2 rounded-full text-xs font-bold ${project.status === "Active"
                                            ? "bg-green-500/20 text-green-400 border border-green-500"
                                            : "bg-red-500/20 text-red-400 border border-red-500"
                                            }`}
                                    >
                                        {project.status}
                                    </span>

                                </div>

                            </div>

                            <div className="flex gap-3 self-start">

                                <button
                                    onClick={() => editProject(project)}
                                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl transition"
                                >
                                    <FaEdit />
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteProject(project.id)}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl transition"
                                >
                                    <FaTrash />
                                    Delete
                                </button>

                            </div>

                        </div>

                    </motion.div>

                ))
            )}

        </MainLayout>
    );
};

export default Projects;