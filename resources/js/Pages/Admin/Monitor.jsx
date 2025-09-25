import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Monitor() {
    const { students } = usePage().props;

    return (
        <AdminLayout>
            <Head title="Student Monitoring" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Student Monitoring</h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">School ID</th>
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Year Level</th>
                                <th className="p-2 border">
                                    Application Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr
                                        key={student.student_id}
                                        className="text-center"
                                    >
                                        <td className="p-2 border">
                                            {student.school_id || "-"}
                                        </td>
                                        <td className="p-2 border">
                                            {student.first_name}{" "}
                                            {student.middle_name}{" "}
                                            {student.last_name}
                                        </td>
                                        <td className="p-2 border">
                                            {student.year_level || "-"}
                                        </td>
                                        <td className="p-2 border">
                                            {student.final_status ===
                                            "accepted" ? (
                                                <span className="text-green-600 font-bold">
                                                    Accepted
                                                </span>
                                            ) : (
                                                <span className="text-red-600 font-bold">
                                                    Rejected
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="p-4 text-center text-gray-500"
                                    >
                                        No students found.
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
