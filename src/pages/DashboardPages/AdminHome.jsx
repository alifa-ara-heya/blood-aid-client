import useAuth from "../../hooks/UseAuth";

const AdminHome = () => {
    const { user } = useAuth();
    const name = user?.displayName;
    const email = user?.email;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-primary">Welcome, {name}</h1>
            <p className="text-gray-600 mt-4 text-lg">Manage users, donations, and funding from your dashboard.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-blue-600">Total Users</h2>
                    <p className="text-3xl font-bold">45</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-green-600">Total Funding</h2>
                    <p className="text-3xl font-bold">$12,500</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-red-600">Total Blood Requests</h2>
                    <p className="text-3xl font-bold">32</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;