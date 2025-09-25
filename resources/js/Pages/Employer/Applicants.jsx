import EmployerLayout from "@/Layouts/EmployerLayout";
import React from "react";
import { usePage, router } from "@inertiajs/react";

export default function Applicants() {
    const { applications } = usePage().props;

    const handleStatusChange = (appId, newStatus) => {
        router.put(`/employer/applications/${appId}/status`, {
            status: newStatus,
        });
    };

    return (
        <EmployerLayout>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Internship Applicants
                </h1>

                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="p-4">Student Name</th>
                                <th className="p-4">Internship</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                                <th className="p-4">View Profile</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applications.map((app) => (
                                <tr
                                    key={app.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="p-4">
                                        {app.student?.firstname ?? "N/A"}
                                    </td>
                                    <td className="p-4">
                                        {app.internship?.title ?? "N/A"}
                                    </td>
                                    <td className="p-4 capitalize font-medium">
                                        {app.status}
                                    </td>
                                    <td className="p-4">
                                        {app.status === "pending" && (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            app.id,
                                                            "accepted"
                                                        )
                                                    }
                                                    className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            app.id,
                                                            "rejected"
                                                        )
                                                    }
                                                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <a
                                            href={`/employer/applicants/${app.student_id}`}
                                            className="text-blue-600 hover:underline font-medium text-xs"
                                        >
                                            View
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </EmployerLayout>
    );
}
