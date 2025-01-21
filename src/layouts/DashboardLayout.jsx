import { Link, Outlet } from "react-router-dom";
// import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import ShortFooter from "../components/ShortFooter/ShortFooter";
import { FiMenu } from "react-icons/fi";
import { FormProvider, useForm } from "react-hook-form";
import bg from '../assets/fabric_1.webp';
import { AiOutlineLogout } from "react-icons/ai";
import useAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";


const DashboardLayout = () => {
    const { logOut } = useAuth();
    const [role, isLoading] = useRole();
    const methods = useForm(); // Initialize useForm here

    const handleLogOut = async () => {
        try {
            await logOut();
            await Swal.fire({
                title: 'Success',
                text: 'Successfully Logged Out',
                icon: 'success'
            })
        } catch (err) {
            console.log('Logout failed', err);
            await Swal.fire({
                title: 'Error',
                text: err.message || "Failed to log out. Please try again.",
                icon: "error",
            })
        }
    }
    if (isLoading) return <LoadingSpinner />


    return (
        <div style={{ backgroundImage: `url(${bg})` }} className="w-full">

            <div className="drawer">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content w-full">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn drawer-button w-12 text-primary hover:bg-primary hover:text-white m-6">
                        <FiMenu />
                    </label>

                    <FormProvider {...methods}>
                        <div className="md:min-h-screen container mx-auto ">
                            <Outlet />
                        </div>
                    </FormProvider>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-primary text-white  min-h-full w-80 p-4 flex justify-between flex-col">
                        {/* Sidebar content here */}
                        <div className="menu">
                            <li><Link to='/'>Blood Aid</Link></li>
                            <li><Link to='/dashboard'>Dashboard</Link></li>
                            <li><Link to='/dashboard/profile'>Profile</Link></li>
                            <li><Link to='/dashboard/create-donation-request'>Create Donation Request</Link></li>

                            {/* admin only routes */}
                            {
                                role === 'admin' && (<>
                                    <li><Link to='/dashboard/all-users'>All Users</Link></li>
                                    <li><Link to='/dashboard/all-blood-donation-requests'>All Blood Donation Requests</Link></li>
                                    <li><Link to='/dashboard/content-management'>Content Management</Link></li>
                                </>
                                )
                            }
                        </div>

                        <div>
                            <button className="btn" onClick={handleLogOut}>
                                <AiOutlineLogout size={18} />Logout</button>
                        </div>

                    </ul>
                </div>
            </div>
            <ShortFooter />
        </div>
    );
};

export default DashboardLayout;