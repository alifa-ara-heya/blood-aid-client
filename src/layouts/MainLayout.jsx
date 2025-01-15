import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
    return (
        <div className="font-openSans">
            <Navbar />
            <div className="min-h-[calc(100vh-(66px+320px))]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;