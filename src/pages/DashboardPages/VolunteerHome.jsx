import useAuth from "../../hooks/UseAuth";

const VolunteerHome = () => {
    const { user } = useAuth();
    const name = user?.displayName;
    return (
        <div>
            <p>Welcome Volunteer: {name}</p>
        </div>
    );
};

export default VolunteerHome;