import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import useRole from "../../hooks/useRole";
import AdminOrVolunteerHome from "./Admin/AdminOrVolunteerHome";
import DonorHome from "./Donor/DonorHome";


const DynamicHome = () => {
    const [role, isLoading] = useRole();

    if (isLoading) return <LoadingSpinner />

    if (role === 'admin' || role === 'volunteer') {
        return <AdminOrVolunteerHome />
    } else if (role === 'donor') {
        return <DonorHome />
    }
    else {
        // Handle unauthorized access or unexpected roles
        return <Navigate to="/" replace />
    }

};

export default DynamicHome;