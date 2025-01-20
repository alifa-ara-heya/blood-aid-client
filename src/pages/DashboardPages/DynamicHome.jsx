import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import useRole from "../../hooks/useRole";
import AdminHome from "./AdminHome";
import DonorHome from "./DonorHome";

const DynamicHome = () => {
    const [role, isLoading] = useRole();

    if (isLoading) return <LoadingSpinner />

    return role === 'admin' ? <AdminHome /> : <DonorHome />;
};

export default DynamicHome;