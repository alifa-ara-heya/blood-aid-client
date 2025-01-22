import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for validation
import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../hooks/UseAuth";
import useRole from "../hooks/useRole";

const AdminOrVolunteerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();
    const location = useLocation();

    if (loading || isLoading) return <LoadingSpinner />;

    if (user && (role === 'admin' || role === 'volunteer')) {
        return children;
    }

    return (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

// Add prop validation
AdminOrVolunteerRoute.propTypes = {
    children: PropTypes.node.isRequired, // Validate that children is a React node and required
};

export default AdminOrVolunteerRoute;