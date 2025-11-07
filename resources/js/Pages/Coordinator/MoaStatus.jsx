import React, { useState } from "react";
import CoordinatorLayout from "@/Layouts/Coordinator";
import axios from "axios";

export default function MoaStatus({ students }) {
    const [data, setData] = useState(students);
    const [filters, setFilters] = useState({
        course: "",
        section: "",
        moa_status: "",
        search: "",
    });

    const handleStatusChange = (id, value) => {
        axios
            .put(`/coordinator/update-moa-status/${id}`, { moa_status: value })
            .then(() => {
                setData((prev) =>
                    prev.map((student) =>
                        student.id === id
                            ? { ...student, moa_status: value }
                            : student
                    )
                );
            });
    };

    const statuses = [
        "pending",
        "endorsed_for_legal_reviews",
        "endorsed_for_ovpass",
        "endorsed_to_por_secretary",
        "endorsed_to_university_president",
        "signed_by_the_university_president",
    ];

    const courses = ["BSIT", "BSOS", "BSHM"];

    // ✅ Filtered data including search
    const filteredData = data.filter((student) => {
        const searchMatch =
            filters.search === "" ||
            `${student.firstname} ${student.lastname}`
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
            student.email.toLowerCase().includes(filters.search.toLowerCase());

        return (
            searchMatch &&
            (filters.course === "" || student.course === filters.course) &&
            (filters.section === "" || student.section === filters.section) &&
            (filters.moa_status === "" ||
                student.moa_status === filters.moa_status)
        );
    });

    // ✅ Extract unique sections dynamically
    const sections = [...new Set(data.map((s) => s.section))].filter(Boolean);

    return (
        <CoordinatorLayout title="MOA Status">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow">
                <h1 className="text-2xl font-bold mb-6">
                    MOA Status Management
                </h1>

                {/* 🔍 Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={filters.search}
                        onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value })
                        }
                        className="border rounded-lg p-2 flex-1 min-w-[200px]"
                    />

                    <select
                        value={filters.course}
                        onChange={(e) =>
                            setFilters({ ...filters, course: e.target.value })
                        }
                        className="border rounded-lg p-2"
                    >
                        <option value="">All Courses</option>
                        {courses.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.section}
                        onChange={(e) =>
                            setFilters({ ...filters, section: e.target.value })
                        }
                        className="border rounded-lg p-2"
                    >
                        <option value="">All Sections</option>
                        {sections.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.moa_status}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                moa_status: e.target.value,
                            })
                        }
                        className="border rounded-lg p-2"
                    >
                        <option value="">All Statuses</option>
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status.replaceAll("_", " ")}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 📋 Table */}
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">Name</th>
                            <th className="border p-2 text-left">Email</th>
                            <th className="border p-2 text-left">Course</th>
                            <th className="border p-2 text-left">Section</th>
                            <th className="border p-2 text-left">MOA Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((student) => (
                                <tr key={student.id} className="border">
                                    <td className="border p-2">
                                        {student.firstname} {student.lastname}
                                    </td>
                                    <td className="border p-2">
                                        {student.email}
                                    </td>
                                    <td className="border p-2">
                                        {student.course}
                                    </td>
                                    <td className="border p-2">
                                        {student.section}
                                    </td>
                                    <td className="border p-2">
                                        <select
                                            value={student.moa_status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    student.id,
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded p-1"
                                        >
                                            {statuses.map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status.replaceAll(
                                                        "_",
                                                        " "
                                                    )}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-4 text-gray-500"
                                >
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </CoordinatorLayout>
    );
}
