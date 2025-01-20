import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import useRole from "../../hooks/useRole";
import AdminHome from "./Admin/AdminHome";
import DonorHome from "./Donor/DonorHome";
import VolunteerHome from "./Volunteer/VolunteerHome";

const DynamicHome = () => {
    const [role, isLoading] = useRole();

    if (isLoading) return <LoadingSpinner />

    if (role === 'admin') {
        return <AdminHome />
    } else if (role === 'donor') {
        return <DonorHome />
    } else if (role === 'volunteer') {
        return <VolunteerHome />
    } else {
        // Handle unauthorized access or unexpected roles
        return <Navigate to="/" replace />
    }

};

export default DynamicHome;