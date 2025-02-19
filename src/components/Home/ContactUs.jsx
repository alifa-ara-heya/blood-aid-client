import Lottie from 'lottie-react';
import contactLottie from '../../assets/contact-red.json'
import { BsTelegram } from 'react-icons/bs';
import contactBg from '../../assets/contact-bg.jpg'

const ContactUs = () => {
    return (

        <div className="relative py-16 px-8 text-white bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${contactBg})` }} data-aos='fade-up'>
            {/* // bg-gradient-to-r from-[#fc0a42] to-[#f7f077e3] */}

            <div className='absolute h-full inset-0 bg-black opacity-50'></div>
            <div className="max-w-5xl mx-auto text-center z-10 relative">
                <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
                <p className="mb-8 text-lg w-full md:w-3/4 mx-auto">
                    We&apos;d love to hear from you! Whether you have questions, feedback, or want to work with us, get in touch.
                </p>
            </div>

            <div className="max-w-4xl mx-auto backdrop-blur-md rounded-lg shadow-lg p-8 text-gray-800 flex flex-col md:flex-row  gap-8 z-10 relative">
                <form className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="form-control w-full">
                        <label className="label ">
                            <span className="label-text text-white font-semibold">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full bg-gray-400 placeholder:text-black "
                        />
                    </div>
                    {/* Email Field */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white font-semibold">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full  bg-gray-400 placeholder:text-black "
                        />
                    </div>
                    {/* Subject Field */}
                    <div className="form-control w-full col-span-1 md:col-span-2">
                        <label className="label">
                            <span className="label-text text-white font-semibold">Subject</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Subject"
                            className="input input-bordered w-full bg-gray-400 placeholder:text-black "
                        />
                    </div>
                    {/* Message Field */}
                    <div className="form-control w-full col-span-1 md:col-span-2">
                        <label className="label">
                            <span className="label-text text-white font-semibold">Message</span>
                        </label>
                        <textarea
                            placeholder="Write your message here..."
                            className="textarea textarea-bordered w-full bg-gray-400 placeholder:text-black  h-32"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 text-center">
                        <button className="btn btn-primary bg-gradient-to-r from-[#C71A42] to-[#BE123C] text-white rounded-lg md:text-lg font-semibold hover:opacity-90">
                            Send Message <BsTelegram />
                        </button>
                    </div>
                </form>



                <div className='w-1/3 mx-auto'>
                    <Lottie animationData={contactLottie} loop={true} />

                </div>
            </div>
        </div>

    );
};

export default ContactUs;