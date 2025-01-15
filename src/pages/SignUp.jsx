import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import donateImg from '../assets/Blood_donation-removebg.png'
import logo from '../assets/icons8-blood-100.png'
import bg from '../assets/fabric_1.webp'
import { FaLongArrowAltLeft } from 'react-icons/fa';
import SignUpFooter from '../components/SignUpFooter/SignUpFooter';
const SignUp = () => {
    const handleRegister = () => {

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

            <div className="flex flex-col-reverse xl:flex-row justify-center items-center md:min-h-screen pb-10 xl:p-16 pt-10" >
                <div>
                    <img src={donateImg} alt="" className=' w-[90%] mx-auto' />
                </div>


                <div className="card mx-auto xl:w-[55%] w-[90%] shadow-2xl xl:max-w-[960px] ">
                    <div className="text-center">
                        <img src={logo} alt="logo" className="mx-auto my-3" />
                        <h1 className="text-xl md:text-3xl font-medium capitalize">Register to join as a donor</h1>

                    </div>
                    <form onSubmit={handleRegister} className="card-body px-10 xl:px:16">

                        {/* form-row-1 */}
                        <div className="flex flex-col md:gap-5 md:flex-row justify-center items-center">
                            {/* name */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Your Name"
                                    name="name"
                                    className="input input-bordered " required />
                            </div>
                            {/* email */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    name="email" placeholder="email" className="input input-bordered " required />
                            </div>

                        </div>
                        {/* form-row-2 */}
                        <div className="flex md:gap-5 flex-col md:flex-row justify-center items-center">
                            {/* Blood Group*/}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>

                                <select name="type" className="select select-bordered text-gray-400 text-base capitalize" required defaultValue=''>
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
                            </div>

                            {/* photo upload */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Upload Image</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered " required />
                            </div>
                        </div>

                        {/* form-row-3 */}
                        <div className="flex flex-col md:gap-5 md:flex-row justify-center items-center">
                            {/* District */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">District</span>
                                </label>
                                <select name="type" className="select select-bordered text-gray-400 text-base capitalize" required defaultValue=''>
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
                            </div>

                            {/* upazila */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Upazila</span>
                                </label>
                                <select name="type" className="select select-bordered text-gray-400 text-base capitalize" required defaultValue=''>
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
                            </div>


                        </div>


                        <div className='flex flex-col md:gap-5 md:flex-row justify-center items-center'>
                            {/* password */}
                            <div className="form-control relative w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    // type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    placeholder="password"
                                    className="input input-bordered" required />
                                <button
                                    type="button"
                                    // onClick={() => setShowPassword(!showPassword)}
                                    className='btn btn-xs absolute right-2 top-12'>
                                    {/* {
                                        showPassword ? <FaEyeSlash /> : <FaEye />
                                    } */}
                                </button>
                                {/* {
                                    errorMsg && <p className='text-red-600 text-xs mt-6'>{errorMsg}</p>
                                } */}
                            </div>


                            {/*confirm password */}
                            <div className="form-control relative w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    // type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    placeholder="password"
                                    className="input input-bordered" required />
                                <button
                                    type="button"
                                    // onClick={() => setShowPassword(!showPassword)}
                                    className='btn btn-xs absolute right-2 top-12'>
                                    {/* {
                                        showPassword ? <FaEyeSlash /> : <FaEye />
                                    } */}
                                </button>
                                {/* {
                                    errorMsg && <p className='text-red-600 text-xs mt-6'>{errorMsg}</p>
                                } */}
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