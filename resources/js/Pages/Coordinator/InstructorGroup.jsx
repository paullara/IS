import React, { useState } from "react";
import Coordinator from "@/Layouts/Coordinator";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

export default function Groups({ groups: initialGroups = [] }) {
    const [groups, setGroups] = useState(initialGroups);

    const fetchGroups = () => {
        Inertia.get(
            "/groups",
            {},
            {
                preserveState: true,
                onSuccess: (page) => setGroups(page.props.groups),
            }
        );
    };

    return (
        <Coordinator title="Groups">
            <div className="p-4">
                <div className="max-w-6xl mx-auto mt-8 bg-white rounded shadow p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Groups Management
                        </h1>
                        <Link
                            href={route("coordinator.groups.create")}
                            className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition"
                        >
                            + Create New Group
                        </Link>
                    </div>

                    {/* Modern List */}
                    <div className="divide-y divide-gray-200">
                        {groups.length > 0 ? (
                            groups.map((group) => (
                                <div
                                    key={group.id}
                                    className="flex justify-between items-center py-4 hover:bg-gray-50 transition px-2 rounded"
                                >
                                    {/* Left side: Name & Description */}
                                    <div>
                                        <div className="text-lg font-semibold text-gray-800">
                                            {group.name}
                                        </div>
                                        {group.description && (
                                            <div className="text-gray-500 text-sm mt-1">
                                                {group.description}
                                            </div>
                                        )}
                                    </div>

                                    {/* Right side: Actions */}
                                    <div className="flex space-x-2">
                                        <Link
                                            href={route(
                                                "coordinator.groups.show",
                                                group.id
                                            )}
                                            className="text-blue-600 font-medium hover:underline"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-6">
                                No groups found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Coordinator>
    );
}
