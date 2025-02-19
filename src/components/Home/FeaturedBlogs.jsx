import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Heading from "../Shared/Heading";
import { Link } from "react-router-dom";
import bg from '../../assets/fabric_1.webp'


const FeaturedBlogs = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch published blogs
    const { data: blogs = [] } = useQuery({
        queryKey: ["publicBlogs"],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/blogs/public`);
            return data.slice(0, 3);
        },
    });

    return (
        <div className="w-11/12 mx-auto">
            <div className="mt-6">
                <Heading title={'Featured Blogs'} subtitle={'Welcome. Read and Be Inspired.'} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10 container mx-auto">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="card shadow-md p-4 card-body bg-gray-200  dark:bg-none dark:bg-gray-800 transition-all duration-500"
                            // style={{ backgroundImage: `url(${bg})` }}
                            data-aos='fade-up'
                        >
                            <img src={blog.image} alt="" className="h-56 object-cover rounded-lg" />
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-200">{blog.title}</h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                {blog.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 150)}...
                            </p>
                            <div className="mt-4">
                                <Link to={`/blog/${blog._id}`} className="btn btn-primary btn-sm">
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link to='/blogs'>
                        <button className="btn bg-red-700 text-white">Read All Blogs</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedBlogs;
