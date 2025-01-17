import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />
    }
    if (user) {
        return children;
    }
    return (
        <Navigate to='/login' state={{ from: location }} replace />
    )

};
PrivateRoute.propTypes = {
    children: PropTypes.element
}

export default PrivateRoute;