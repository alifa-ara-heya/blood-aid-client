import { useQuery } from "@tanstack/react-query";
import Heading from "../../components/Shared/Heading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import bg from '../../assets/fabric_1.webp';
import { Link } from "react-router-dom";
import { GiBlood } from "react-icons/gi";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import { useState } from "react";

const BloodDonationRequests = () => {
    const axiosPublic = useAxiosPublic();
    const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order

    //getting only the pending requests
    const { data: donationRequests = [], isLoading } = useQuery({
        queryKey: ['donation-requests'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/donationRequests');
            return data;
        }
    })

    //sorting function
    const sortedRequests = [...donationRequests.sort((a, b) => {
        const dateA = new Date(a.donationDate);
        const dateB = new Date(b.donationDate)
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    })]

    //toggle sorting order
    const toggleSorting = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    }

    // console.log(donationRequests.length);

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="py-10 w-11/12 mx-auto">
            <Heading title="Blood Donation Requests" subtitle="Explore the list of blood donation requests and find out how you can help save a life. Review the details and click 'Donate' to lend a helping hand. 🩸" />

            {/* Sort Button */}
            <div className="w-11/12 mx-auto flex justify-end mt-10">
                <button
                    onClick={toggleSorting}
                    className="btn bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition">
                    Sort by Date {sortOrder === "asc" ? "↑" : "↓"}
                </button>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 mx-auto py-10 ">
                {
                    sortedRequests.map(request => <div key={request._id} className="card shadow-xl" style={{ backgroundImage: `url(${bg})` }}>
                        <div className="card-body">
                            {/* Recipient Name */}
                            <h2 className="card-title text-lg font-bold text-gray-700">
                                Recipient: {request.recipientName}
                            </h2>

                            {/* Blood Group */}
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Blood Group:</span> {request.recipientBloodGroup}
                            </p>

                            {/* Location */}
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Location:</span> {request.district}, {request.upazila}
                            </p>

                            {/* Date & Time */}
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Date:</span> {new Date(request.donationDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Time:</span> {request.donationTime}
                            </p>

                            {/* View Details Button */}
                            <div className="card-actions mt-4">
                                <Link to={`/donation-details/${request._id}`}>
                                    <button className="btn btn-primary bg-gradient-to-r from-rose-700 to-rose-500 text-white border-none">
                                        View Details
                                        <GiBlood />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>)
                }

            </div>

        </div>
    );
};

export default BloodDonationRequests;