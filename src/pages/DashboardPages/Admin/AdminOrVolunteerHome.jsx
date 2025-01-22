import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsersRectangle } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { BiSolidDonateBlood } from "react-icons/bi";

const AdminOrVolunteerHome = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    const name = user?.displayName;
    // const email = user?.email;

    const { data: stat = {} } = useQuery({
        queryKey: ['admin-stat'],
        enabled: !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get('/admin-stat')
            return data
        }
    });

    // console.log(stat);
    const { totalUsers, totalDonationRequests, funds } = stat;
    // console.log(funds);



    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-primary">Welcome, {name}</h1>
            <p className="text-gray-600 mt-4 text-lg">Manage users, donations, and funding from your dashboard.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-100 p-8 rounded-lg shadow flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-blue-600">Total Users</h2>
                        <p className="text-5xl font-bold">{totalUsers}</p>
                    </div>
                    <div className="text-5xl text-blue-500">
                        <FaUsersRectangle />
                    </div>
                </div>
                <div className="bg-green-100 p-8 rounded-lg shadow flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-green-600">Total Funding</h2>
                        <p className="text-5xl font-bold">${funds}</p>
                    </div>
                    <div className="text-6xl text-green-500">
                        <GiReceiveMoney />
                    </div>
                </div>
                <div className="bg-red-100 p-8 rounded-lg shadow flex justify-between items-center">
                    <div> <h2 className="text-xl font-semibold text-red-600">Total Blood Requests</h2>
                        <p className="text-5xl font-bold">{totalDonationRequests}</p></div>
                    <div className="text-6xl text-red-500">
                        <BiSolidDonateBlood />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrVolunteerHome;