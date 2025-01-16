import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import donateImg from '../assets/Blood-donation-illus-color-removebg-preview.png'
import logo from '../assets/icons8-blood-100.png'
import bg from '../assets/fabric_1.webp'
import { FaEye, FaEyeSlash, FaLongArrowAltLeft } from 'react-icons/fa';
import SignUpFooter from '../components/SignUpFooter/SignUpFooter';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/UseAuth';
import { useState } from 'react';
import LoadingSpinner from '../components/Shared/LoadingSpinner/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';


const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    // Fetch districts
    const { data: districts = [], isLoading: isDistrictsLoading } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await fetch('/districts.json');
            if (!res.ok) {
                throw new Error('Failed to fetch districts');
            }
            return res.json()
        }
    })

    // Fetch upazilas
    const { data: upazilas = [], isLoading: isUpazilasLoading } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const res = await fetch('/upazilas.json');
            if (!res.ok) {
                throw new Error('Failed to fetch upazilas');
            }
            return res.json();
        }
    });

    if (isDistrictsLoading || isUpazilasLoading) return <LoadingSpinner />

    const districtsData = districts[2]?.data || []
    // console.log(districtsData.length);

    const upazilasData = upazilas[2]?.data || []
    // console.log(upazilasData.length);

    const selectedDistrictId = watch('district');
    // console.log(selectedDistrict);

    const filteredUpazilas = upazilasData.filter(upazila => upazila.district_id === selectedDistrictId)


    const onSubmit = async (data) => {
        console.log(data);

        try {
            //1. prepare formData for imageBB
            const formData = new FormData();
            formData.append('image', data.photo[0])

            //2. upload imageData to imageBb
            const imageResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
            const imageURL = imageResponse.data.data.url;
            // console.log(imageResponse.data.data.url);

            //3. user registration
            const result = await createUser(data.email, data.password)
            const user = result.user;
            console.log('Sign Up User', user);

            //4. save userName and profile photo
            await updateUserProfile(data.name, imageURL)

            //storing the district and upazila name with it's id
            const selectedDistrict = districtsData.find(district => district.id === data.district)
            const selectedDistrictName = selectedDistrict.name
            // console.log(selectedDistrictName);

            const selectedUpazila = upazilasData.find(upazila => upazila.id === data.upazila)
            const selectedUpazilaName = selectedUpazila.name
            // console.log(selectedUpazilaName);

            //what data will be sent to the database
            const userInfo = {
                name: data.name,
                email: data.email,
                image: imageURL,
                bloodGroup: data.bloodGroup,
                district: selectedDistrictName,
                upazila: selectedUpazilaName
            }

            // 5. save user info to the database
            const response = await axiosPublic.post('/users', userInfo)
            console.log(response);
            // show success message
            await Swal.fire({
                title: "Success",
                text: "Successfully Registered",
                icon: "success"
            });


        } catch (error) {
            console.log(error);
            await Swal.fire({
                title: "Error",
                text: error.message || "Failed to register. Please try again.",
                icon: "error",
            });
        }
    }



    return (
        <div style={{ backgroundImage: `url(${bg})` }}>
            <Helmet>
                <title>Register</title>
                <meta name="register" content="Register"></meta>
            </Helmet>

            <Link to='/' className=" border-b pb-4 flex justify-start items-center gap-2 btn active:outline-none focus:outline-none focus:border-none">
                <FaLongArrowAltLeft />

                <img src={logo} alt="" className="w-10" />
                <h2 className='md:text-2xl text-xl font-bold text-rose-700'>Blood Aid</h2>
            </Link>

            <div className="flex flex-col-reverse xl:flex-row justify-center items-center md:min-h-screen pb-10 xl:p-16 pt-10 xl:pb-20 container mx-auto" >
                <div>
                    <img src={donateImg} alt="" className=' w-[90%] mx-auto' />
                </div>


                <div className="card mx-auto xl:w-[55%] w-[90%] shadow-2xl xl:max-w-[960px] ">
                    <div className="text-center">
                        <img src={logo} alt="logo" className="mx-auto my-3" />
                        <h1 className="text-xl md:text-3xl font-medium capitalize">Register to join as a donor</h1>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body px-10 xl:px:16">

                        {/* form-row-1 */}
                        <div className="flex flex-col md:gap-5 md:flex-row justify-center items-center">
                            {/* name */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Your Name"
                                    className="input input-bordered"
                                    {...register('name', { required: true })} />

                                {errors.name && <span className='text-red-500 text-sm'>Name is Required</span>}
                            </div>

                            {/* email */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    placeholder="email" className="input input-bordered"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && <span className='text-red-500 text-sm'>Email is required.</span>}
                            </div>
                        </div>


                        {/* form-row-2 */}
                        <div className="flex md:gap-5 flex-col md:flex-row justify-center items-center">
                            {/* Blood Group*/}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>

                                <select name="type" className="select select-bordered text-gray-400 text-base capitalize"
                                    defaultValue={''}
                                    {...register('bloodGroup', { required: true })}>
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

                            {/* photo upload */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Upload Image</span>
                                </label>
                                <input type="file" className="file-input  file-input-primary border-gray-300 pe-0 "
                                    {...register('photo', { required: true })}
                                />
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
                                    defaultValue=''>
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
                                <select name="type" className="select select-bordered text-gray-400 text-base capitalize" required defaultValue=''
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

                        {/* form row-4 */}
                        <div className='flex flex-col md:gap-5 md:flex-row justify-center items-center'>
                            {/* password */}
                            <div className="form-control relative w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="password"
                                    className="input input-bordered"
                                    {...register('password', {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                                            message: "Password must include 8-20 characters, with uppercase, lowercase, number, and special character."
                                        }
                                    })} />
                                {errors.password?.type === 'required' && (
                                    <span className="text-red-400 text-sm">{errors.password.message}</span>
                                )}
                                {errors.password?.type === 'pattern' && (
                                    <span className="text-red-400 text-sm">{errors.password.message}</span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='btn btn-xs absolute right-2 top-12'>
                                    {
                                        showPassword ? <FaEyeSlash /> : <FaEye />
                                    }
                                </button>
                            </div>


                            {/*confirm password */}
                            <div className="form-control relative w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'} placeholder="password"
                                    className="input input-bordered"
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password.',
                                        validate: (value) => {
                                            return value === watch('password') || 'Passwords do not match'
                                        }
                                    })} />
                                {errors.confirmPassword?.type === 'required' && (
                                    <span className="text-red-400 text-sm">
                                        {errors.confirmPassword.message}
                                    </span>
                                )}
                                {errors.confirmPassword?.type === "validate" && (
                                    <span className="text-red-400 text-sm">
                                        {errors.confirmPassword.message}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='btn btn-xs absolute right-2 top-12'>
                                    {
                                        showConfirmPassword ? <FaEyeSlash /> : <FaEye />
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-gradient-to-r from-rose-700 to-rose-500 border-none text-white mb-4">Register</button>
                        </div>

                        <p>Already have an account? Please <Link className="btn-link text-blue-900" to='/login'>SignIn.</Link></p>


                    </form>

                </div>
            </div>
            <SignUpFooter />
        </div>
    );
};

export default SignUp;