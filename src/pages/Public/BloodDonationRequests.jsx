import { useQuery } from "@tanstack/react-query";
import Heading from "../../components/Shared/Heading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import bg from '../../assets/fabric_1.webp';
import { Link } from "react-router-dom";
import { GiBlood } from "react-icons/gi";

const BloodDonationRequests = () => {
    const axiosPublic = useAxiosPublic();

    //getting only the pending requests
    const { data: donationRequests = [] } = useQuery({
        queryKey: ['donation-requests'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/donationRequests');
            return data;
        }
    })

    console.log(donationRequests.length);

    return (
        <div className="xl:py-10">
            <Heading title="Blood Donation Requests" subtitle="Explore the list of blood donation requests and find out how you can help save a life. Review the details and click 'Donate' to lend a helping hand. 🩸" />

            {/* Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 mx-auto py-10 ">
                {
                    donationRequests.map(request => <div key={request._id} className="card shadow-xl" style={{ backgroundImage: `url(${bg})` }}>
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