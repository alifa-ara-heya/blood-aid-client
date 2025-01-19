import { useQuery } from "@tanstack/react-query";
import Heading from "../../components/Shared/Heading";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const DashboardHome = () => {
    const { user } = useAuth();
    const name = user?.displayName;
    const email = user?.email;
    const axiosSecure = useAxiosSecure();
    // console.log(email);

    //getting donation requests
    const { data: donationRequests = [], refetch } = useQuery({
        queryKey: ['donationRequests', email],
        enabled: !!email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/donationRequests/${email}?limit=3`);
            return data;
        }
    })


    //deleting the donation request
    const handleDeleteDonationRequest = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/delete-donation-request/${id}`);

                if (data.deletedCount > 0) {
                    await Swal.fire({
                        title: "Success!",
                        text: "Deleted Successfully",
                        icon: "success"
                    });

                    // Refetch the user data to update the UI
                    refetch();
                } else {
                    // Handle case where deletion fails
                    await Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the item. Please try again.",
                        icon: "error"
                    });
                }
            }

        } catch (error) {
            console.error('Error deleting the item:', error);
            // Show error SweetAlert
            await Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting the item.",
                icon: "error"
            });
        }
    }


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
                                        <td className="hover:scale-95 duration-200 hover:transition-transform text-center text-yellow-500">
                                            <Link to={`update-donation-request/${request._id}`}>
                                                <button>
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                        </td>
                                        <td className="text-center text-primary hover:scale-95 duration-200 hover:transition-transform">
                                            <button onClick={() => handleDeleteDonationRequest(request._id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </td>
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