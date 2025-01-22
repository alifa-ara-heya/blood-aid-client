import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Heading from "../../components/Shared/Heading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import bg from '../../assets/fabric_1.webp';
import nameIcon from '../../assets/name-icon.png'
import mapIcon from '../../assets/map.png'
import hospitalIcon from '../../assets/hospital.png'
import scheduleIcon from '../../assets/schedule.png'
import informationIcon from '../../assets/information-button.png'
import DonateModal from "../../components/Modal/DonateModal";
import { BiDonateBlood } from "react-icons/bi";


const DonationDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: donationData = {}, isLoading: isRequestDataLoading } = useQuery(['donation-request', id], async () => {
        const { data } = await axiosSecure.get(`donationRequest/${id}`);
        return data;
    });

    if (isRequestDataLoading) return <LoadingSpinner />;

    return (
        <div className="w-11/12 mx-auto mt-8">
            <Heading title="Donation Details" subtitle="Explore the details of this donation request and learn how you can help save a life. Review the details and click 'Donate' to lend a helping hand." />

            {/* Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto my-8 xl:my-10">
                {/* Recipient Information */}
                <div className="bg-gray-100 p-4 card card-body shadow-md" style={{ backgroundImage: `url(${bg})` }}>
                    <img src={nameIcon} alt="" className="w-20 mb-3" />
                    <h2 className="text-xl font-semibold text-primary mb-3">Recipient Information</h2>
                    <p className="text-gray-600">
                        <span className="font-semibold">Name:</span> {donationData.recipientName}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Blood Group:</span> {donationData.recipientBloodGroup}
                    </p>
                </div>

                {/* Location Section */}
                <div className="bg-gray-100 p-4 card card-body shadow-md" style={{ backgroundImage: `url(${bg})` }}>
                    <img src={mapIcon} alt="" className="w-20 mb-3" />
                    <h2 className="text-xl font-semibold text-primary mb-3">Location Details</h2>
                    <p className="text-gray-600">
                        <span className="font-semibold">District:</span> {donationData.district}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Upazila:</span> {donationData.upazila}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Address:</span> {donationData.address}
                    </p>
                </div>

                {/* Hospital Section */}
                <div className="bg-gray-100 p-4 card card-body shadow-md" style={{ backgroundImage: `url(${bg})` }}>
                    <img src={hospitalIcon} alt="" className="w-20 mb-3" />
                    <h2 className="text-xl font-semibold text-primary mb-3">Hospital Details</h2>
                    <p className="text-gray-600">
                        <span className="font-semibold">Name:</span> {donationData.hospital}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Contact:</span> {donationData.contactNumber}
                    </p>
                </div>

                {/* Donation Schedule */}
                <div className="bg-gray-100 p-4 card card-body shadow-md" style={{ backgroundImage: `url(${bg})` }}>
                    <img src={scheduleIcon} alt="" className="w-20 mb-3" />
                    <h2 className="text-xl font-semibold text-primary mb-3">Donation Schedule</h2>
                    <p className="text-gray-600">
                        <span className="font-semibold">Date:</span> {new Date(donationData.donationDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Time:</span> {donationData.donationTime}
                    </p>
                </div>

                {/* Additional Information */}
                <div className="bg-gray-100 p-4 card card-body shadow-md" style={{ backgroundImage: `url(${bg})` }}>
                    <img src={informationIcon} alt="" className="w-20 mb-3" />
                    <h2 className="text-xl font-semibold text-primary mb-3">Additional Information</h2>
                    <p className="text-gray-600">
                        <span className="font-semibold">Message:</span> {donationData.message}
                    </p>
                </div>
            </div>



            {/* Donate Button */}
            <div className="my-6 lg:my-12 flex justify-center">

                <button
                    className="btn bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                    onClick={() => document.getElementById('my_modal_5').showModal()}
                >
                    Donate Now <BiDonateBlood size={20} />
                </button>

            </div>
            <DonateModal donationData={donationData} />
        </div>
    );
};

export default DonationDetails;
