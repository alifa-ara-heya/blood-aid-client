import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import ShortFooter from "../components/ShortFooter/ShortFooter";

const DashboardLayout = () => {
    return (
        <div className="">
            <Sidebar />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <ShortFooter />
        </div>
    );
};

export default DashboardLayout;