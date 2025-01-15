import { Link } from "react-router-dom";
import logo from '../../assets/icons8-blood-100.png'
import { FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidDonateBlood } from "react-icons/bi";

const Footer = () => {
    return (
        <footer className="bg-rose-700 text-white py-8 md:py-10 lg:py-14">
            <div className="w-3/4  mx-auto">
                <div className="flex flex-col md:flex-row gap-8 items-stretch">
                    {/* Logo Section */}
                    <div className="space-y-2 md:w-1/3 w-full">
                        <img src={logo} alt="Blood Aid Logo" className="w-20" />
                        <h2 className="text-xl font-semibold inline text-[#FCE0A2]">Blood Aid</h2>
                        <p className=" text-gray-200 w-full text-sm font-medium md:w-3/4">
                            Saving lives together by connecting donors and recipients. <br />Join us in making a difference in people&apos;s lives.
                        </p>
                        <div className="py-4">
                            <button className="btn bg-[#FCE0A2] font-bold hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-400 text-rose-700">
                                <BiSolidDonateBlood className="text-2xl" />
                                Donate Now</button>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div className="md:w-1/3 w-full flex-1">
                        <h3 className="text-lg md:text-xl font-bold mb-4 text-[#FCE0A2]">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-gray-300 text-sm">Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-gray-300 text-sm">About Us</Link>
                            </li>
                            <li>
                                <Link to="/donation-requests" className="hover:text-gray-300 text-sm">Donation Requests</Link>
                            </li>
                            <li>
                                <Link to="/blog" className="hover:text-gray-300 text-sm">Blog</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-gray-300 text-sm">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    {/* Contact Information */}
                    <div className="space-y-3  md:w-1/3 w-full flex-1">
                        <h3 className="text-lg md:text-xl font-bold mb-4 text-[#FCE0A2]">Get in Touch</h3>
                        <p className="text-sm flex gap-2">
                            <FaLocationDot className="text-lg md:txt-xl text-[#FCE0A2]" /> 123 Main Street, Your City, Your Country
                        </p>
                        <p className="text-sm flex gap-2"><FaPhone className="text-lg md:txt-xl text-[#FCE0A2]" /> +123 456 7890</p>
                        <p className="text-sm flex gap-2"><FaEnvelope className="text-lg md:txt-xl text-[#FCE0A2]" /> support@bloodaid.com</p>
                        <span className="divider before:bg-rose-400 after:bg-rose-400"></span>

                        {/* social icons */}
                        <div className="flex items-center space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 rounded-md p-1">
                                <FaFacebook className="text-2xl text-[#FCE0A2]" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                                <FaTwitter className="text-2xl text-[#FCE0A2]" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                                <FaInstagram className="text-2xl text-[#FCE0A2]" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="pt-4 text-center">
                    <span className="divider before:bg-rose-500 after:bg-rose-500"></span>
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} - Blood Aid. All rights reserved. Built with 💛 by Alifa Ara Heya
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;