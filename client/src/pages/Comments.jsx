import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaCommentDots,
    FaPaperPlane,
    FaUser,
    FaBug,
} from "react-icons/fa";
import MainLayout from "../components/layout/MainLayout";
import api from "../api/api";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [issues, setIssues] = useState([]);

    const [commentData, setCommentData] = useState({
        comment: "",
        issueId: "",
        userId: "",
    });

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchIssues = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/issues", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setIssues(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/comments", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setComments(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleChange = (e) => {
        setCommentData({
            ...commentData,
            [e.target.name]: e.target.value,
        });
    };

    const createComment = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await api.post("/comments", commentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchComments();

            setCommentData({
                comment: "",
                issueId: "",
                userId: "",
            });
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchComments();
        fetchUsers();
        fetchIssues();
    }, []);

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-4xl font-bold flex items-center gap-3 text-white">

                        <FaCommentDots className="text-cyan-400" />

                        Comments

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Discuss issues with your team.

                    </p>

                </div>

                <motion.form

                    initial={{ opacity: 0, y: 20 }}

                    animate={{ opacity: 1, y: 0 }}

                    onSubmit={createComment}

                    className="bg-[#161B22] border border-gray-800 rounded-3xl p-8 mb-10"

                >

                    <textarea

                        rows="5"

                        name="comment"

                        placeholder="Write your comment..."

                        value={commentData.comment}

                        onChange={handleChange}

                        className="w-full rounded-xl bg-[#0D1117] border border-gray-700 p-4 text-white focus:border-cyan-500 outline-none"

                    />

                    <div className="grid md:grid-cols-2 gap-5 mt-6">

                        <select

                            name="issueId"

                            value={commentData.issueId}

                            onChange={handleChange}

                            className="bg-[#0D1117] border border-gray-700 rounded-xl p-4 text-white"

                        >

                            <option value="">🐞 Select Issue</option>

                            {issues.map(issue => (

                                <option

                                    key={issue.id}

                                    value={issue.id}

                                    className="bg-[#161B22] text-white"

                                >

                                    {issue.title}

                                </option>

                            ))}

                        </select>

                        <select

                            name="userId"

                            value={commentData.userId}

                            onChange={handleChange}

                            className="bg-[#0D1117] border border-gray-700 rounded-xl p-4 text-white"

                        >

                            <option value="">👤 Select User</option>

                            {users.map(user => (

                                <option

                                    key={user.id}

                                    value={user.id}

                                    className="bg-[#161B22] text-white"

                                >

                                    {user.name}

                                </option>

                            ))}

                        </select>

                    </div>

                    <button

                        type="submit"

                        className="mt-8 w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-4 rounded-xl font-bold hover:scale-105 transition"

                    >

                        <FaPaperPlane className="inline mr-2" />

                        Add Comment

                    </button>

                </motion.form>

                <div className="space-y-5">

                    {comments.length === 0 ? (

                        <div className="text-center text-gray-400">

                            No Comments Found

                        </div>

                    ) : (comments.map(comment => (

                        <motion.div

                            key={comment.id}

                            whileHover={{ y: -5 }}

                            className="bg-[#161B22] border border-gray-800 rounded-2xl p-6"

                        >

                            <div className="flex items-center gap-3 mb-4">

                                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center">

                                    <FaUser />

                                </div>

                                <div>

                                    <h3 className="text-white font-semibold">

                                        User #{comment.userId}

                                    </h3>

                                    <p className="text-gray-500 text-sm">

                                        Issue #{comment.issueId}

                                    </p>

                                </div>

                            </div>

                            <p className="text-gray-300">

                                {comment.comment}

                            </p>

                        </motion.div>

                    )))}

                </div>

            </div>
            ))
        </MainLayout>
    );
};

export default Comments;