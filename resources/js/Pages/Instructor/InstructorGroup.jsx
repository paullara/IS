import React from "react";
import Instructor from "@/Layouts/Instructor";
import { Link } from "@inertiajs/react";

export default function InstructorGroup({ instructorGroups = [] }) {
    return (
        <Instructor title="Groups">
            <div className="max-w-4xl mx-auto mt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Groups Management
                </h1>

                {instructorGroups.length > 0 ? (
                    <ul className="space-y-2">
                        {instructorGroups.map((group) => (
                            <li key={group.id}>
                                <Link
                                    href={route(
                                        "instructor.groups.show",
                                        group.id
                                    )}
                                    className="flex justify-between items-center w-full bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:shadow transition"
                                >
                                    <div>
                                        <div className="text-lg font-semibold text-indigo-700">
                                            {group.name}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Coordinator:{" "}
                                            {group?.coordinator
                                                ? `${group.coordinator.firstname} ${group.coordinator.lastname}`
                                                : "Unknown"}
                                        </p>
                                    </div>
                                    <span className="text-indigo-600 font-medium hover:underline text-sm">
                                        View
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic text-center">
                        No groups assigned yet.
                    </p>
                )}
            </div>
        </Instructor>
    );
}
