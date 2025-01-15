import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound404 from "../pages/NotFound404";
import Login from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '*',
                element: <NotFound404 />
            }
        ]
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'signUp',
        element: <SignUp />
    }
]);

export default router;