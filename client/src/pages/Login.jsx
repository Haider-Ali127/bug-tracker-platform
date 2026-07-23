import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast, { Toaster } from "react-hot-toast";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { FaBug, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(formData);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("userRole", data.user.role);

            toast.success(data.message);

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login Failed"
            );
        }
    };

    return (
        <>
            <Toaster />

            <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">

                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >

                    <Card>

                        <div className="flex justify-center mb-6">
                            <FaBug className="text-6xl text-purple-500" />
                        </div>

                        <h1 className="text-3xl font-bold text-center text-white">
                            Welcome Back
                        </h1>

                        <p className="text-center text-gray-400 mt-2 mb-8">
                            Login to Bug Tracker
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label className="text-gray-300 mb-2 block">
                                    <FaEnvelope className="inline mr-2" />
                                    Email
                                </label>

                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="text-gray-300 mb-2 block">
                                    <FaLock className="inline mr-2" />
                                    Password
                                </label>

                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <Button type="submit">
                                🚀 Login
                            </Button>

                        </form>

                        <p className="text-center text-gray-400 mt-8">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-cyan-400 hover:text-purple-400 font-semibold"
                            >
                                Register Here
                            </Link>
                        </p>

                    </Card>

                </motion.div>

            </div>
        </>
    );
};

export default Login;