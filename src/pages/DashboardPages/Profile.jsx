import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/UseAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const Profile = () => {
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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: userData?.name || '',
            email: userData?.email || '',
            bloodGroup: userData?.bloodGroup || '',
            district: userData?.district || '',
            upazila: userData?.upazila || '',
        },
    });

    useEffect(() => {
        if (!isEditable) {
            reset(userData);
        }
    }, [isEditable, userData, reset]);

    const toggleEditMode = () => {
        setIsEditable((prevState) => !prevState);
    };

    const onSubmit = (data) => {
        // Perform API call to save the updated data
        console.log(data);

        // toggleEditMode(); // Exit edit mode after saving
    };

    if (isLoading || isLoadingUserData) return <LoadingSpinner />;

    return (
        <div>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <h2>Welcome from profile page: {userData.name} </h2>
            <h2>Role: {role}</h2>
            <div className="p-4 border rounded-md">
                <h2 className="text-lg font-bold mb-4">User Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            readOnly={!isEditable}
                            className={`w-full p-2 border ${isEditable ? 'border-gray-400' : 'border-gray-200 bg-gray-100'}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block mb-2">Email:</label>
                        <input
                            type="email"
                            {...register('email')}
                            readOnly={true} // Email is always read-only
                            className="w-full p-2 border border-gray-200 bg-gray-100"
                        />
                    </div>

                    {/* Blood Group Field */}
                    <div>
                        <label className="block mb-2">Blood Group:</label>
                        <input
                            type="text"
                            {...register('bloodGroup', { required: 'Blood group is required' })}
                            readOnly={!isEditable}
                            className={`w-full p-2 border ${isEditable ? 'border-gray-400' : 'border-gray-200 bg-gray-100'}`}
                        />
                        {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>}
                    </div>

                    {/* District Field */}
                    <div>
                        <label className="block mb-2">District:</label>
                        <input
                            type="text"
                            {...register('district', { required: 'District is required' })}
                            readOnly={!isEditable}
                            className={`w-full p-2 border ${isEditable ? 'border-gray-400' : 'border-gray-200 bg-gray-100'}`}
                        />
                        {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
                    </div>

                    {/* Upazila Field */}
                    <div>
                        <label className="block mb-2">Upazila:</label>
                        <input
                            type="text"
                            {...register('upazila', { required: 'Upazila is required' })}
                            readOnly={!isEditable}
                            className={`w-full p-2 border ${isEditable ? 'border-gray-400' : 'border-gray-200 bg-gray-100'}`}
                        />
                        {errors.upazila && <p className="text-red-500 text-sm">{errors.upazila.message}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        {/* {isEditable ? (
                            <button
                                type="button"
                                onClick={toggleEditMode}
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={toggleEditMode}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Edit
                            </button>
                        )} */}
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
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
