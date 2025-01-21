import { useQuery } from "@tanstack/react-query";
import Heading from "../../components/Shared/Heading";
import useAxiosPublic from './../../hooks/useAxiosPublic';
import { Link } from "react-router-dom";
import bg from '../../assets/fabric_1.webp'

const Blogs = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch published blogs
    const { data: blogs = [] } = useQuery({
        queryKey: ["publicBlogs"],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/blogs/public`);
            return data;
        },
    });

    return (
        <div >
            <div className="mt-6">
                <Heading title={'Blogs'} subtitle={'Welcome. Read and Be Inspired.'} />
            </div>

            {/* content */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10 md:my-20 container mx-auto" >
                {blogs.map((blog) => (
                    <div key={blog._id} className="card  shadow-md p-4 card-body" style={{ backgroundImage: `url(${bg})` }}>
                        <img src={blog.image} alt="" className="h-56 object-cover" />
                        <h2 className="text-lg font-bold">{blog.title}</h2>
                        <p>{blog.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 100)}...</p>
                        <div className="mt-4">
                            <Link to={`/blog/${blog._id}`} className="btn btn-primary btn-sm">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;