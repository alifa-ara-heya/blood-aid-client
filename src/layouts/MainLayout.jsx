import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="font-openSans">
            <h2>MainLayout</h2>
            <Outlet />
        </div>
    );
};

export default MainLayout;