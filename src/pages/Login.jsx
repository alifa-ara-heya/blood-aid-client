import { Helmet } from 'react-helmet-async';
import bg from '../assets/fabric_1.webp'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLongArrowAltLeft } from 'react-icons/fa';
import logo from '../assets/icons8-blood-100.png';
import donateImg from '../assets/Blood-donation-illus-color-removebg-preview.png'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ShortFooter from '../components/ShortFooter/ShortFooter';
import useAuth from '../hooks/UseAuth';
import Swal from 'sweetalert2';



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // console.log(data);

        try {
            const result = await signIn(data.email, data.password);
            // const user = result.user;
            // console.log('sign-in user', user);
            await Swal.fire({
                title: "Success",
                text: "Successfully Logged In",
                icon: "success"
            });
            navigate('/')
            reset();

        } catch (err) {
            console.error('Login Failed:', err);

            // Show error message
            await Swal.fire({
                title: "Error",
                text: err.message || "Failed to log in. Please try again.",
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

            <div className="flex flex-col-reverse md:flex-row justify-center items-center md:min-h-screen  xl:p-16 pt-10 xl:pb-10 container mx-auto" >

                {/* image */}
                <div>
                    <img src={donateImg} alt="" className=' w-full mx-auto' />
                </div>

                {/* form */}
                <div className="card mx-auto shadow-2xl md:w-[50%] lg:max-w-[450px] bg-white">
                    <div className="text-center">
                        <img src={logo} alt="logo" className="mx-auto my-3" />
                        <h1 className="text-xl md:text-3xl font-medium capitalize">Welcome, Login!</h1>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body px-10 xl:px:16">
                        {/* form-row-1 */}
                        <div className="flex flex-col md:gap-5 justify-center items-center">

                            {/* email */}
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    placeholder="email" className="input input-bordered"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && <span className='text-red-500 text-sm'>Email is required.</span>}
                            </div>


                            {/* password */}
                            <div className="form-control relative w-full">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="password"
                                    className="input input-bordered"
                                    {...register('password', {
                                        required: "Password is required",

                                    })} />
                                {errors.password?.type === 'required' && (
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
                            <div className="form-control mt-6 w-full">
                                <button className="btn bg-gradient-to-r from-rose-700 to-rose-500 border-none text-white mb-4 ">Login</button>
                            </div>
                        </div>


                        <p>New Here? Please <Link className="btn-link text-blue-900" to='/signUp'>Register.</Link></p>
                    </form>

                </div>


            </div>
            <ShortFooter />
        </div>


    );
};

export default Login;