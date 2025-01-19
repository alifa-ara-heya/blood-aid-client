import { useQuery } from "@tanstack/react-query";
import Heading from "../../components/Shared/Heading";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const DashboardHome = () => {
    const { user } = useAuth();
    const name = user?.displayName;
    const email = user?.email;
    const axiosSecure = useAxiosSecure();
    // console.log(email);

    //getting donation requests
    const { data: donationRequests = [] } = useQuery({
        queryKey: ['donationRequests', email],
        enabled: !!email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/donationRequests/${email}?limit=3`);
            return data;
        }
    })

    //updating the donation request


    //deleting the donation request

    // console.log(donationRequests.length);


    return (
        <div>
            {/* welcome section */}
            <Heading title={`Welcome, ${name}`} subtitle={'Thank you for being a hero and saving lives through your selfless donations. Your generosity brings hope and strength to those in need—thank you for making a difference!'} />

            {/* Donation requests */}

            {donationRequests.length > 0 && <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Blood Group</th>
                            <th>Hospital</th>
                            <th>District</th>
                            <th>Upazila</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donationRequests.map((request, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{request.recipientName}</td>
                                        <td>{request.recipientBloodGroup}</td>
                                        <td>{request.hospital}</td>
                                        <td>{request.district}</td>
                                        <td>{request.upazila}</td>
                                        <td>{request.donationDate}</td>
                                        <td>{request.donationTime}</td>
                                        <td className="hover:scale-95 duration-200 hover:transition-transform text-center text-yellow-500"><button><FaEdit /></button></td>
                                        <td className="text-center text-primary hover:scale-95 duration-200 hover:transition-transform"><button><FaTrashAlt /></button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>}
        </div>
    );
};

export default DashboardHome;