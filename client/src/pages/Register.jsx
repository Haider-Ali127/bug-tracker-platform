import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

import { registerUser } from "../services/authService";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import {
  FaBug,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag,
} from "react-icons/fa";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Developer",
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

      const data = await registerUser(formData);

      toast.success(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }
  };

  return (
    <>
      <Toaster />

      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .6 }}
          className="w-full max-w-md"
        >

          <Card>

            <div className="flex justify-center mb-6">
              <FaBug className="text-6xl text-purple-500" />
            </div>

            <h1 className="text-3xl font-bold text-center text-white">
              Create Account
            </h1>

            <p className="text-center text-gray-400 mt-2 mb-8">
              Join Bug Tracker
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>

                <label className="text-gray-300 mb-2 block">
                  <FaUser className="inline mr-2"/>
                  Full Name
                </label>

                <Input
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              <div>

                <label className="text-gray-300 mb-2 block">
                  <FaEnvelope className="inline mr-2"/>
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
                  <FaLock className="inline mr-2"/>
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

              <div>

                <label className="text-gray-300 mb-2 block">
                  <FaUserTag className="inline mr-2"/>
                  Select Role
                </label>

                <Input
                  type="select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="Admin">👑 Admin</option>
                  <option value="Developer">💻 Developer</option>
                  <option value="Tester">🧪 Tester</option>
                </Input>

              </div>

              <Button type="submit">
                🚀 Create Account
              </Button>

            </form>

            <p className="text-center text-gray-400 mt-8">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-cyan-400 hover:text-purple-400 font-semibold"
              >
                Login Here
              </Link>

            </p>

          </Card>

        </motion.div>

      </div>

    </>
  );
};

export default Register;