import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/Shared/Heading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowLeft, FaArrowRight, FaCrown } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [filterStatus, setFilterStatus] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(6);

    //getting all users with pagination
    const { data = {}, refetch } = useQuery({
        queryKey: ['users', filterStatus, page],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allUsers?filterStatus=${filterStatus}&page=${page}&limit=${limit}`);
            return data;
        }
    })
    // console.log(users.length);
    const { users = [], totalPages } = data;

    const handlePrevious = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handleUserStatus = async (id, status) => {
        const updatedUserStatus = {
            status: status
        }

        try {
            const { data: updatedStatus } = await axiosSecure.patch(`update-user-status/${id}`, updatedUserStatus);
            if (updatedStatus.modifiedCount > 0) {
                Swal.fire({
                    title: "Success",
                    text: `User has been ${status === 'blocked' ? 'blocked' : 'unblocked'} successfully.`,
                    icon: "success"
                });
                refetch()
            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: `Could not ${status === 'blocked' ? 'block' : 'unblock'} the user. Please try again later.`,
                icon: "error",
            });

        }
    }

    //make volunteer and admin
    const handleUserRole = async (id, role) => {
        const updatedUserRole = {
            role: role
        }

        try {
            const { data: updatedRole } = await axiosSecure.patch(`update-user-role/${id}`, updatedUserRole);
            if (updatedRole.modifiedCount > 0) {
                Swal.fire({
                    title: "Success",
                    text: `User has become ${role === 'admin' ? 'admin' : 'volunteer'} successfully.`,
                    icon: "success"
                });
                refetch()
            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: `Could not make the user ${role === 'admin' ? 'admin' : 'volunteer'}. Please try again later.`,
                icon: "error",
            });
        }
    }

    return (
        <div>
            <Heading title={'All Users'} subtitle={'Discover and manage the complete list of users in the system, including donors, admins, and volunteers, all in one place.'} />

            <select
                className="select select-bordered bg-gray-100 md:w-1/4 w-1/3  m-6"
                name="type"
                id='type'
                onChange={e => setFilterStatus(e.target.value)}
                value={filterStatus}>
                <option value=''>Filter By Type</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
            </select>

            <div className="overflow-x-auto">
                <table className="table my-8 ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Block User</th>
                            <th>Unblock User</th>
                            <th>Make Volunteer</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>

                                <tr key={user._id} className="overflow-x-auto">

                                    {/*  {/* global index to make sure  the index will continue to count documents across pages correctly*/}
                                    <td>{(page - 1) * limit + index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                                <div className="text-sm opacity-50">{user.upazila}, {user.district}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-medium text-gray-500">{user.email}</td>
                                    <td>
                                        {user.role === 'admin' ? <span className="inline-flex items-center gap-1"><FaCrown color="#EAB308" />{user.role}</span> : user.role}
                                    </td>
                                    <td><span className={`badge badge-md ${user.status === 'active' ? 'bg-blue-200 text-blue-700' : 'bg-red-200 text-red-700'}`}>{user.status}</span></td>
                                    <td>
                                        <button
                                            onClick={() => handleUserStatus(user._id, 'blocked')}
                                            className="btn btn-sm bg-rose-700 text-white">Block</button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleUserStatus(user._id, 'active')}
                                            className="btn btn-sm bg-green-500 text-white">Unblock</button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleUserRole(user._id, 'volunteer')}
                                            className="btn btn-sm bg-blue-500 text-white">Make Volunteer</button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleUserRole(user._id, 'admin')}
                                            className="btn btn-sm bg-orange-700 text-white">Make Admin</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>


            {/* pagination */}

            {/* Pagination Controls */}
            <div className="join flex justify-center items-center gap-2 my-8">
                <button
                    className="join-item btn"
                    onClick={handlePrevious}
                    disabled={page === 1}
                >
                    <FaArrowLeft />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`join-item btn ${page === i + 1 ? "btn-active" : ""}`}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="join-item btn"
                    onClick={handleNext}
                    disabled={page === totalPages}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div >
    );
};

export default AllUsers;