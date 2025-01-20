import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound404 from "../pages/NotFound404";
import Login from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/DashboardPages/Profile";
import CreateDonationRequest from "../pages/DashboardPages/CreateDonationRequest";
import DonorHome from "../pages/DashboardPages/Donor/DonorHome";
import UpdateDonation from "../pages/DashboardPages/UpdateDonation";
import MyDonationRequests from "../pages/DashboardPages/Donor/MyDonationRequests";
import DonationDetails from "../pages/DashboardPages/DonationDetails";
import BloodDonationRequests from "../pages/BloodDonationRequests";
import DynamicHome from "../pages/DashboardPages/DynamicHome";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/DashboardPages/Admin/AllUsers";
import AllRequests from "../pages/DashboardPages/Admin/AllRequests";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound404 />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'blood-donation-requests',
                element: <BloodDonationRequests />
            },
            {
                path: 'donation-details/:id',
                element: <PrivateRoute>
                    <DonationDetails />
                </PrivateRoute>
            },
        ]
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'signUp',
        element: <SignUp />
    },

    // Global Catch-All Route (For unmatched top-level paths)
    {
        path: "*",
        element: <NotFound404 />
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
            //default route
            {
                index: true,
                element: <DynamicHome />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'create-donation-request',
                element: <CreateDonationRequest />
            },
            {
                path: 'update-donation-request/:id',
                element: <UpdateDonation />,
            },
            {
                path: 'my-all-donations',
                element: <MyDonationRequests />
            },
            {
                path: 'all-users',
                element: <AdminRoute>
                    <AllUsers />
                </AdminRoute>
            },
            {
                path: 'all-blood-donation-requests',
                element: <AdminRoute>
                    <AllRequests />
                </AdminRoute>
            }
        ]
    }
]);

export default router;