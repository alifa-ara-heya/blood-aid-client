import { FaSearch } from 'react-icons/fa';
import bannerBg from '../../assets/Blood donation-bro.png'
import { Link } from 'react-router-dom';
const Banner = () => {
    return (
        <div className="w-11/12 max-w-[1440px] mx-auto h-[300px] flex  flex-col md:flex-row items-center justify-around"
            style={{
                // backgroundImage: `url(${bannerBg})`
            }}>




            {/* Banner Content */}
            <div className="py-8 xl:py-20 flex flex-col items-start h-full px-10 xl:p-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to Blood Aid
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mb-6">
                    Your donation can save lives. Join us in making a difference by connecting donors and recipients seamlessly.
                </p>
                <div className='flex gap-3 items-center'>
                    <Link to='/signUp'>
                        <button className="btn text-white bg-primary px-6 py-3 font-semibold rounded-md shadow-md hover:bg-rose-500">
                            Join as a Donor
                        </button>
                    </Link>
                    <Link to='/search-donors'>
                        <button className="btn text-white bg-primary px-6 py-3 font-semibold rounded-md shadow-md hover:bg-rose-500">
                            Search Donors <FaSearch />
                        </button>
                    </Link>
                </div>
            </div>

            <div className='w-1/2 xl:w-1/4'>
                <img src={bannerBg} alt="" />
            </div>
        </div>
    );
};

export default Banner;
