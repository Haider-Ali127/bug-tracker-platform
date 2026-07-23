import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#0D1117] text-white">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <TopNavbar />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>

    </div>
  );
};

export default MainLayout;