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
import DonorHome from "../pages/DashboardPages/DonorHome";
import UpdateDonation from "../pages/DashboardPages/UpdateDonation";
import MyDonationRequests from "../pages/DashboardPages/MyDonationRequests";
import DonationDetails from "../pages/DashboardPages/DonationDetails";
import BloodDonationRequests from "../pages/BloodDonationRequests";
import DynamicHome from "../pages/DashboardPages/DynamicHome";

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
            }
        ]
    }
]);

export default router;