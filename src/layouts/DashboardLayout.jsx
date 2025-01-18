import { Link, Outlet } from "react-router-dom";
// import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import ShortFooter from "../components/ShortFooter/ShortFooter";
import { FiMenu } from "react-icons/fi";
import { FormProvider, useForm } from "react-hook-form";
import bg from '../assets/fabric_1.webp';


const DashboardLayout = () => {
    const methods = useForm(); // Initialize useForm here
    return (
        <div style={{ backgroundImage: `url(${bg})` }}>
            {/* <div className="">
                <div className="flex">
                    <Sidebar />
                    <div className="min-h-screen">
                        <Outlet />
                    </div>
                </div>
                <ShortFooter />
            </div> */}
            <div className="drawer">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn drawer-button w-12 text-primary hover:bg-primary hover:text-white m-6">
                        <FiMenu />
                    </label>

                    <FormProvider {...methods}>
                        <div className="md:min-h-screen container mx-auto">
                            <Outlet />
                        </div>
                    </FormProvider>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-primary text-white  min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li><Link to='/dashboard/profile'>Profile</Link></li>
                        <li><Link to='/dashboard/create-donation-request'>Create Donation Request</Link></li>

                    </ul>
                </div>
            </div>
            <ShortFooter />
        </div>
    );
};

export default DashboardLayout;