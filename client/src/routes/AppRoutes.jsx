import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Issues from "../pages/Issues";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Comments from "../pages/Comments";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/comments" element={<Comments />} />
        </Routes>
    );
};

export default AppRoutes;