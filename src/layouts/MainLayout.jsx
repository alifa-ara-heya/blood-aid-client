import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const MainLayout = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        })
    }, [])
    return (
        <div className="font-openSans">
            <Navbar />
            <div className="min-h-[calc(100vh-(66px+300px))]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;