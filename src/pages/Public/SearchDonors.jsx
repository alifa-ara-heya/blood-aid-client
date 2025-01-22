import { useState } from "react";
import useDistrictsAndUpazilas from "../../hooks/useDistrictsAndUpazilas";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import Heading from "../../components/Shared/Heading";
import bg from '../../assets/search-bg.jpg'
import { FaSearch } from "react-icons/fa";


const SearchDonors = () => {
    const axiosPublic = useAxiosPublic();
    const {
        districtsData,
        upazilasData,
        isDistrictsLoading,
        isUpazilasLoading,
    } = useDistrictsAndUpazilas();

    const [bloodGroup, setBloodGroup] = useState("");
    const [district, setDistrict] = useState("");
    const [upazila, setUpazila] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        setIsSearching(true);

        try {
            const { data } = await axiosPublic.get('/search-donors', {
                params: { bloodGroup, district, upazila },
            });
            setSearchResults(data);
            // console.log(data);
            // console.log(searchResults);
        } catch (error) {
            console.error("Failed to fetch donors:", error);
        } finally {
            setIsSearching(false);
        }
    };

    if (isDistrictsLoading || isUpazilasLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="my-6 xl:my-10 w-11/12 mx-auto ">
            <div className="my-6">
                <Heading title={'Search Donors'} subtitle={' Find donors based on blood group, district, and upazila.'} />
            </div>

            <div className=" min-h-[450px] w-[70%] mx-auto relative " >

                {/* background image */}
                <div style={{ backgroundImage: `url(${bg})` }} className="absolute  inset-0 bg-cover bg-no-repeat bg-center rounded-lg">
                </div>

                <div className=" absolute inset-0 bg-black opacity-50"></div>

                {/* Search Form */}
                <div className="z-10 relative md:p-32 xl:p-40">
                    <form
                        className="flex flex-wrap md:flex-wrap flex-col md:flex-row items-center justify-center gap-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}
                    >
                        {/* Blood Group Selector */}
                        <div className="">
                            <label className="label">
                                <span className="label-text text-white font-semibold">Blood Group</span>
                            </label>
                            <select
                                className="select select-bordered text-gray-700 bg-white rounded-lg shadow-md"
                                value={bloodGroup}
                                onChange={(e) => setBloodGroup(e.target.value)}
                            >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        {/* District Selector */}
                        <div className="">
                            <label className="label">
                                <span className="label-text text-white font-semibold">District</span>
                            </label>
                            <select
                                className="select select-bordered text-gray-700 bg-white rounded-lg shadow-md"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            >
                                <option value="">Select District</option>
                                {districtsData.map((district) => (
                                    <option key={district.id} value={district.name}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Upazila Selector */}
                        <div className="">
                            <label className="label">
                                <span className="label-text text-white font-semibold">Upazila</span>
                            </label>
                            <select
                                className="select select-bordered text-gray-700 bg-white rounded-lg shadow-md"
                                value={upazila}
                                onChange={(e) => setUpazila(e.target.value)}
                                disabled={!district}
                            >
                                <option value="">Select Upazila</option>
                                {upazilasData
                                    .filter((u) => u.district_id === districtsData.find((d) => d.name === district)?.id)
                                    .map((upazila) => (
                                        <option key={upazila.id} value={upazila.name}>
                                            {upazila.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Search Button */}
                        <div className="">
                            <label className="label">
                                <span className="label-text text-white font-semibold">Search</span>
                            </label>
                            <button className="btn btn-primary w-28" type="submit">
                                <FaSearch />
                            </button>

                        </div>

                        {/*  Reset Buttons */}
                        {/*   <div>
                            <label className="label">
                                <span className="label-text text-white font-semibold">Reset</span>
                            </label>
                            <button
                                type="button"
                                className="btn btn-outline btn-secondary w-full"
                                onClick={() => {
                                    setBloodGroup('');
                                    setDistrict('');
                                    setUpazila('');
                                }}
                            >
                                <GrPowerReset />
                            </button>
                        </div> */}
                    </form>
                </div>

            </div>

            {/* Search Results */}
            {isSearching ? (
                <LoadingSpinner />
            ) : searchResults.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[70%] mx-auto">
                    {searchResults.map((donor, index) => (
                        <div
                            key={index}
                            className="card bg-gray-100 shadow p-4 rounded-lg"
                        >
                            <h2 className="text-lg font-bold text-primary">
                                {donor.name}
                            </h2>
                            <p className="text-gray-700">
                                <span className="font-semibold">Blood Group:</span>{' '}
                                {donor.bloodGroup}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">District:</span>{' '}
                                {donor.district}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Upazila:</span>{' '}
                                {donor.upazila}
                            </p>

                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-8 text-gray-600">No donors found for the selected criteria.</p>
            )}
        </div>
    );
};

export default SearchDonors;
