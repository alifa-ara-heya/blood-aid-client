import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../components/Shared/Heading";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useDistrictsAndUpazilas from "../../hooks/useDistrictsAndUpazilas";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const UpdateDonation = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    // console.log(id);

    const { data: donationData = {}, isLoading: isRequestDataLoading, refetch } = useQuery({
        queryKey: ['donation-request', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`donationRequest/${id}`);
            return data;
        }
    });
    // console.log(donationData.recipientName);

    const [selectedDistrictId, setSelectedDistrictId] = useState(''); // Initialize with default

    //fetching districts and upazilas
    const {
        districtsData,
        upazilasData,
        isDistrictsLoading,
        isUpazilasLoading,
    } = useDistrictsAndUpazilas();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.displayName,
            email: user?.email,
        }
    });

    const name = user?.displayName;
    const email = user?.email;

    const handleDistrictChange = (event) => {
        setSelectedDistrictId(event.target.value);
        // console.log('Selected District ID:', event.target.value);
    };

    // Filter upazilas based on the selected district
    const filteredUpazilas = upazilasData.filter(upazila => upazila.district_id === selectedDistrictId)

    const onSubmit = async data => {
        //storing the district and upazila name with it's id
        const selectedDistrict = districtsData.find(district => district.id === data.district)
        const selectedDistrictName = selectedDistrict.name
        // console.log(selectedDistrictName);

        const selectedUpazila = upazilasData.find(upazila => upazila.id === data.upazila)
        const selectedUpazilaName = selectedUpazila?.name || '';
        // console.log(selectedUpazilaName);

        const updatedData = {
            recipientName: data.recipientName,
            recipientBloodGroup: data.bloodGroup,
            district: selectedDistrictName,
            upazila: selectedUpazilaName,
            address: data.address,
            hospital: data.hospital,
            contactNumber: data.contactNumber,
            donationDate: data.donationDate,
            donationTime: data.donationTime,
            message: data.message,
        }

        // console.log(updatedData);

        try {
            const { data: updatedUserData } = await axiosSecure.put(`/update-donation-request/${id}`, updatedData);
            // console.log(updatedUserData);
            if (updatedUserData.modifiedCount > 0) {
                Swal.fire({
                    title: "Success",
                    text: "Updated Successfully",
                    icon: "success"
                });
                // Reset the form values
                reset(updatedData);
                // Refetch the user data to update the UI
                refetch();
                navigate('/dashboard/my-all-donations');
            }

        } catch (error) {
            console.error('Failed to update user data:', error);
        }

    }

    if (isDistrictsLoading || isUpazilasLoading || isRequestDataLoading) {
        return <LoadingSpinner />
    }
    return (
        <div>
            <Heading title={'Update Donation Request'} subtitle={'Thank you for being a hero and saving lives through your selfless donations. Your generosity brings hope and strength to those in need—thank you for making a difference!'} />


            <div className="card mx-auto w-[90%] shadow-2xl xl:max-w-[960px] p-10 lg:mb-16">
                <form onSubmit={handleSubmit(onSubmit)} className="md:card-body">

                    {/* form-row-1 */}
                    <div className="flex flex-col md:gap-5 md:flex-row justify-center items-center">
                        {/* requester's name */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your Name"
                                className="input input-bordered"
                                readOnly
                                defaultValue={name}
                                disabled={true}
                            />
                        </div>

                        {/* requester's email */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                placeholder="email" className="input input-bordered"
                                readOnly
                                defaultValue={email}
                                disabled={true}
                            />

                        </div>
                    </div>

                    {/* form-row-2 */}
                    <div className="flex md:gap-5 flex-col md:flex-row justify-center items-center">

                        {/* recipient name */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Recipient&apos;s Name</span>
                            </label>
                            <input type="text" placeholder="Recipient's Name"
                                defaultValue={donationData.recipientName}
                                className="input input-bordered"
                                {...register('recipientName', { required: true })}
                            />
                            {
                                errors.recipientName && <span className='text-red-500 text-sm'>Recipient Name is required.</span>
                            }
                        </div>

                        {/* Blood Group*/}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Blood Group</span>
                            </label>

                            <select className="select select-bordered text-gray-400 text-base capitalize"
                                defaultValue={donationData.recipientBloodGroup}
                                {...register('recipientBloodGroup', { required: true })}>
                                <option value='' disabled>Choose from below</option>
                                <option value='A+'>A+</option>
                                <option value='A-'>A-</option>
                                <option value='B+'>B+</option>
                                <option value='B-'>B-</option>
                                <option value='AB+'>AB+</option>
                                <option value='AB-'>AB-</option>
                                <option value='O+'>O+</option>
                                <option value='O-'>O-</option>
                            </select>
                            {errors.bloodGroup && <span className='text-red-500 text-sm'>Blood Group is required.</span>}
                        </div>


                    </div>

                    {/* form-row-3 */}
                    <div className="flex flex-col md:gap-5 md:flex-row justify-center items-center">
                        {/* Districts */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">District</span>
                            </label>
                            <select className="select select-bordered text-gray-400 text-base capitalize"
                                {...register('district', { required: "District is required" })}
                                defaultValue={donationData.district}
                                onChange={handleDistrictChange}>
                                <option value='' disabled>Choose from below</option>
                                {
                                    districtsData.map(district => <option key={district.id} value={district.id}>
                                        {district.name}
                                    </option>)
                                }
                            </select>
                            {errors.district && (
                                <span className="text-red-400 text-sm">{errors.district.message}</span>
                            )}
                        </div>

                        {/* upazila */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Upazila</span>
                            </label>
                            <select name="type" className="select select-bordered text-gray-400 text-base capitalize" required defaultValue={donationData.upazila}
                                {...register('upazila', { required: "Upazila is required" })}>
                                <option value='' disabled>Choose from below</option>
                                {filteredUpazilas.map(upazila => <option key={upazila.id} value={upazila.id}>{upazila.name}</option>)}
                            </select>
                            {errors.upazila && (
                                <span className="text-red-400 text-sm">
                                    {errors.upazila.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* form-row-4 */}
                    <div className="flex md:gap-5 flex-col md:flex-row justify-center items-center">
                        {/* Hospital's name */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Hospital&apos;s Name</span>
                            </label>
                            <input type="text" placeholder="e.g. Dhaka Medical College Hospital"
                                className="input input-bordered"
                                {...register('hospital', { required: true })}
                                defaultValue={donationData.hospital}
                            />
                            {errors.hospital && <span className='text-red-500 text-sm'>Hospital Name is required.</span>}
                        </div>

                        {/* Full Address Line*/}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Full Address Line</span>
                            </label>
                            <input type="text" placeholder="e.g. 1/2, Block-C, Mirpur-2, Dhaka-1216"
                                className="input input-bordered"
                                {...register('address', { required: true })}
                                defaultValue={donationData.address}
                            />
                            {errors.address && <span className='text-red-500 text-sm'>Address is required.</span>}
                        </div>
                    </div>

                    {/* form-row-5 */}
                    <div className="flex flex-col md:gap-5 md:flex-row justify-center items-center">
                        {/* Contact Number */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Contact Number</span>
                            </label>
                            <input type="text" placeholder="e.g. 017XXXXXXXX"
                                className="input input-bordered"
                                {...register('contactNumber', { required: true })}
                                defaultValue={donationData.contactNumber}
                            />
                            {errors.contactNumber && <span className='text-red-500 text-sm'>Contact Number is required.</span>}
                        </div>

                        {/* Date Needed */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Date Needed</span>
                            </label>
                            <input type="date"
                                className="input input-bordered"
                                {...register('donationDate', { required: true })}
                                defaultValue={donationData.donationDate}
                            />
                            {errors.donationDate && <span className='text-red-500 text-sm'>Date is required.</span>}
                        </div>
                    </div>

                    {/* form-row-6 */}
                    <div className="flex flex-col md:gap-5 md:flex-row justify-center items-center">

                        {/* time */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Time</span>
                            </label>
                            <input type="time"
                                className="input input-bordered"
                                {...register('donationTime', { required: true })}
                                defaultValue={donationData.donationTime}
                            />
                            {errors.donationTime && <span className='text-red-500 text-sm'>Time is required.</span>}
                        </div>

                        {/*request donation message */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Request Message</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered"
                                placeholder="Additional Information, e.g. Urgency, Special Instructions, Why Blood is Needed etc.."
                                {...register('message', { required: true })}
                                defaultValue={donationData.message}
                            ></textarea>
                            {errors.message && <span className='text-red-500 text-sm'>Message is required.</span>}
                        </div>


                    </div>



                    <div className="form-control mt-6">
                        <button className="btn bg-gradient-to-r from-rose-700 to-rose-500 border-none text-white">Update Request</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateDonation;