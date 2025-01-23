
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

import PropTypes from 'prop-types';

const DonateModal = ({ donationData }) => {

    // console.log(donationData.donationStatus);
    const { user } = useAuth();
    const name = user?.displayName;
    const email = user?.email;
    const axiosSecure = useAxiosSecure();


    const handleConfirmBtn = async (e) => {
        e.preventDefault();

        const updatedDonationStatus = {
            donorName: name,
            donorEmail: email,
            donationStatus: "inprogress"
        }

        try {
            const { data: updatedStatus } = await axiosSecure.patch(`update-donation-status/${donationData._id}`, updatedDonationStatus);
            if (updatedStatus.modifiedCount > 0) {
                document.getElementById('my_modal_5').close();
                await Swal.fire({
                    title: "Success",
                    text: "Updated Successfully",
                    icon: "success"
                });
            }

        } catch (error) {
            // console.log(error);
            Swal.fire({
                title: "Error",
                text: "Could not update the donation request. Please try again later.",
                icon: "error",
            });

        }
    }

    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {/* form-row-1 */}
                <form className="w-4/5 mx-auto" onSubmit={handleConfirmBtn}>
                    {/*  name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered bg-gray-100 text-gray-400"
                            readOnly
                            defaultValue={name}

                        />
                    </div>

                    {/*  email */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            placeholder="email" className="input input-bordered bg-gray-100 text-gray-400"
                            readOnly
                            defaultValue={email}

                        />
                    </div>

                    <button className="btn btn-secondary text-primary mt-6 " type="submit">Confirm</button>
                </form>

                <div className="modal-action flex items-center justify-center">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-primary">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

DonateModal.propTypes = {
    donationData: PropTypes.object.isRequired,
};

export default DonateModal;