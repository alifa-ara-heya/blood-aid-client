import { FaArrowRight } from "react-icons/fa";
import Heading from "../../../components/Shared/Heading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContentManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [filterStatus, setFilterStatus] = useState("");

    // Fetch blogs based on the filter
    const { data: blogs = [], refetch } = useQuery({
        queryKey: ["adminBlogs", filterStatus],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/blogs?status=${filterStatus}`);
            return data;
        },
    });

    // Publish/UnPublish a blog
    const handleBlogStatus = async (id, status) => {
        try {
            const result = await axiosSecure.patch(`/blogs/${id}/status`, { status });
            if (result.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: `Blog ${status === "published" ? "published" : "unpublished"} successfully.`,
                    icon: "success",
                });
                refetch(); // Refetch the blogs after status change
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update blog status. Please try again.",
                icon: "error",
            });
        }
    };

    // Delete a blog
    const handleDeleteBlog = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "This action cannot be undone!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                const response = await axiosSecure.delete(`/blogs/${id}`);
                if (response.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Blog deleted successfully.",
                        icon: "success",
                    });
                    refetch(); // Refetch the blogs after deletion
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete the blog. Please try again.",
                icon: "error",
            });
        }
    }



    return (
        <div className="w-11/12 mx-auto">
            <Heading title="Content Management Page" subtitle={'Welcome to the Content Management Page! Here, you can effortlessly oversee, organize, and update your content library. Ensure your platform stays relevant, engaging, and up-to-date with just a few clicks.'} />

            <div className="flex justify-between my-6">
                <Link to='/dashboard/add-blog'>
                    <button className="btn btn-primary text-white">Add Blog <FaArrowRight /></button>
                </Link>

                {/* Filter Dropdown */}
                <select
                    className="select select-bordered mb-4"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>



            {/* Blog List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
                {blogs.map((blog) => (
                    <div key={blog._id} className="card bg-gray-100 shadow-md p-4 card-body">
                        <h2 className="text-lg font-bold">{blog.title}</h2>
                        <p>Status: <span className={`${blog.status === 'published' ? 'text-green-600' : 'text-blue-600'}`}>{blog.status}</span></p>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                        <div className="mt-4 flex gap-2">
                            {blog.status === "draft" ? (
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleBlogStatus(blog._id, "published")}
                                >
                                    Publish
                                </button>
                            ) : (
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleBlogStatus(blog._id, "draft")}
                                >
                                    Unpublish
                                </button>
                            )}
                            <button
                                className="btn btn-error btn-sm"
                                onClick={() => handleDeleteBlog(blog._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default ContentManagement;