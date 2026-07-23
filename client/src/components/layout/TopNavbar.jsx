import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "../../context/NotificationContext";

import {
    FaBell,
    FaUserCircle,
    FaTrash,
} from "react-icons/fa";
const TopNavbar = () => {
    const userName = localStorage.getItem("userName") || "Developer";
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    const {
        notifications,
        clearNotifications,
    } = useNotifications();


    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    return (
        <header className="h-20 bg-[#161B22] border-b border-gray-800 flex items-center justify-between px-8">

            <div>
                <h2 className="text-2xl font-bold text-white">
                    👋 Welcome, {userName}
                </h2>

                <p className="text-gray-400 text-sm">
                    {today}
                </p>
            </div>

            <div className="flex items-center gap-5">


                {/* Notification */}

                <div
                    className="relative"
                    ref={notificationRef}
                >

                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-3 rounded-xl bg-[#0D1117] hover:bg-[#21262D] transition"
                    >
                        <FaBell className="text-xl text-gray-300" />

                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {notifications.length}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>

                        {showNotifications && (

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 15 }}
                                className="absolute right-0 mt-3 w-80 bg-[#161B22] border border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                            >

                                <div className="flex justify-between items-center p-4 border-b border-gray-700">

                                    <h3 className="text-white font-bold">
                                        🔔 Notifications
                                    </h3>

                                    <button
                                        onClick={clearNotifications}
                                        className="text-red-400 hover:text-red-500"
                                    >
                                        <FaTrash />
                                    </button>

                                </div>

                                <div className="max-h-80 overflow-y-auto">

                                    {notifications.length === 0 ? (

                                        <p className="text-gray-400 text-center py-8">
                                            No Notifications
                                        </p>

                                    ) : (

                                        notifications.map((item) => (

                                            <div
                                                key={item.id}
                                                className="border-b border-gray-800 p-4 hover:bg-[#21262D]"
                                            >

                                                <p className="text-white text-sm">
                                                    {item.message}
                                                </p>

                                                <span className="text-gray-500 text-xs">
                                                    {item.time}
                                                </span>

                                            </div>

                                        ))

                                    )}

                                </div>

                            </motion.div>

                        )}

                    </AnimatePresence>

                </div>

                {/* User */}

                <div className="flex items-center gap-3 bg-[#0D1117] px-4 py-2 rounded-xl">

                    <FaUserCircle className="text-3xl text-purple-400" />

                    <div>

                        <h4 className="text-white text-sm font-semibold">
                            {userName}
                        </h4>

                        <p className="text-xs text-gray-400">
                            Admin
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
};

export default TopNavbar;