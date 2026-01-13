import CoordinatorLayout from "@/Layouts/Coordinator";
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Instructor() {
    const [instructors, setInstructors] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const res = await axios.get("/get/instructor");
                setInstructors(res.data.instructors);
            } catch (error) {
                console.error("Error fetching instructors", error);
            }
        };
        fetchInstructors();
    }, []);

    const filtered = instructors.filter((i) =>
        `${i.firstname} ${i.lastname}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <CoordinatorLayout title="Instructors">
            <div className="p-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4 mb-4">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Search instructor…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                        <Link
                            href={route("coordinator.instructors.create")}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                        >
                            + Add Instructor
                        </Link>
                    </div>
                </div>

                {/* Table Card */}
                <div className="rounded-2xl border border-gray-200 bg-red shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-gray-600">
                                    <th className="px-6 py-3 font-medium">
                                        Instructor
                                    </th>
                                    <th className="px-6 py-3 font-medium">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 font-medium">
                                        Year & Section
                                    </th>
                                    <th className="px-6 py-3 font-medium text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No instructors found
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((instructor) => (
                                        <tr
                                            key={instructor.id}
                                            className="text-gray-700"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium">
                                                    {instructor.firstname}{" "}
                                                    {instructor.middlename}{" "}
                                                    {instructor.lastname}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-gray-600">
                                                {instructor.email}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                                    {instructor.year_level}{" "}
                                                    {instructor.section}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right space-x-4">
                                                <Link
                                                    href={route(
                                                        "coordinator.instructors.edit",
                                                        instructor.id
                                                    )}
                                                    className="text-gray-700 text-sm"
                                                >
                                                    Edit
                                                </Link>

                                                <Link
                                                    as="button"
                                                    method="delete"
                                                    href={route(
                                                        "coordinator.instructors.destroy",
                                                        instructor.id
                                                    )}
                                                    className="text-red-600 text-sm"
                                                    onClick={(e) => {
                                                        if (
                                                            !confirm(
                                                                "Are you sure you want to delete this instructor?"
                                                            )
                                                        ) {
                                                            e.preventDefault();
                                                        }
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
                </div>
            </div>
        </CoordinatorLayout>
    );
}
