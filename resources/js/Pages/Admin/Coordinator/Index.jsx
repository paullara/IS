import AdminLayout from "@/Layouts/AdminLayout";
import { Link, usePage } from "@inertiajs/react";

export default function Index() {
    const { coordinators } = usePage().props;

    return (
        <AdminLayout title="Coordinators">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Coordinators</h1>
                <Link
                    href={route("coordinators.create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Coordinator
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coordinators.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4">
                                    No coordinators found.
                                </td>
                            </tr>
                        ) : (
                            coordinators.map((coordinator) => (
                                <tr key={coordinator.id}>
                                    <td className="px-4 py-2 border">
                                        {coordinator.name}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {coordinator.email}
                                    </td>
                                    <td className="px-4 py-2 border space-x-2">
                                        <Link
                                            href={route(
                                                "coordinators.show",
                                                coordinator.id
                                            )}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route(
                                                "coordinators.edit",
                                                coordinator.id
                                            )}
                                            className="text-yellow-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "coordinators.destroy",
                                                coordinator.id
                                            )}
                                            className="text-red-600 hover:underline"
                                            onClick={(e) => {
                                                if (!confirm("Are you sure?"))
                                                    e.preventDefault();
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
