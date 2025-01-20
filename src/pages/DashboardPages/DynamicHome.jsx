import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import useRole from "../../hooks/useRole";
import AdminHome from "./AdminHome";
import DonorHome from "./DonorHome";
import VolunteerHome from "./VolunteerHome";

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
        return <Navigate to="/" replace />
    }

};

export default DynamicHome;