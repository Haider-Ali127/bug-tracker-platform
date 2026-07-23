import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBug,
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaComments,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Developer";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      isActive
        ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20"
        : "text-gray-300 hover:bg-[#21262D] hover:text-cyan-400 hover:translate-x-2"
    }`;

  return (
    <aside className="w-72 bg-[#161B22] border-r border-gray-800 flex flex-col justify-between p-6">

      {/* Logo */}
      <div>

        <div className="flex items-center gap-3 mb-10">

          <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-3 rounded-xl shadow-lg">
            <FaBug className="text-3xl text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Bug Tracker
            </h1>

            <p className="text-gray-400 text-sm">
              Build • Track • Deliver
            </p>
          </div>

        </div>

        {/* Menu */}

        <nav className="space-y-3">

          <NavLink to="/" className={linkClass}>
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink to="/projects" className={linkClass}>
            <FaProjectDiagram />
            Projects
          </NavLink>

          <NavLink to="/issues" className={linkClass}>
            <FaTasks />
            Issues
          </NavLink>

          <NavLink to="/comments" className={linkClass}>
            <FaComments />
            Comments
          </NavLink>

        </nav>

      </div>

      {/* Bottom */}

      <div>

        <div className="bg-[#0D1117] rounded-xl p-4 border border-gray-800 mb-5">

          <div className="flex items-center gap-3">

            <FaUserCircle className="text-4xl text-purple-400" />

            <div>
              <h3 className="text-white font-semibold">
                {userName}
              </h3>

              <p className="text-gray-400 text-sm">
                Logged In
              </p>
            </div>

          </div>

        </div>

        <button
          onClick={logout}
          className="
          w-full
          flex
          items-center
          justify-center
          gap-3
          bg-red-600
          hover:bg-red-700
          transition-all
          duration-300
          py-3
          rounded-xl
          font-semibold"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;