
import { AiOutlineLogout } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

import logo from '../../../assets/icons8-blood-100.png'
import { Link, NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import donateBloodImg from '../../../assets/donate-blood-removebg-preview.png'

const Navbar = () => {
    const getNavLinkActiveClass = ({ isActive }) => `${isActive ? 'bg-rose-700 text-white hover:bg-rose-600 focus:bg-rose-700 focus:text-white' : ''}`
    const navOptions = <>
        <li className=""><NavLink to='/' className={getNavLinkActiveClass}>Home</NavLink></li>
        <li className=""><NavLink to='/donation-requests' className={getNavLinkActiveClass}>Donation Requests</NavLink></li>
        <li className=""><NavLink to='/signUp' className={getNavLinkActiveClass}>Sign Up</NavLink></li>
    </>

    return (
        <div className="navbar bg-rose-700">
            <div className="navbar-start">
                <div className="drawer lg:hidden z-50">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button text-white"><FiMenu size={20} /></label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="menu bg-base-200 min-h-full w-80 p-10 text-base ">
                            {/* Sidebar content here */}
                            <div className="flex justify-between flex-col h-full">
                                <div className="space-y-4">
                                    <h2 className="md:text-3xl text-xl font-bold text-rose-700 border-b pb-4 flex justify-start  items-center gap-3">
                                        <img src={logo} alt="" className="w-10" />
                                        Blood Aid
                                    </h2>
                                    <ul className="*:border-b *:pb-3">
                                        {navOptions}
                                    </ul>
                                </div>
                                <div className="absolute bottom-2 right-2">
                                    <img src={donateBloodImg} alt="" className="w-[80%] mx-auto" />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                {/* main logo/title */}
                <h2 className="absolute lg:static left-[12%] sm:left-[10%] md:text-3xl text-2xl font-bold text-white flex items-center justify-center">
                    <img src={logo} alt="" className="w-10" />
                    Blood Aid</h2>

            </div>

            {/* navbar center */}
            <div className="navbar-center hidden lg:flex text-white">
                <ul className="menu menu-horizontal px-1 space-x-3">
                    {navOptions}
                </ul>
            </div>

            {/* navbar end */}
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to='/dashboard'>
                                <RxDashboard size={18} /> Dashboard

                            </Link>
                        </li>

                        <li><a><AiOutlineLogout size={18} />Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;