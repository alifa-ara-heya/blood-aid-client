import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/UseAuth";
import useRole from "../../hooks/useRole";

const Profile = () => {
    const { user } = useAuth();
    const [role, isLoading] = useRole();

    if (isLoading) return <LoadingSpinner />
    return (
        <div>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <h2>Welcome from profile page</h2>
            <h2>Role: {role}</h2>
        </div>
    );
};

export default Profile;