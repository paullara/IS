import AdminLayout from "@/Layouts/AdminLayout";
import { Link, usePage } from "@inertiajs/react";

export default function Show() {
    const { coordinator } = usePage().props;
    return (
        <AdminLayout title="Coordinator Details">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Coordinator Details</h1>
                <div className="mb-4">
                    <strong>Name:</strong> {coordinator.name}
                </div>
                <div className="mb-4">
                    <strong>Email:</strong> {coordinator.email}
                </div>
                {coordinator.picture && (
                    <div className="mb-4">
                        <strong>Profile Picture:</strong>
                        <br />
                        <img
                            src={"/images/" + coordinator.picture}
                            alt="Profile"
                            className="w-32 h-32 object-cover rounded-full mt-2"
                        />
                    </div>
                )}
                <div className="flex justify-end">
                    <Link
                        href={route("coordinators.index")}
                        className="text-gray-600 hover:underline"
                    >
                        Back to List
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
