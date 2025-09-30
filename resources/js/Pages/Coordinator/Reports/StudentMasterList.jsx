import React, { useEffect, useState } from "react";
import CoordinatorLayout from "@/Layouts/Coordinator";
import { router } from "@inertiajs/react";

export default function StudentMasterList({ students, filters = {} }) {
    // Initialize from server-provided filters (if any). Default to empty -> "All"
    const [status, setStatus] = useState(filters.status ?? "");

    // Keep local state in sync if server re-renders with a different filter
    useEffect(() => {
        setStatus(filters.status ?? "");
    }, [filters.status]);

    // When user changes filter, request new list
    const handleFilter = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        // Only include status param if a specific status is selected
        const params = newStatus ? { status: newStatus } : {};

        // Use Inertia to fetch filtered data (preserveState isn't required but can be used)
        router.get(route("student.master.list"), params, {
            preserveState: true,
        });
    };

    // Download PDF (respects current filter; if status is empty -> downloads all)
    const downloadPDF = () => {
        const params = {};
        if (status) params.status = status;
        params.download = "pdf";

        const url = route("student.master.list", params);
        window.open(url, "_blank");
    };

    return (
        <CoordinatorLayout>
            <div className="p-6">
                {/* Header + Controls */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Student Master List</h1>

                    <div className="flex gap-2">
                        <select
                            value={status}
                            onChange={handleFilter}
                            className="border rounded px-3 py-2"
                        >
                            <option value="">All</option>
                            <option value="accepted">Accepted</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <button
                            onClick={downloadPDF}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">School ID</th>
                                <th className="border px-4 py-2">Company</th>
                                <th className="border px-4 py-2">Internship</th>
                                <th className="border px-4 py-2">
                                    Group - Section
                                </th>
                                <th className="border px-4 py-2">
                                    Application Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={student.id}>
                                        <td className="border px-4 py-2">
                                            {index + 1}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {student.name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {student.student_id}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {student.company}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {student.internship}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {student.group_section}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded text-white text-xs ${
                                                    student.status ===
                                                    "accepted"
                                                        ? "bg-green-500"
                                                        : student.status ===
                                                          "rejected"
                                                        ? "bg-red-500"
                                                        : student.status ===
                                                          "pending"
                                                        ? "bg-yellow-500"
                                                        : "bg-gray-400"
                                                }`}
                                            >
                                                {student.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="border px-4 py-2 text-center"
                                        colSpan="6"
                                    >
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </CoordinatorLayout>
    );
}
