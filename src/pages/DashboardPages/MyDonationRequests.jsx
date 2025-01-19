import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyDonationRequests = () => {
    const { user } = useAuth();
    const email = user?.email;
    // const name = user?.displayName;
    const axiosSecure = useAxiosSecure();
    const page = 1;

    const { data: donationRequests = [] } = useQuery({
        queryKey: ['donationRequests', email, page],
        enabled: !!email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/donationRequests/${email}?limit=3&page=${page}`);
            return data;
        }
    });

    console.log("Donation Requests for Page:", page, donationRequests.length);

    return (
        <div>
            <h2>My All Donations</h2>
        </div>
    );
};

export default MyDonationRequests;