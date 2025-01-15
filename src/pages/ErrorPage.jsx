import { Helmet } from "react-helmet-async";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import errorImg from '../assets/error.png'

const ErrorPage = () => {
    return (
        <div className="bg-yellow-50 flex items-center justify-center h-screen">
            <Helmet>
                <title>Error</title>
                <meta name="error-page"></meta>
            </Helmet>
            <div className="text-center p-6 rounded-lg shadow-">
                {/* <h1 className="text-7xl font-bold text-rose-500 mb-4">404</h1> */}
                <img src={errorImg} alt="" className="w-2/3 md:w-[30%] mx-auto" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6 font-medium">Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                <Link
                    to="/"
                    className="btn text-white bg-rose-500 hover:bg-rose-400 rounded-md   items-center gap-3">
                    Go Back Home <BsArrowRight />
                </Link>
            </div>
        </div >
    );
};

export default ErrorPage;