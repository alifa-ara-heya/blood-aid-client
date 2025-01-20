import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../components/Shared/Heading";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const AllRequests = () => {
    const { user } = useAuth();
    // const email = user?.email;
    const name = user?.displayName;
    const axiosSecure = useAxiosSecure();
    const [filterStatus, setFilterStatus] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(6);

    //getting all donation requests
    const { data = {}, refetch } = useQuery({
        queryKey: ['allDonationRequests', page, filterStatus],
        enabled: !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allDonationRequests?filterStatus=${filterStatus}&page=${page}&limit=${limit}`);
            return data;
        }
    });

    const { donationRequests = [], totalPages } = data;

    const handlePrevious = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };


    //done status update

    const updatedDonationStatusDone = {
        donationStatus: "done"
    }

    const handleDoneButton = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to mark this donation as done?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, mark as done!"
            });
            if (result.isConfirmed) {
                const { data: updatedStatus } = await axiosSecure.patch(`update-donation-status/${id}`, updatedDonationStatusDone);
                if (updatedStatus.modifiedCount > 0) {
                    await Swal.fire({
                        title: "Success",
                        text: "Updated Successfully. We hope you had a great experience!",
                        icon: "success"
                    });

                    refetch();
                }
                else {
                    // Handle case where deletion fails
                    await Swal.fire({
                        title: "Error!",
                        text: "Failed to update the status. Please try again.",
                        icon: "error"
                    });
                }
            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "Could not update the donation request. Please try again later.",
                icon: "error",
            });
        }
    }

    //cancel status update

    const updateDonationStatusCancel = {
        donationStatus: "canceled"
    }

    const handleCancelButton = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to mark this donation as canceled?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, mark as canceled!"
            });
            if (result.isConfirmed) {
                const { data: updatedStatus } = await axiosSecure.patch(`update-donation-status/${id}`, updateDonationStatusCancel);
                if (updatedStatus.modifiedCount > 0) {
                    await Swal.fire({
                        title: "Success",
                        text: "Updated Successfully. We hope you had a great experience!",
                        icon: "success"
                    });

                    refetch();
                }
                else {
                    // Handle case where deletion fails
                    await Swal.fire({
                        title: "Error!",
                        text: "Failed to update the status. Please try again.",
                        icon: "error"
                    });
                }
            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "Could not update the donation request. Please try again later.",
                icon: "error",
            });
        }
    }

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


    return (
        <div>
            <Heading title={'All Donation Requests'} subtitle={`Welcome, ${name}. Thank you for being a hero and saving lives through your selfless donations. Your generosity brings hope and strength to those in need—thank you for making a difference!`} />

            <select
                className="select select-bordered w-1/4 bg-gray-100 my-6"
                name="type"
                id='type'
                onChange={e => setFilterStatus(e.target.value)}
                value={filterStatus}>
                <option value=''>Filter By Request Status</option>
                <option value="pending">Pending</option>
                <option value="inprogress">Inprogress</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
            </select>

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
                            <th>Donation Status</th>
                            <th>Donor Name</th>
                            <th>Donor Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>View Details</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donationRequests.map((request, index) => {
                                const globalIndex = (page - 1) * limit + index + 1;
                                return (
                                    <tr key={index}>
                                        <td>{globalIndex}</td>
                                        <td>{request.recipientName}</td>
                                        <td>{request.recipientBloodGroup}</td>
                                        <td>{request.hospital}</td>
                                        <td>{request.district}</td>
                                        <td>{request.upazila}</td>
                                        <td>{request.donationDate}</td>
                                        <td>{request.donationTime}</td>
                                        <td
                                            className={`text-center
                                            ${request.donationStatus === 'pending' ? 'bg-yellow-100 text-yellow-600' : ''}
                                            ${request.donationStatus === 'inprogress' ? 'bg-blue-100 text-blue-600' : ''}
                                            ${request.donationStatus === 'done' ? 'bg-green-100 text-green-600' : ''}
                                            ${request.donationStatus === 'canceled' ? 'bg-red-100 text-red-600' : ''}
                                        `}
                                        >
                                            {request.donationStatus}
                                        </td>


                                        <td>{request.donationStatus === 'inprogress' ?
                                            request.donorName : <span ></span>
                                        }</td>


                                        <td>{request.donationStatus === 'inprogress' ?
                                            request.donorEmail : <span ></span>
                                        }</td>


                                        <td className="hover:scale-95 duration-200 hover:transition-transform text-center text-yellow-500">
                                            <Link to={`/dashboard/update-donation-request/${request._id}`}>
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
                                        <td className="hover:scale-95 duration-200 hover:transition-transform text-center text-yellow-500 text-xl">
                                            <Link to={`/donation-details/${request._id}`}>
                                                <button>
                                                    <FcViewDetails />
                                                </button>
                                            </Link>
                                        </td>

                                        {request.donationStatus === 'inprogress' && <td><button
                                            onClick={() => handleDoneButton(request._id)} className="btn bg-green-500 text-white btn-sm">Done</button></td>}
                                        {request.donationStatus === 'inprogress' && <td><button onClick={() => handleCancelButton(request._id)} className="btn bg-red-500 text-white btn-sm">Cancel</button></td>}
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>}

            {/* Pagination Controls */}
            <div className="join flex justify-center items-center gap-2 mt-4">
                <button
                    className="join-item btn"
                    onClick={handlePrevious}
                    disabled={page === 1}
                >
                    <FaArrowLeft />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`join-item btn ${page === i + 1 ? "btn-active" : ""}`}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="join-item btn"
                    onClick={handleNext}
                    disabled={page === totalPages}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>


    );
};

export default AllRequests;