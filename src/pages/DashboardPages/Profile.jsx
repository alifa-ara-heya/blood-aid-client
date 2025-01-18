import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/UseAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useDistrictsAndUpazilas from "../../hooks/useDistrictsAndUpazilas";
import Heading from "../../components/Shared/Heading";

const Profile = () => {
    const methods = useForm();
    const { user } = useAuth();
    const [role, isLoading] = useRole();
    const axiosSecure = useAxiosSecure();
    const [isEditable, setIsEditable] = useState(false);

    const { data: userData = {}, isLoading: isLoadingUserData } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`user/${user?.email}`);
            return data;
        }
    });

    const [selectedDistrictId, setSelectedDistrictId] = useState(userData?.district || ''); // Initialize with default

    const handleDistrictChange = (event) => {
        setSelectedDistrictId(event.target.value);
        console.log('Selected District ID:', event.target.value);
    };
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: userData?.name || '',
            email: userData?.email || '',
            bloodGroup: userData?.bloodGroup || '',
            photo: userData?.image || '',
            district: userData?.district || '',
            upazila: userData?.upazila || '',
        },
    });

    const {
        districtsData,
        upazilasData,
        isDistrictsLoading,
        isUpazilasLoading,
    } = useDistrictsAndUpazilas();

    console.log(districtsData?.length);
    console.log(upazilasData?.length);
    console.log(districtsData);


    // const selectedDistrictId = watch('district');

    console.log(selectedDistrictId); //nothing consoles
    useEffect(() => {
        console.log('Selected District ID:', selectedDistrictId); // Logs dynamically when the district field changes
    }, [selectedDistrictId]); // Re-run the effect whenever the district value changes

    // Filter upazilas based on the selected district
    const filteredUpazilas = upazilasData.filter(upazila => upazila.district_id === selectedDistrictId)

    // // Find the names of the selected district and upazila
    const selectedDistrict = districtsData.find(
        (district) => district.id === selectedDistrictId
    );
    // console.log(selectedDistrict);

    const selectedDistrictName = selectedDistrict?.name || "";

    // console.log(filteredUpazilas);
    console.log(selectedDistrictName);
    console.log(userData.district);
    // console.log(userData.bloodGroup);
    // console.log(userData.image);
    console.log(userData.upazila);

    useEffect(() => {
        if (!isEditable) {
            methods.reset(userData); // Reset the form when exiting edit mode
        }
    }, [isEditable, methods, userData]);

    const toggleEditMode = () => {
        setIsEditable((prevState) => !prevState);
    };

    const onSubmit = (data) => {
        // Perform API call to save the updated data
        console.log(data);

        //storing the district and upazila name with it's id
        const selectedDistrict = districtsData.find(district => district.id === data.district)
        const selectedDistrictName = selectedDistrict.name
        console.log(selectedDistrictName);

        const selectedUpazila = upazilasData.find(upazila => upazila.id === data.upazila)
        const selectedUpazilaName = selectedUpazila?.name || '';
        console.log(selectedUpazilaName);

        // toggleEditMode(); // Exit edit mode after saving
    };

    if (isDistrictsLoading || isUpazilasLoading || isLoading || isLoadingUserData) return <LoadingSpinner />;

    return (

        <div >
            <Heading title={"Your Profile Overview"} subtitle={"Manage your personal details, update your information, and keep your profile up-to-date."} />
            <div className="flex flex-col justify-center items-center md:min-h-screen p-10 lg:p-20 container mx-auto w-full relative" >
                <Helmet>
                    <title>Profile</title>
                </Helmet>
                {/* <h2>Welcome from profile page: {userData.name} </h2>
                <h2>Role: {role}</h2> */}
                <img src={userData.image} alt="" className="w-32 h-32 md:w-60 rounded-full md:h-60 object-cover absolute xl:-top-12 md:top-9 left-1/2 transform -translate-x-1/2 -top-12  p-3 border-secondary border-2" />
                <div className="card mx-auto w-[90%] shadow-2xl xl:max-w-[960px] p-10 xl:pt-28 lg:mb-16">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-bold mb-4">User Profile</h2> <div className="badge badge-primary badge-outline">{role}</div>
                    </div>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="md:card-body">

                        {/* form-row-1 */}

                        <div className="flex flex-col md:gap-5 md:flex-row justify-center items-center">
                            {/* Name Field */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...methods.register('name', { required: 'Name is required' })}
                                    readOnly={!isEditable}
                                    className={`input input-bordered text-gray-500 ${isEditable ? 'border-gray-500 text-gray-800' : 'border-gray-200 bg-gray-100 '}`}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            {/* Email Field */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...methods.register('email')}
                                    readOnly={true} // Email is always read-only
                                    className="input input-bordered 
                                    text-gray-500 border-gray-200 bg-gray-100"
                                />
                            </div>
                        </div>

                        {/* form-row-2 */}

                        <div className="flex flex-col md:gap-5 md:flex-row justify-center items-center">
                            {/* Blood Group Field */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>
                                <select
                                    {...methods.register('bloodGroup', { required: 'Blood group is required' })}
                                    disabled={!isEditable}
                                    className={`select select-bordered text-gray-500 text-base capitalize ${isEditable ? 'border-gray-400' : 'border-gray-200 bg-gray-100'}`}
                                >
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
                                {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>}
                            </div>

                            {/* photo upload */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Upload Image</span>
                                </label>
                                <input type="file" className={`file-input  file-input-primary border-gray-300 ${isEditable ? 'border-gray-400' : 'border-gray-200 bg-gray-100'}`}
                                    disabled={!isEditable}
                                    {...methods.register('photo')}
                                />


                            </div>
                        </div>

                        {/*  form-row-3 */}
                        <div className="flex flex-col md:gap-5 md:flex-row justify-center items-center">
                            {/* District Field */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">District</span>
                                </label>
                                <select
                                    {...methods.register('district', { required: 'District is required' })}
                                    disabled={!isEditable}
                                    defaultValue={userData.district}
                                    onChange={handleDistrictChange} // Capture change manually
                                    className={`select select-bordered text-gray-400 text-base capitalize ${isEditable ? 'border-gray-400' : 'border-gray-200 bg-gray-100'}`}
                                >
                                    <option value='' disabled>Choose from below</option>
                                    {districtsData.map((district) => (
                                        <option key={district.id} value={district.id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
                            </div>

                            {/* Upazila Field */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Upazila</span>
                                </label>
                                <select
                                    {...methods.register('upazila', { required: 'Upazila is required' })}
                                    disabled={!isEditable}
                                    defaultValue={userData.upazila}
                                    className={`select select-bordered text-gray-400 text-base capitalize ${isEditable ? 'border-gray-400' : 'border-gray-200 bg-gray-100'}`}
                                >
                                    <option value='' disabled>Choose from below</option>
                                    {filteredUpazilas.map(upazila => <option key={upazila.id} value={upazila.id}>{upazila.name}</option>)}
                                </select>

                                {errors.upazila && <p className="text-red-500 text-sm">{errors.upazila.message}</p>}
                            </div>

                        </div>


                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={toggleEditMode}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Edit
                            </button>
                            <button
                                type="submit"
                                disabled={!isEditable}
                                className="px-4 py-2 btn rounded-md bg-green-500 text-white"
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >

    );
};

export default Profile;