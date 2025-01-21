import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Heading from "../../components/Shared/Heading";

const BlogDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();

    // Fetch single blog details
    const { data: blog = {}, isLoading } = useQuery({
        queryKey: ["blogDetails", id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/blogs/${id}`);
            return data;
        },
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-6 max-w-[900px]">
            <Heading title={`${blog.title}`} />
            <img src={blog.image} alt={blog.title} className="w-full h-[200px] md:h-[400px] object-cover my-8 rounded-md" />
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
    );
};

export default BlogDetails;
