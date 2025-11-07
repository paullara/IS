import React, { useState } from "react";
import Instructor from "@/Layouts/Instructor";
import { Link } from "@inertiajs/react";

export default function InstructorGroup({ instructorGroups = [] }) {
    return (
        <Instructor title="Groups">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Groups Management</h1>

                <h2 className="text-xl font-semibold mb-2">Groups List</h2>
                <div>
                    {instructorGroups.length > 0 ? (
                        instructorGroups.map((group) => (
                            <Link
                                key={group.id}
                                href={route("instructor.groups.show", group.id)}
                                className="block border rounded p-3 mb-2 hover:bg-gray-50 transition"
                            >
                                <div className="font-bold text-indigo-700">
                                    {group.name}
                                </div>
                                <p className="text-sm text-gray-500">
                                    Coordinator:{" "}
                                    {group.coordinator?.firstname ?? "Unknown"}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">
                            No groups assigned yet.
                        </p>
                    )}
                </div>
            </div>
        </Instructor>
    );
}
