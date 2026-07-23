import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import api from "../api/api";
import {
    FaProjectDiagram,
    FaBug,
    FaCheckCircle,
    FaExclamationTriangle,
} from "react-icons/fa";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProjects: 0,
        totalIssues: 0,
        openIssues: 0,
        resolvedIssues: 0,
        criticalIssues: 0,
    });
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setStats(response.data);
            const notifications =
                JSON.parse(localStorage.getItem("notifications")) || [];

            setActivities(notifications.slice(0, 5));
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const cards = [
        {
            title: "Projects",
            value: stats.totalProjects,
            icon: <FaProjectDiagram />,
            color: "from-purple-600 to-indigo-600",
            glow: "shadow-purple-500/30",
        },
        {
            title: "Total Issues",
            value: stats.totalIssues,
            icon: <FaBug />,
            color: "from-cyan-600 to-blue-600",
            glow: "shadow-cyan-500/30",
        },
        {
            title: "Open Issues",
            value: stats.openIssues,
            icon: <FaExclamationTriangle />,
            color: "from-orange-500 to-red-500",
            glow: "shadow-orange-500/30",
        },
        {
            title: "Resolved",
            value: stats.resolvedIssues,
            icon: <FaCheckCircle />,
            color: "from-green-500 to-emerald-600",
            glow: "shadow-green-500/30",
        },
    ];

    return (
        <MainLayout>
            {/* Welcome */}

            <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 bg-[#161B22] border border-purple-500/30 rounded-3xl p-8 shadow-2xl"
            >
                <h1 className="text-4xl font-bold text-white">
                    👋 Welcome Back
                </h1>

                <p className="text-gray-400 mt-3 text-lg">
                    Monitor projects, track bugs and resolve issues faster.
                </p>
            </motion.div>

            {/* Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {cards.map((card, index) => (

                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                            scale: 1.04,
                            y: -6,
                        }}
                        className={`bg-gradient-to-r ${card.color} rounded-2xl p-6 shadow-xl ${card.glow}`}
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-white/80 font-medium">
                                    {card.title}
                                </p>

                                <h2 className="text-5xl font-bold text-white mt-3">
                                    {card.value}
                                </h2>

                            </div>

                            <div className="text-5xl text-white/80">
                                {card.icon}
                            </div>

                        </div>

                    </motion.div>

                ))}

            </div>

            {/* Bottom */}

            <div className="grid lg:grid-cols-2 gap-6 mt-10">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#161B22] rounded-2xl border border-cyan-500/30 p-6 shadow-xl"
                >
                    <h2 className="text-xl font-bold text-white mb-5">
                        📝 Recent Activity
                    </h2>

                    {activities.length === 0 ? (
                        <p className="text-gray-400">
                            No recent activity.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {activities.map((item) => (
                                <div
                                    key={item.id}
                                    className="border-b border-gray-800 pb-3"
                                >
                                    <p className="text-white">
                                        {item.message}
                                    </p>

                                    <span className="text-gray-500 text-xs">
                                        {item.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                <div className="flex items-center gap-4 mt-4">

                    <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500 flex items-center justify-center">

                        <span className="text-5xl font-bold text-red-500">
                            {stats.criticalIssues}
                        </span>

                    </div>

                    <div>

                        <h3 className="text-white text-lg font-semibold">
                            Critical Bugs
                        </h3>

                        <p className="text-gray-400 text-sm mt-1">
                            High priority bugs requiring immediate attention.
                        </p>

                    </div>

                </div>


                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#161B22] rounded-2xl border border-cyan-500/30 p-6 shadow-xl"
                >

                    <h2 className="text-xl font-bold text-white mb-5">
                        🚀 Productivity
                    </h2>

                    <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{
                                width:
                                    stats.totalIssues === 0
                                        ? "0%"
                                        : `${(stats.resolvedIssues / stats.totalIssues) * 100}%`,
                            }}
                            transition={{ duration: 1 }}
                            className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                        />

                    </div>

                    <p className="text-gray-400 mt-4">

                        <span className="text-white font-semibold">
                            {stats.resolvedIssues}
                        </span>

                        {" "}of{" "}

                        <span className="text-white font-semibold">
                            {stats.totalIssues}
                        </span>

                        {" "}issues resolved.

                    </p>

                </motion.div>

            </div>

        </MainLayout >
    );
};

export default Dashboard;