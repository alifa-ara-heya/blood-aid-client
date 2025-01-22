import { useForm } from "react-hook-form";
import Heading from "../../../components/Shared/Heading";
import { imageUpload } from "../../../api/imageuploadUtils";

import JoditEditor from 'jodit-react';
import { useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { GiLoveHowl } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const AddBlog = ({ placeholder }) => {
    const navigate = useNavigate();
    const editor = useRef(null);
    const [content, setContent] = useState('');
    // console.log(content);

    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || 'Start typings...'
    }),
        [placeholder]
    );

    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Upload image to imgbb and get URL
            const photoURL = await imageUpload(data.image[0]);
            // Prepare the blog data
            const blogData = {
                title: data.title,
                image: photoURL,
                content, // Content from the Jodit editor
                status: 'draft',
            };
            // console.log(blogData);

            // Save the blog to the database
            const response = await axiosSecure.post('/blogs', blogData);

            if (response.data.insertedId) {
                Swal.fire({
                    title: "Success",
                    text: "Blog created successfully!",
                    icon: "success",
                });
                reset(); // Reset the form
                setContent(''); // Clear the Jodit editor
                navigate('/dashboard/content-management')
            }


        } catch (error) {
            console.error('Failed to create blog:', error);
            Swal.fire({
                title: "Error",
                text: "Failed to create the blog. Please try again.",
                icon: "error",
            });
        }
    }

    return (
        <div className="w-11/12 mx-auto">
            <Heading title={'Add Blog'} subtitle={'Welcome to the Add Blog Page! Here, you can effortlessly oversee, organize, and update your blogs. Ensure your platform stays relevant, engaging, and up-to-date with just a few clicks.'} />

            <form onSubmit={handleSubmit(onSubmit)} className="md:card-body ">
                {/* title */}
                <div className="form-control w-full md:w-1/2">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        {...register('title', { required: 'Title is required' })}
                        placeholder="Title"
                        className={`input input-bordered text-gray-500`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* photo upload */}
                <div className="form-control w-full md:w-1/2">
                    <label className="label">
                        <span className="label-text">Upload Image</span>
                    </label>
                    <input type="file" className="file-input  file-input-primary border-gray-300 pe-0 "
                        {...register('image', { required: 'Image is required' })}
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                </div>

                <div className="my-6">
                    <JoditEditor

                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { }}
                    />
                </div>

                <div className="my-6">
                    <button type='submit' className="btn btn-primary">Create Blog <GiLoveHowl /></button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;