import axios from "axios";

export const imageUpload = async (imageData) => {
    try {
        const formData = new FormData();
        formData.append("image", imageData);

        // Destructure the `data` property directly from the axios response
        const { data } = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
            formData
        );

        console.log("Response Data:", data); // Log the full response for debugging

        const imageURL = data?.data.display_url; // Access the image URL
        console.log("Image URL:", imageURL);

        return imageURL; // Return the image URL
    } catch (error) {
        console.error("Image upload failed:", error);
        return null; // Return null in case of failure
    }
};
