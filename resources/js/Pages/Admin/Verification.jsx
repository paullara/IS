import React from "react";
import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Verification({ verifications }) {
    console.log(verifications); // Debugging: Check the structure of verifications

    return (
        <AdminLayout>
            <Head title="Verifications" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Submitted Verifications
                </h1>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr className="text-left text-gray-600 font-semibold">
                                <th className="px-4 py-2">Student Name</th>
                                <th className="px-4 py-2">School ID Image</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {verifications.length > 0 ? (
                                verifications.map((verification) => (
                                    <tr
                                        key={verification.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2">
                                            {/* Accessing the user's student profile */}
                                            {verification.user
                                                ?.studentProfile ? (
                                                <>
                                                    {
                                                        verification.user
                                                            .studentProfile
                                                            .first_name
                                                    }{" "}
                                                    {verification.user
                                                        .studentProfile
                                                        .middle_name && (
                                                        <>
                                                            {
                                                                verification
                                                                    .user
                                                                    .studentProfile
                                                                    .middle_name
                                                            }{" "}
                                                        </>
                                                    )}
                                                    {
                                                        verification.user
                                                            .studentProfile
                                                            .last_name
                                                    }
                                                </>
                                            ) : (
                                                <span>No Profile</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            <a
                                                href={`/school_id/${verification.school_id_image}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                View ID
                                            </a>
                                        </td>
                                        <td className="px-4 py-2 capitalize">
                                            {/* Status badge with conditional styling */}
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    verification.status ===
                                                    "pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : verification.status ===
                                                          "verified"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {verification.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <Link
                                                href={`/admin/verification/${verification.id}`}
                                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center text-gray-500 py-4"
                                    >
                                        No verifications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
