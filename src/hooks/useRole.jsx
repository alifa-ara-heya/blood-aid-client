import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    // console.log(user?.email);
    // console.log(loading);
    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email, //Fetch only if not loading and user email exists

        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/role/${user?.email}`)
            console.log('Fetched Role:', data.role);
            // console.log('API Response:', data); // Debugging
            return data.role
        }

    })

    console.log('role', role);


    return [role, isLoading]
};

export default useRole;