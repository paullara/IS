import React, { useEffect, useState } from "react";
import CoordinatorLayout from "@/Layouts/Coordinator";
import { router } from "@inertiajs/react";

export default function StudentMasterList({ students, filters = {} }) {
    const [status, setStatus] = useState(filters.status ?? "");
    const [course, setCourse] = useState(filters.course ?? "");
    const [section, setSection] = useState(filters.section ?? "");

    useEffect(() => {
        setStatus(filters.status ?? "");
        setCourse(filters.course ?? "");
        setSection(filters.section ?? "");
    }, [filters]);

    const handleFilter = () => {
        const params = {};
        if (status) params.status = status;
        if (course) params.course = course;
        if (section) params.section = section;

        router.get(route("student.master.list"), params, {
            preserveState: true,
        });
    };

    const downloadPDF = () => {
        const params = {};
        if (status) params.status = status;
        if (course) params.course = course;
        if (section) params.section = section;
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
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="border rounded px-3 py-2"
                        >
                            <option value="">All Courses</option>
                            <option value="BSIT">BSIT</option>
                            <option value="BSOA">BSOA</option>
                            <option value="BSHM">BSHM</option>
                        </select>

                        <select
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            className="border rounded px-3 py-2"
                        >
                            <option value="">All Sections</option>
                            <option value="A">Section A</option>
                            <option value="B">Section B</option>
                            <option value="C">Section C</option>
                        </select>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded px-3 py-2"
                        >
                            <option value="">All Status</option>
                            <option value="accepted">Accepted</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <button
                            onClick={handleFilter}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Filter
                        </button>

                        <button
                            onClick={downloadPDF}
                            className="bg-green-500 text-white px-4 py-2 rounded"
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
                                <th className="border px-4 py-2">Course</th>
                                <th className="border px-4 py-2">Section</th>
                                <th className="border px-4 py-2">Company</th>
                                <th className="border px-4 py-2">Internship</th>
                                <th className="border px-4 py-2">Group - Section</th>
                                <th className="border px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={student.id}>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{student.name}</td>
                                        <td className="border px-4 py-2">{student.student_id}</td>
                                        <td className="border px-4 py-2">{student.course}</td>
                                        <td className="border px-4 py-2">{student.section}</td>
                                        <td className="border px-4 py-2">{student.company}</td>
                                        <td className="border px-4 py-2">{student.internship}</td>
                                        <td className="border px-4 py-2">{student.group_section}</td>
                                        <td className="border px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded text-white text-xs ${
                                                    student.status === "accepted"
                                                        ? "bg-green-500"
                                                        : student.status === "rejected"
                                                        ? "bg-red-500"
                                                        : student.status === "pending"
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
                                        colSpan="9"
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
