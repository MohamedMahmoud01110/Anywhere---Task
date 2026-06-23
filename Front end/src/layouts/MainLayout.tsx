import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import RequireAuth from "../components/RequireAuth";

function MainLayout() {
  return (
    <RequireAuth>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Sidebar>
          <Outlet />
        </Sidebar>
      </div>
    </RequireAuth>
  );
}

export default MainLayout;
